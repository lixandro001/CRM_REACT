import { merge } from 'lodash';
import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'src/utils/formatNumber';
import { BaseOptionChart } from '../../../../../components/charts';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';

// ----------REDUX-----------------------
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const CHART_HEIGHT = 340;
const LEGEND_HEIGHT = 70;

const useStyles = makeStyles((theme) => ({
  root: {},
  chart: {
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
      overflow: 'visible'
    },
    '& .apexcharts-legend': {
      height: LEGEND_HEIGHT,
      alignContent: 'center',
      position: 'relative !important',
      borderTop: `solid 1px ${theme.palette.divider}`,
      top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    }
  }
}));

// ----------------------------------------------------------------------

function AreaVisits({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const { commissionTopService } = useSelector((state) => state.promoter);
  const valores = commissionTopService.data.values;
  const chartData = valores.map((x) => x * 1);
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: commissionTopService.data.labels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: function (seriesName) {
            return '';
          }
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="TOP SERVICIOS" subheader="TOP SERVICIOS" />
      <div dir="ltr">
        <ReactApexChart
          type="pie"
          series={chartData}
          options={chartOptions}
          height={280}
          className={classes.chart}
        />
      </div>
    </Card>
  );
}

AreaVisits.propTypes = {
  className: PropTypes.string
};

export default AreaVisits;
