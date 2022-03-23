import clsx from 'clsx';
import React from 'react';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { fNumber } from 'src/utils/formatNumber';
import { BaseOptionChart } from '../../../../../components/charts';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardHeader } from '@material-ui/core';
// ----------REDUX-----------------------
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    paddingTop: 0,
    paddingBottom: '0 !important'
  }
}));

// ----------------------------------------------------------------------

CommissionTopService.propTypes = {
  className: PropTypes.string
};

function CommissionTopService({ className, ...other }) {
  const classes = useStyles();
  const { commissionTopService } = useSelector((state) => state.promoter);
  const chartData = [{ data: commissionTopService.data.values }];
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: function (seriesName) {
            return 'Cantidad';
          }
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', endingShape: 'rounded' }
    },
    xaxis: {
      categories: commissionTopService.data.labels
    }
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="TOP SERVICIOS" subheader="TOP SERVICIOS" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}

export default CommissionTopService;
