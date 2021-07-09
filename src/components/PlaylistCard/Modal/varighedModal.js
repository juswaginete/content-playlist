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
import Slide from '@material-ui/core/Slide';
import {
  Button, FormControl, Card, fade,
  Grid, CardContent, makeStyles,
  Divider
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },


});

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  vælglabel: {
    fontSize: 18,
  },
  textFieldNumber: {
    fontSize: 18,
    width: 70,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    margin: theme.spacing(1),
    marginTop: -10,
  },
  dialog: {
    position: 'absolute',
    top: 150,
    height: 280,
  }
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
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
    backgroundColor: "#252525",
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
    <div >
      <Dialog disableBackdropClick={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="dialog-modal-title" id="alert-dialog-slide-title">{"Angiv varighed"}</DialogTitle>
        <DialogContent className="dialog-modal-content" >
          <DialogContentText color="red[50]" classname="dialog-modal-contexts" id="alert-dialog-slide-description" >

            <Grid container direction="row" alignItems="center">
              <Grid item>
                <form noValidate autoComplete="off" /* classNamme={classes.root} */>
                  <label className={classes.vælglabel} > Vælg varighed:
                    <TextField
                      className={classes.textFieldNumber}
                      defaultValue="15"
                      id="outlined-number"
                      type="number"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    /> Sekunder</label>
                </form>
              </Grid>
            </Grid>


          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-modal-action">
          <Button variant="contained" color="default" onClick={handleClose} >
            Fortyrd
          </Button>
          <Button classname="button-color" className="color-changer" variant="contained" onClick={handleClose} >
            Gem
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
