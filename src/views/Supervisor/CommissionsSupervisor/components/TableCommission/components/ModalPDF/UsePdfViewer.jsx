import React from 'react';
import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
import { makeStyles } from '@material-ui/core/styles';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';

// Create new plugin instance
// const defaultLayoutPluginInstance = defaultLayoutPlugin();

// Create new plugin instance
// const defaultLayoutPluginInstance = defaultLayoutPlugin();

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '700px',
    position: 'relative'
  }
}));

const usePdfViewer = ({ file }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <Viewer
          fileUrl={file}
          // plugins={[
          //   // Register plugins
          //   defaultLayoutPluginInstance
          // ]}
        />
      </Worker>
    </div>
  );
};

export default usePdfViewer;
