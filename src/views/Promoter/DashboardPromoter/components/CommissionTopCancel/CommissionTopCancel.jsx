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

CommissionsTopCancel.propTypes = {
  className: PropTypes.string
};

function CommissionsTopCancel({ className, ...other }) {
  const classes = useStyles();
  const { commissionTopCancel } = useSelector((state) => state.promoter);
  const chartData = [{ data: commissionTopCancel.data.values }];
  const chartOptions = merge(BaseOptionChart(), {
    colors: ['#097BED'],
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: function (seriesName) {
            return 'Monto S/.';
          }
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', endingShape: 'rounded' }
    },
    xaxis: {
      categories: commissionTopCancel.data.labels
    }
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="TOP CANCELADOS" subheader="TOP CANCELADOS" />
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

export default CommissionsTopCancel;
