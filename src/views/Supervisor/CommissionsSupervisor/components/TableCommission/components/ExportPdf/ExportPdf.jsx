import React, { useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import PdfIcon from 'src/assets/icons/PdfIcon';
// ----------REDUX-----------------------

import { getReportPdfPromoters } from 'src/redux/slices/supervisor';
import { useDispatch, useSelector } from 'react-redux';

const ExportPdf = () => {
  const dispatch = useDispatch();
  const { reportPdfPromoters } = useSelector((state) => state.supervisor);

  // DESCARGAR BOTON
  const handleDowloandPdf = (pdfResult) => {
    const linkSource = `data:application/pdf;base64,${pdfResult}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = `DESCARGA RESULTADO`;
    downloadLink.click();
  };

  useEffect(() => {
    dispatch(getReportPdfPromoters());
  }, []);

  const handleReport = () => {
    if (reportPdfPromoters.data) {
      console.log('ENTRE AL IF');
      handleDowloandPdf(reportPdfPromoters.data.pdf);
    }
  };

  return (
    <div>
      <Tooltip title="Descargar PDF">
        {/* <IconButton onClick={() => handleDowloandPdf(pdfResult)}> */}
        <IconButton onClick={handleReport}>
          <PdfIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ExportPdf;
