import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import classnames from 'classnames';
import ScheduleModal from '../Modal/scheduleModal';
import RemoveModal from '../Modal/removeModal';
import VarighedModal from '../Modal/varighedModal';
/* 
import RemoveModal from '../../../components/FileUpload/modals/RemoveModal';
import DeleteModal from '../../../components/FileUpload/modals/DeleteModal'; */

import './index.scss';
import { orange } from '@material-ui/core/colors';


const BootstrapInput = withStyles((theme) => ({
  root: {
    ' + ': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: orange[800],
    border: '1px solid #ff8000',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
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
      borderRadius: 4,
      borderColor: orange[800],
      backgroundColor: orange[800],
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  item: {
    width: 200,
  },
})); 


export default function CustomizedSelects() {
  const classes = useStyles();
  const [option, setOption] = useState('');
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const [isPreviewModalShow, setIsPreviewModalShow] = useState(false);
  const [isScheduleModalShow, setIsScheduleModalShow] = useState(false);
  const [isRemoveModalShow, setIsRemoveModalShow] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  
  const handleClick = (event) => {
    const currentTarget = event.target.dataset.value;

    if (currentTarget === "schedule-modal") {
      setIsScheduleModalShow(true);
    } else if (currentTarget === "slet-modal") {
      setIsRemoveModalShow(true);
    } else if (currentTarget === "preview-modal") {
      setIsPreviewModalShow(true);
    } else if (currentTarget === "delete-modal") {
      setIsDeleteModalShow(true);
    }
  };

  const handleClose = () => {
    setIsPreviewModalShow(false);
  };

  return (
    <div className="playlist-dropdown-selection container">
      <FormControl className={classnames(
        classes.margin,
        "dropdown-selection")}>
        <Select 
          IconComponent={AddIcon}
          classname="demo-customized-select-label"
          labelId="demo-customized-select-label"
          id="demo-customized-select" 
          value={option}
          // onChange={handleChange}
          input={<BootstrapInput />}>
          <MenuItem className={classes.item} value="schedule-modal" onClick={handleClick}>Schedule</MenuItem>
          <MenuItem className={classes.item} value="preview-modal" onClick={handleClick}>Varighed</MenuItem>
          <MenuItem className={classes.item} value="slet-modal" onClick={handleClick}>Slet</MenuItem>
        </Select>
        {isScheduleModalShow ? (<ScheduleModal modalShow={isScheduleModalShow} modalState={setIsScheduleModalShow} />) : ''}
        {isRemoveModalShow ? (<RemoveModal modalShow={isRemoveModalShow} modalState={setIsRemoveModalShow} />) : ''}
         {/* {isDeleteModalShow ? (<DeleteModal modalShow={isDeleteModalShow} modalState={setIsDeleteModalShow} />) : ''} */}
        {isPreviewModalShow ? (<VarighedModal modalShow={isPreviewModalShow} modalState={setIsPreviewModalShow} />) : ''}
      </FormControl>
    </div>
  );
}
