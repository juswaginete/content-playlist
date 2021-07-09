import React from 'react';
import {
  makeStyles,
  Typography, Card, CardContent,
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

export default function DropArea(props) {
  const classes = useStyles();
  return (
    <div>
      <Droppable droppableId="BAG" direction="horizontal"
        isCombineEnabled={false}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="drop-area">
            {props.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div className={snapshot.isDragging ? null : null}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style} >
                    <Dropdown />
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
