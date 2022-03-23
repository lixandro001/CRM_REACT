import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Scrollbars from '../../../../../components/Scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import searchFill from '@iconify-icons/eva/search-fill';
import { useTheme } from '@material-ui/core/styles';
import Label from '../../../../../components/Label';
import currencyFormatter from 'currency-formatter';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  Pagination,
  TableContainer,
  LinearProgress,
  InputAdornment,
  OutlinedInput,
  Grid,
  CardHeader
} from '@material-ui/core';

// ----------REDUX-----------------------
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolioList } from 'src/redux/slices/promoter';
// ----------------------------------------------------------------------

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
  }
}));
// ----------------------------------------------------------------------

TableReportResultExam.propTypes = {
  className: PropTypes.string
};

function TableReportResultExam({ className, ...other }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { list_month, pagination } = useSelector(
    (state) => state.promoter.portfolioList.data
  );

  const { total_entries, entries_per_page, entries } = pagination;

  const { statusCurrentList, isLoading } = useSelector(
    (state) => state.promoter
  );

  const totalPages = Math.ceil(total_entries / entries_per_page);

  const handleChangePaginate = (event, value) => {
    event.preventDefault();
    dispatch(getPortfolioList(value)); //Mandamos el ID del sucursal de la data que recibimos
  };

  const PROMOTER_SALES = entries.map((val) => {
    return {
      num_cia: val.num_cia,
      patient: val.patient,
      company_id: val.company_id,
      modality: val.modality,
      trade_name: val.trade_name,
      business_name: val.business_name,
      ruc: val.ruc,
      payment_method: val.payment_method,
      days: val.days,
      month_one: val.month_one.amount,
      month_two: val.month_two.amount,
      month_three: val.month_three.amount
    };
  });

  // BUSCADOR

  const handleKeyPress = ({ target }) => {
    const query = target.value;
    const page = '1';
    if (query.length >= 3) {
      dispatch(getPortfolioList(page, query));
    } else {
      dispatch(getPortfolioList(page, query));
    }
  };
  return (
    <Card className={clsx(classes.root, className)} {...other}>
      {isLoading && <LinearProgress color="primary" />}

      {statusCurrentList.data && (
        <CardHeader
          title="Portafolio"
          // className={classes.cardHeader}
          // title={`DETALLES DE ATENCIONES: ${statusCurrentList.data.month} -
          //     ${statusCurrentList.data.year_period}`}
          // subheader={`( ${statusCurrentList.data.date_start} -
          //     ${statusCurrentList.data.date_end} )`}
        />
      )}

      <Grid container spacing={3} sx={{ paddingLeft: '25px', pt: '20px' }}>
        {statusCurrentList.data && (
          <Grid item xs={12} sm={6}>
            {/* <TransitionsDialogs
              title={statusCurrentList.data.process_status_button}
            /> */}
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            pb: '15px'
          }}
        >
          {/* buscador */}
          <OutlinedInput
            className={classes.search}
            // value={valueBuscador}
            onChange={handleKeyPress}
            placeholder="Buscar..."
            startAdornment={
              <InputAdornment position="start">
                <Box
                  component={Icon}
                  icon={searchFill}
                  sx={{ color: 'text.disabled' }}
                />
              </InputAdornment>
            }
          />
          {/* Buscador */}
        </Grid>
      </Grid>

      <Scrollbars>
        <TableContainer sx={{ minWidth: 800, maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>EMPRESA</TableCell>
                <TableCell>MODALIDAD</TableCell>
                <TableCell>PAGO</TableCell>
                <TableCell>{list_month[0]}</TableCell>
                <TableCell>{list_month[1]}</TableCell>
                <TableCell>{list_month[2]}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {PROMOTER_SALES.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2">
                          {row.company_id}-{row.trade_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.secondary', fontSize: '10px' }}
                        >
                          {row.business_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.secondary', fontSize: '10px' }}
                        >
                          CÓDIGO: {row.num_cia} | RUC: {row.ruc}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="justify">{row.modality}</TableCell>
                  <TableCell>
                    {row.payment_method !== '' ? (
                      <Typography variant="subtitle2">
                        {row.payment_method}
                      </Typography>
                    ) : (
                      <Label
                        variant={
                          theme.palette.mode === 'light' ? 'ghost' : 'filled'
                        }
                        color={'error'}
                      >
                        {'Pago Pendiente'}
                      </Label>
                    )}
                    {row.invoice !== '' ? (
                      <Typography
                        variant="subtitle2"
                        sx={{ color: 'text.secondary', fontSize: '10px' }}
                      >
                        Días: {row.days}
                      </Typography>
                    ) : (
                      ''
                    )}
                  </TableCell>
                  <TableCell align="justify">
                    S/ {currencyFormatter.format(row.month_one, 'en-US')}
                  </TableCell>
                  <TableCell align="justify">
                    S/ {currencyFormatter.format(row.month_two, 'en-US')}
                  </TableCell>
                  <TableCell align="justify">
                    S/ {currencyFormatter.format(row.month_three, 'en-US')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbars>
      <br />
      <Pagination
        component="div"
        count={totalPages}
        color="primary"
        onChange={handleChangePaginate}
        className={classes.paginateTheme}
      />
    </Card>
  );
}

export default TableReportResultExam;
