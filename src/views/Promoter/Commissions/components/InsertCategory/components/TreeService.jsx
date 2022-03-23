import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400
  }
});

export default function TreeService({ servicios }) {
  const classes = useStyles();

  return (
    <>
      {servicios.map((item, index) => (
        <TreeView
          key={index}
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem nodeId="1" label={`${item.id_service}-${item.service}`}>
            <TreeItem nodeId="2" label={`Precio: S/${item.price}`} />
            <TreeItem nodeId="3" label={`Escaneado: ${item.scanned}`} />
          </TreeItem>
        </TreeView>
      ))}
    </>
  );
}
