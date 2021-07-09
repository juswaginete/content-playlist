import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { deepOrange, red } from '@material-ui/core/colors';
import VideoPlayer from 'react-simple-video-player';
import Slide from '@material-ui/core/Slide';
import TestVideo from '../../../assets/videos/105620d8-290b-4fce-b484-17f679f88671.mp4';
import {
  Button, Card,
  Grid, CardContent, makeStyles,
  Divider
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },


});

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
    backgroundColor: red[50],
  },
  colorChanger: {
    color: red[50],
  },
  colorChanger1: {
    color: deepOrange[500],
  },
  buttonColor: {
    maxWidth: 150, maxHeight: 35, minWidth: 150, minHeight: 35,
    backgroundColor: deepOrange[500],
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: '#252525',
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({ modalShow, modalState }) {
  const classes = useStyles();
  const [open, setOpen] = useState(modalShow);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    modalState(false);
    // setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}> Open dialog </Button> */}
      <Dialog TransitionComponent={Transition}  disableBackdropClick={true}  maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}  >

        <DialogContent dividers className="dialog-content"  >
          <Grid container item justify="center" lg={12} xs={12} md={12}>
            <Card className="card-main" justify="center" cot  >
              <CardContent className="card-content">
                <Typography gutterBottom className={classes.colorChanger} >
                  <VideoPlayer url={TestVideo}></VideoPlayer>
                  <Divider></Divider>
                  <div className={classes.colorChanger1}>
                    Media Info:
                    </div>
                  <Divider></Divider>
                    File name: Absalon_Sygeplejerske_Holbæk_Biografspot NY.mp4
                    <Divider></Divider>
                    Media type: Video
                    <Divider></Divider>
                    Size: 14 MB
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
        </DialogContent>
        <DialogActions classname="dialog-action">
          <Button onClick={handleClose} variant="contained" color="default">FORTYRD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
