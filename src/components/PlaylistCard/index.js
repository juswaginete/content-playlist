import React, { useState } from "react";
import {
  Card, CardContent, Button,
  CardMedia, Typography, CardActionArea, makeStyles
} from '@material-ui/core';
import InstorexLogo from '../../assets/images/video1.jpg';
const useStyles = makeStyles({
  root: {
    width: 195,
    height: 215,

  },
  media: {
    height: 90,
    margin: 15,

  },
});
export default function Cards({ image, title, type }) {
  const classes = useStyles();
  return (
    <div className="App">
       <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media}
            image={InstorexLogo} title="Test" />
          <CardContent>
            <Typography gutterBottom variant="body2" component="h2">
              Filename:{title}
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary" component="h2">
              Type:{type}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>

  )


}
