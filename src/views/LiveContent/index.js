import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  ThemeProvider, Box, Card,
  Grid, createMuiTheme, CardHeader, CardContent, makeStyles,
  Avatar,
  GridList
} from '@material-ui/core';
import './index.scss';

/**Connections */
import Navbar from '../../components/Navbar';
import LiveContentTable from '../../components/LiveContentTable';

export default function UploadContent() {

  return (
    <>
      <Navbar />
      <Grid container className="dashboard-content container" justify="center">
        <Grid
          className="dashboard-content main-menu"
          justify="center"
          xs={12}
          md={12}
          lg={12}>
            <LiveContentTable></LiveContentTable>
        </Grid>
      </Grid>
    </>
  )
}