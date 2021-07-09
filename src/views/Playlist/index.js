import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {
  Button, Paper,
  Grid, makeStyles,
  Typography, Card, CardHeader, Avatar,
} from '@material-ui/core';
import { DragDropContext } from "react-beautiful-dnd";
import './index.scss';
import { deepOrange } from '@material-ui/core/colors';
import FolderIcon from '@material-ui/icons/Folder';
import uuid from "uuid/v4";
/**Connections */
import Navbar from '../../components/Navbar';
import StandaloneToggleButton from '../../components/FileUpload/Folders';
import DropArea from './dropArea';
import DragArea from './dragArea';

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: "#252525",

  },
}))(MuiDialogActions);
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    padding: 15,
  },
  root1: {
    alignContent: 'center',
    width: 175,
    height: 215,
    textAlign: 'left',
    margin: 6,

  },
  dialogAction: {
    marginTop: 1,
  },
  media: {
    height: 90,
    margin: 15,

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#252525',
    color: theme.palette.text.secondary,

  },
  textDesign: {
    textAlign: 'left',
    color: '#ff5722',
    fontSize: 30,
  },
  textDesign1: {
    textAlign: 'left',
    fontSize: 17,
    color: '#ffffff',
  },
  textDesign2: {
    textAlign: 'left',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonColor: {
    backgroundColor: '#ff5722',
    height: 40,
    width: 150,
    fontSize: 18,
    color: '#ffffff'
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2rem 0',
  },
  cardheader: {
    backgroundColor: deepOrange[500],
  },

}));

export default function Playlist() {
  const [cardmedia, setCardMedia] = useState([]);
  const classes = useStyles();
  //List of playlist example
  const COLLECTION = [
    { id: uuid(), filename: "Let's go.mp4", type: "video" },
    { id: uuid(), filename: "We can do this.mp4", type: "video" },
    { id: uuid(), filename: "hello.mp4", type: "video" }
  ];

  //sorting cards
  const reorder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
  };

  //clone cards
  const copy = (source, destination, droppableSource, droppableDestination) => {
    const item = source[droppableSource.index];
    destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destination;
  };
  //react beautiful dnd on drag
  const onDragEnd = React.useCallback(
    result => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          setCardMedia(state =>
            reorder(state, source.index, destination.index)
          );
          break;
        case "SHOP":
          setCardMedia(state =>
            copy(COLLECTION, state, source, destination)
          );
          break;
        default:
          break;
      }
    },
    [setCardMedia]
  );
  return (
    <>
      <Navbar></Navbar>
      <div >
        <Grid container className={classes.root} justify="center" container spacing={3}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid item xs={8}>
              <Paper className={classes.paper} container spacing={3} item>

                <Typography className={classes.textDesign}>RET SPILLELISTE - Name here </Typography>

                <p className={classes.textDesign1}>Aktive filer er vist nedenfor i prioriteret rækkefølge</p>
                <Grid  >
                  <DropArea items={cardmedia} />
                </Grid>
              </Paper>
              <DialogActions className={classes.dialogAction}>
                <Button variant="contained" className={classes.buttonColor} >GEM</Button>
              </DialogActions>
            </Grid>
            <Grid item xs={4}  >
              <Card className={classes.paper} cot justify="center">
                <Typography className={classes.textDesign}>TILFØJ <span className={classes.textDesign2}>CONTENT</span></Typography>
                <p className={classes.textDesign1}>Træk udvalgt fil over for at tilføje til spillelisten</p>
                <CardHeader avatar={
                  <Avatar aria-label="recipe" className={classes.cardheader}>
                    <StandaloneToggleButton />
                  </Avatar>}>
                </CardHeader>
                <Grid >
                  {/*  <FolderIcon1 /> */}
                  <DragArea items={COLLECTION} />
                </Grid>
              </Card>
            </Grid>
          </DragDropContext>
        </Grid>

      </div>
    </>
  )
}