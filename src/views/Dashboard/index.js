import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Paper } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import PublishIcon from '@material-ui/icons/Publish';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';

import './index.scss';
import Navbar from '../../components/Navbar';

export default function Dashboard() {
  
  const history = useHistory();

  const handleRedirectToPage = (event) => {
    if (event.currentTarget.dataset.value === "upload-content") {
      history.push("/upload-content");
      window.location.reload();
    } else if (event.currentTarget.dataset.value === "live-content") {
      history.push("/live-content");
      window.location.reload();
    }
  }

  return (
    <>
      <Navbar />
      <Grid container className="dashboard-content container" justify="center">
        <Grid
          item
          className="dashboard-content main-menu"
          justify="center"
          xs={11}
          md={8}
          lg={5}
        >
          <div className="dashboard-title">
            <h1>WELCOME TO <span className="span-orange">INSTOREX</span></h1>
            <h5>Click on the boxes below to execute the desired request</h5>
          </div>
          <Grid container className="dashboard grid-items" justify="center" spacing={4}>
            {/* <Grid key="1" item>
              <Paper className="grid-paper">
                <div className="inner-content">
                  <CreateIcon />
                </div>
              </Paper>
            </Grid> */}
            <Grid key="2" item>
              <Paper className="grid-paper" onClick={handleRedirectToPage} data-value="upload-content">
                <div className="inner-content">
                  <PublishIcon />
                </div>
              </Paper>
            </Grid>
            <Grid key="3" item>
              <Paper className="grid-paper" onClick={handleRedirectToPage} data-value="live-content">
                <div className="inner-content">
                  <WifiTetheringIcon />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}