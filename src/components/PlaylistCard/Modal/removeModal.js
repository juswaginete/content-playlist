import React, { useState, makeStyles } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { deepOrange, red } from '@material-ui/core/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ modalShow, modalState }) {


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
            <div>
                {/* <Button variant="outlined" onClick={handleClickOpen}></Button> */}
                {/* <Dialog disableBackdropClick={true}
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle className="dialog-modal-title" id="alert-dialog-slide-title">{"Delete file?"}</DialogTitle>
                    <DialogContent className="dialog-modal-content" >
                        <DialogContentText color="red[50]" classname="dialog-modal-contexts" id="alert-dialog-slide-description" >
                            You can't delete a file as long as it assigned to a playlist.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="dialog-modal-action">
                        <Button variant="contained" color="default" onClick={handleClose} >
                            Cancel
                        </Button>
                        <Button classname="button-color" className="color-changer" variant="contained" onClick={handleClose} >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </div>
        </div>
    );
}
