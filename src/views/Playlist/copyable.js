import React from 'react';
import {
  Grid, makeStyles,
  Typography, Card,  CardContent,
  CardMedia, Divider,
} from '@material-ui/core';
import { Droppable, Draggable } from "react-beautiful-dnd";
import './index.scss';
import { deepOrange } from '@material-ui/core/colors';


/**Connections */
import Dropdown from '../../components/PlaylistCard/Dropdown'
import InstorexLogo from '../../assets/images/video1.jpg';


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


export default function Copyable(props) {
  const classes = useStyles();
  // This method is needed for rendering clones of draggables
  const getRenderItem = (items) =>
    (provided, snapshot, rubric) => {
      const item = items[rubric.source.index];
      return (
        <React.Fragment>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={provided.draggableProps.style}
            className={snapshot.isDragging ? "dragging" : ""}
          >
            <Card className={classes.root1}>
              <CardMedia className={classes.media}
                image={InstorexLogo} title="Test" />
              <CardContent style={{ textAlign: 'left', fontSize: 15 }}>
                <Typography style={{ fontSize: 14 }} gutterBottom variant="body2" component="h2">
                  <span style={{ fontSize: 14, fontWeight: 'bold' }}>Filename: </span>{item.filename}
                  <Divider></Divider>
                  <span style={{ fontSize: 14, fontWeight: 'bold' }}>Type: </span>{item.type}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </React.Fragment>
      );
    };

  return (
    <Grid className="copyable-alignment">
      <Droppable direction="horizontal"
        renderClone={getRenderItem(props.items, props.className)}
        droppableId={props.droppableId}
        isDropDisabled={true} className="drop-area">
        {(provided, snapshot) => (
          <div >
            <div ref={provided.innerRef} className={props.className} >
              {/* <FolderIcon1 /> */}
              {props.items.map((item, index) => {
                const shouldRenderClone = item.id === snapshot.draggingFromThisWith;
                return (
                  <React.Fragment key={item.id}>
                    {shouldRenderClone ? (
                      <div className="react-beatiful-dnd-copy">
                        <Card className={classes.root1}>
                          <CardMedia className={classes.media}
                            image={InstorexLogo} title="Test" />
                          <CardContent style={{ textAlign: 'left', fontSize: 15 }}>
                            <Typography style={{ fontSize: 14 }} gutterBottom variant="body2" component="h2">
                              <span style={{ fontSize: 14, fontWeight: 'bold' }}>Filename: </span>{item.filename}
                              <Divider></Divider>
                              <span style={{ fontSize: 14, fontWeight: 'bold' }}>Type: </span>{item.type}
                            </Typography>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <Draggable draggableId={item.id} index={index} direction="horizontal">
                        {(provided, snapshot) => (
                          <React.Fragment>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={snapshot.isDragging ? "dragging" : ""}>
                              <Card className={classes.root1}>
                                <CardMedia className={classes.media}
                                  image={InstorexLogo} title="Test" />
                                <CardContent style={{ textAlign: 'left', fontSize: 15 }}>
                                  <Typography style={{ fontSize: 14 }} gutterBottom variant="body2" component="h2">
                                    <span style={{ fontSize: 14, fontWeight: 'bold' }}>Filename: </span>{item.filename}
                                    <Divider></Divider>
                                    <span style={{ fontSize: 14, fontWeight: 'bold' }}>Type: </span>{item.type}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </div>
                          </React.Fragment>
                        )}
                      </Draggable>
                    )}
                  </React.Fragment>
                );
              })}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </Grid>
  );
}

