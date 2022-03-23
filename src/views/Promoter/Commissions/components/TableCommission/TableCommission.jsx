import clsx from 'clsx';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Scrollbars from '../../../../../components/Scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import searchFill from '@iconify-icons/eva/search-fill';
import { useTheme } from '@material-ui/core/styles';
import Label from '../../../../../components/Label';
import { fCurrency } from 'src/utils/formatNumber';
import DescriptionIcon from '@material-ui/icons/Description';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import close from '@iconify-icons/eva/close-circle-outline';
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
  CardHeader,
  Button,
  Modal,
  TextField
} from '@material-ui/core';
import PreviewTicket from '../PreviewTicket';
import DetalleCategory from '../InsertCategory/DetalleCategory';
import TransitionsDialogs from './TransitionsDialogs';
import TransitionsDialogsExcel from './TransitionsDialogsExcel';
import TransitionNuevoCategoria from './TransitionNuevoCategoria';

// ----------REDUX-------------------------------------------------------
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriaList } from 'src/redux/slices/promoter';
import { useState } from 'react';
import { DeleteCategoria } from 'src/redux/slices/promoter';
import { getDetailCategory } from 'src/redux/slices/promoter';
import { useSnackbar } from 'notistack';
import { de } from 'faker/lib/locales';
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

const useStyleslixa = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 600,
    height: 400,
    backgroundColor: 'white',
    //border: '10px solid #000',
    boxShadow: theme.shadows[80],
    padding: '1px 10px 14px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  textfiel: {
    width: '100%'
  },
  button: {
    textAlign: 'center'
  }
}));

// ----------------------------------------------------------------------
TableReportResultExam.propTypes = {
  className: PropTypes.string
};

function TableReportResultExam({ className, ...other }) {
  const styles = useStyleslixa();
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  //const [IdCategory, setIdCategory] = React.useState('');
  const [DeleteCategory, setDeleteCategory] = useState(false);

  const abrircerrarmodal = (e) => {
    console.log('se abre el modal ...............');
    setModal(!modal);
    console.log(e);

    //setEditRegister(true);
  };

  const body = (
    <div className={styles.modal}>
      <div align="center">
        <h2>Editar Categoria</h2>
        <br />
        <br />
      </div>
      <div align="center">
        <TextField
          label="Nombre de la categoria"
          className={styles.textfield}
        />
        <br />
        <br />
        <TextField
          label="Descripcion de la categoria"
          className={styles.textfield}
        />
      </div>
      <br /> <br />
      <div align="right">
        <input type="text" />

        <Button color="primary">enviar</Button>
        <Button onClick={() => abrircerrarmodal()} color="secondary">
          Cancelar
        </Button>
      </div>
    </div>
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleclickdelete = async (e) => {
    console.log(e.currentTarget.id);
    const IdCategory = e.currentTarget.id;
    try {
      dispatch(DeleteCategoria({ IdCategory }));

      if (!isLoading && message) {
        //enqueueSnackbar(message, { variant: 'success' });
        dispatch(getCategoriaList());
      } else {
        dispatch(getCategoriaList());
      }

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleclickUpdate = async (e) => {
    const IdCategory = e.currentTarget.id;
    console.log('--------------------para editar-------' + IdCategory);
    try {
      dispatch(getDetailCategory({ IdCategory }));
      if (!isLoading && message) {
        //enqueueSnackbar(message, { variant: 'success' });
        dispatch(getCategoriaList());
      } else {
        dispatch(getCategoriaList());
      }

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const { entries, total_entries, entries_per_page } = useSelector(
    (state) => state.promoter.commissionList.data
  );

  const { statusCurrentList, isLoading, message } = useSelector(
    (state) => state.promoter
  );

  const totalPages = Math.ceil(total_entries / entries_per_page);

  const handleChangePaginate = (event, value) => {
    event.preventDefault();
    console.log('----values --' + value);
    dispatch(getCategoriaList(value)); //Mandamos el ID del sucursal de la data que recibimos
  };

  const PROMOTER_SALES = entries.map((val) => {
    return {
      idcategoria: val.idcategoria,
      nombreCategoria: val.nombreCategoria,
      nombreEstado: val.nombreEstado,
      estado: val.estado,
      descripcion: val.descripcion,
      detalles: <PreviewTicket idcategoriaval={val.idcategoria} />,
      DetalleCategoria: <DetalleCategory idcategoriaval={val.idcategoria} />
    };
  });

  // BUSCADOR

  const handleKeyPress = ({ target }) => {
    const query = target.value;
    const page = '1';
    if (query.length >= 0) {
      dispatch(getCategoriaList(page, query));
    } else {
      dispatch(getCategoriaList(page, query));
    }
  };

  const Refrescar = () => {
    dispatch(getCategoriaList());
  };

  if (DeleteCategory) {
    //dispatch(DeleteCategoria({ IdCategory }));
    setDeleteCategory(false);
    //Refrescar();
  }

  useEffect(() => {
    dispatch(getCategoriaList());
  }, [dispatch]);

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      {isLoading && <LinearProgress color="primary" />}

      {statusCurrentList.data && (
        <CardHeader
          className={classes.cardHeader}
          title={`DETALLES DE ATENCIONES: ${statusCurrentList.data.month} -
              ${statusCurrentList.data.year_period}`}
          subheader={`( ${statusCurrentList.data.date_start} -
              ${statusCurrentList.data.date_end} )`}
        />
      )}

      <Grid container spacing={2} sx={{ paddingLeft: '10px', pt: '5px' }}>
        <Grid item xs={4} sm={2} style={{ display: 'flex' }}>
          <TransitionsDialogsExcel title={'Excel'} />
        </Grid>

        <Grid item xs={4} sm={2} style={{ display: 'flex' }}>
          <TransitionNuevoCategoria title={'Nueva'} />
        </Grid>

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

        <Button
          variant="contained"
          color="primary"
          lassName={classes.button}
          startIcon={<AutorenewIcon />}
          onClick={() => dispatch(getCategoriaList())}
        >
          Actualizar
        </Button>
      </Grid>

      <Scrollbars>
        <TableContainer sx={{ minWidth: 800, maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>IDCATEGORIA</TableCell>
                <TableCell>NOMBRE CATEGORIA</TableCell>
                <TableCell>DESCRIPCION</TableCell>
                <TableCell>NOMBRE ESTADO</TableCell>
                <TableCell>ACCIONES</TableCell>
                <TableCell>DETALLES</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {PROMOTER_SALES.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.idcategoria}</TableCell>
                  <TableCell>{row.nombreCategoria}</TableCell>
                  <TableCell>{row.descripcion}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2">
                          {row.nombreEstado}
                        </Typography>
                        {/* <Typography
                          variant="body2"
                          sx={{ color: 'text.secondary', fontSize: '10px' }}
                        >
                          CÓDIGO: {row.estado}
                        </Typography> */}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button className="Editar" align="center">
                      {row.DetalleCategoria}
                    </Button>

                    {/** <Modal open={modal} onClose={abrircerrarmodal}>
                      {body}
                    </Modal>*/}
                    <Button
                      id={row.idcategoria}
                      onClick={(e) => handleclickdelete(e)}
                      className="Eliminar"
                    >
                      <Icon width={40} height={40} icon={close} />
                    </Button>
                  </TableCell>
                  <TableCell align="center">{row.detalles}</TableCell>
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
