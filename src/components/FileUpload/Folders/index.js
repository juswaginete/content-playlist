import React, { useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FolderIcon from '@material-ui/icons/Folder';
import {
  Grid
} from '@material-ui/core';

import './index.scss';


export default function StandaloneToggleButton() {
  const [selected, setSelected] = React.useState(false);
  
  return (
    <Grid container item className="div-container" >
        <ToggleButton className="toggle-container" >
            <FolderIcon className="folder-icon" fontSize="large" />
        </ToggleButton>
    </Grid>
  )
}