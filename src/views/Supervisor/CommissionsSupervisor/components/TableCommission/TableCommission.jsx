import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Scrollbar from '../../../../../../src/components/Scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import { fCurrency } from 'src/utils/formatNumber';

import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  LinearProgress,
  CardHeader,
  Grid
} from '@material-ui/core';

// ----------REDUX-----------------------
import { useSelector } from 'react-redux';
// --------------------------------------------------------

import ExportPdf from './components/ExportPdf/ExportPdf';
import BtnBlock from './components/BtnBlock';
import BtnProcess from './components/BtnProcess';
import ModalPDF from './components/ModalPDF';

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: theme.spacing(3) },
  paginateTheme: {
    color: 'red'
  },
  search: {
    width: '90%',
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { width: '95%', boxShadow: theme.customShadows.z8 },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  cardHeader: {
    textTransform: 'uppercase'
  },
  button: {
    alignItems: 'center'
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1)
  }
}));
// ----------------------------------------------------------------------

TableReportResultExam.propTypes = {
  className: PropTypes.string
};

function TableReportResultExam({ className, ...other }) {
  const classes = useStyles();

  const { data } = useSelector((state) => state.supervisor.listSellerAccepted);

  const { isLoading } = useSelector((state) => state.supervisor);

  const PROMOTER_SALES = data.map((val) => {
    return {
      cancellation_month: val.cancellation_month,
      commission: val.commission,
      historical_cancellation: val.historical_cancellation,
      historical_commission: val.historical_commission,
      meta: val.meta,
      modality: val.modality,
      percentage: val.percentage,
      pproduction: val.pproduction,
      promoter: val.promoter,
      promoter_id: val.promoter_id,
      total_cancellation: val.total_cancellation
    };
  });

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      {isLoading && <LinearProgress color="primary" />}
      <CardHeader
        sx={{ mb: 2 }}
        className={classes.cardHeader}
        title={`DETALLES DE ATENCIONES`}
        subheader={`DETALLES`}
      />
      <Grid container>
        <Grid item xs={12} md={12}>
          <div className={classes.inline}>
            <BtnProcess />
            <BtnBlock />
            <ExportPdf />
            <ModalPDF />
          </div>
        </Grid>
      </Grid>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>PROMOTORA</TableCell>
                <TableCell>CANCELACIÓN MENSUAL</TableCell>
                <TableCell>COMISIÓN</TableCell>
                <TableCell>H. CANCELACIÓN</TableCell>
                <TableCell>H. COMISIÓN</TableCell>
                <TableCell>META</TableCell>
                <TableCell>PORCENTAJE</TableCell>
                <TableCell>PRODUCCIÓN</TableCell>
                <TableCell>TOTAL CANCEL.</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {PROMOTER_SALES.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2">
                          {row.promoter}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.secondary', fontSize: '10px' }}
                        >
                          CÓDIGO: {row.promoter_id} | MODALIDAD: {row.modality}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    S/.{fCurrency(row.cancellation_month)}
                  </TableCell>
                  <TableCell align="left">
                    S/.{fCurrency(row.commission)}
                  </TableCell>
                  <TableCell align="center">
                    S/. {fCurrency(row.historical_cancellation)}
                  </TableCell>
                  <TableCell align="center">
                    S/.{' '}
                    {fCurrency(row.historical_commission) === ''
                      ? '-'
                      : fCurrency(row.historical_commission)}
                  </TableCell>
                  <TableCell align="center">
                    {row.meta === '' ? '-' : fCurrency(row.meta)}
                  </TableCell>
                  <TableCell align="center">
                    {row.percentage === '' ? '-' : row.percentage}
                  </TableCell>
                  <TableCell align="center">
                    {row.pproduction === ''
                      ? '-'
                      : 'S/.' + fCurrency(row.pproduction)}
                  </TableCell>
                  <TableCell align="center">
                    {row.total_cancellation === ''
                      ? '-'
                      : fCurrency(row.total_cancellation)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}

export default TableReportResultExam;
