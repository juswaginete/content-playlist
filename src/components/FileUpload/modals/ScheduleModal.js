import React, { useEffect, useCallback, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { deepOrange, red } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { isUndefined } from 'lodash';

import {
  Button, TextField, fade, Card,
  Grid, CardContent, makeStyles, 
  Divider
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';

import './ScheduleModal.scss';
import CheckboxList from './CheckboxList';
import { uploadContentService } from '../../../services';

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
    backgroundColor: red[50],
    width: 400,

  },
  avatar: {
    backgroundColor: deepOrange[500],
    padding: '10px 12px',
  },
  avatar1: {
    backgroundColor: deepOrange[500],
    padding: '10px 12px',
    maxWidth: '40px', maxHeight: '50px', minWidth: '30px', minHeight: '30px',
  },
  avatar2: {
    backgroundColor: deepOrange[800],
  },
  buttonColor: {
    maxWidth: 150, maxHeight: 35, minWidth: 150, minHeight: 35,
    backgroundColor: deepOrange[500],
  },
})
);

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
    backgroundColor: "#252525",

  },
}))(MuiDialogActions);


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),

    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 300,
    padding: '10px 12px',
    marginLeft: theme.spacing(.3),
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

export default function CustomizedDialogs({ modalShow, modalState }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(modalShow);
  const [dynamicPlaylists, setDynamicPlaylists] = useState([]);

  const { user } = useSelector(state => state.userAuthentication);

  const getDynamicPlaylists = useCallback(async () => {
    if (!isUndefined(user)) {
      const res = await uploadContentService.uploadContentPlaylist(user);
      setDynamicPlaylists(res?.items);
    }
  }, [user]);

  useEffect(() => {
    getDynamicPlaylists();
  }, [getDynamicPlaylists]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    modalState(false);
    // setOpen(false);
  };

  // console.log(dynamicPlaylists);

  return (
    <div >
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>Open dialog </Button> */}
      <Dialog TransitionComponent={Transition}  disableBackdropClick={true}
        maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle className="dialog-header" id="customized-dialog-title" onClose={handleClose}>PLANLÆG CONTENT</DialogTitle>
        <DialogContent dividers className="dialog-content"  >
          <Grid container item justify="center" lg={12} xs={12} md={12}>
            <Grid lg={6} md={6} xs={6}>
              <Card className="card-main" justify="center" cot  >
                <CardContent >
                  <Typography gutterBottom  >
                    <div className="card-content">
                      Spillelister
                    </div>
                    <Divider></Divider>
                    <Button aria-label="delete" className={classes.avatar1}>
                      <SearchIcon />
                    </Button>
                    <FormControl className={classes.margin} color="red[50]">
                      <BootstrapInput placeholder="Search here" id="bootstrap-input" />
                    </FormControl>
                    <Divider></Divider>
                      <p classname="color-changer"> Vælg spillelisterne du vil tilføje filen til.</p>
                    <Divider></Divider>
                    <Button className={classes.avatar} variant="contained" color="primary">Mark All</Button>
                    <Button className={classes.avatar} variant="contained" color="primary">Unmark All</Button>
                    <Divider></Divider>
                    <Grid container item classname="dialog-checkbox">
                      {!isUndefined(dynamicPlaylists) ? <CheckboxList playlists={dynamicPlaylists}></CheckboxList> : ''}
                    </Grid>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid lg={6} md={6} xs={6}>
              <Card className="card-main" justify="center" cot  >
                <CardContent className="card-content">
                  <Typography >Fil information</Typography>
                  <Divider></Divider>
                  <form className={classes.container} noValidate>
                    <TextField
                      id="datetime-local"
                      label="Start Date"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="datetime-local"
                      label="End Date"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions classname="dialog-action">
          <Button  onClick={handleClose} variant="contained" color="default">FORTYRD</Button>
          <Button  variant="contained" className={classes.buttonColor}  onClick={handleClose}  >GEM</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
