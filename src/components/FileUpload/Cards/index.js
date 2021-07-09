import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardMedia, CardActionArea, Grid } from '@material-ui/core';

import InstorexLogo from '../../../assets/images/video1.jpg';

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 250,
    textAlign: 'left',
  },
  media: {
    height: 100,
    margin: 15,
  },
  mediaContent: {
    marginRight: '20px'
  }
});

const image = "string";
const type = "video";
const title = "Absalon_Sygeplejerske_txy NY.mp4";


export default function OutlinedCard({ filename, fileType }) {
  const classes = useStyles();

  return (
    <>
      {filename && fileType ? (
        <>
          <Card className={classes.root} variant="outlined">
            <CardActionArea>
              <CardMedia className={classes.media}
                image={InstorexLogo} title="Test" />
              <CardContent className={classes.mediaContent}>
                <Typography gutterBottom variant="body2" component="h2" style={{ marginRight: '20px'}}>
                    <p style={{ fontWeight: 'bold', height: '5px' }}>Filnavn:</p> {filename}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary" component="h2">
                  <Grid container style={{wordWrap: 'break-word'}}>
                    <p style={{ fontWeight: 'bold' }}>Type:</p>{fileType}
                  </Grid>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      ) : ''}
    </>
  );
}