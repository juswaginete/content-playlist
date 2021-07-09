import React, { useEffect, useCallback, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { isUndefined, isEmpty, isNull } from 'lodash';

import './index.scss';
import EditLiveContent from '../../components/EditLiveContent';
import { uploadContentService } from '../../services';

import { useHistory } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#252525",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    color: theme.palette.common.white,
  },
  button: {
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#424242",
    },
    '&:nth-of-type(even)': {
      backgroundColor: "#252525",
    },
  },
}))(TableRow);

function createData(SPILLELISTER, BUTTON) {
  return { SPILLELISTER, BUTTON };
}

const useStyles = makeStyles({
  table: {
    maxWidth: 2000,
    minWidth: 400,
  },
  button: {
    marginTop: 10,
    height:40,
    width: 80,
    float: 'right',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'transparent'
  }
});

export default function CustomizedTables() {
  const classes = useStyles();
  const history = useHistory();

  const [dynamicPlaylists, setDynamicPlaylists] = useState([]);
  const { user } = useSelector(state => state.userAuthentication);
  
  const handleRedirectToPage = (event) => {
    if (event.currentTarget.dataset.value === "playlist") {
      history.push(`/playlist/${event.currentTarget.dataset.id}`);
      window.location.reload();
    }
  }

 
  const getDynamicPlaylists = useCallback(async () => {
    if (!isUndefined(user)) {
      const res = await uploadContentService.uploadContentPlaylist(user);
      setDynamicPlaylists(res?.items);
    }
  }, [user]);

  useEffect(() => {
    getDynamicPlaylists();
  }, [getDynamicPlaylists]);

  // const rows = [
  //   createData('Frozen yoghurt',
  //     <Button onClick={handleRedirectToPage} variant="contained" startIcon={<EditIcon> </EditIcon>} data-value="playlist">  RET</Button>
  //   ),

  //   createData('Ice cream sandwich', <Button  variant="contained" startIcon={<EditIcon> </EditIcon>}  >  RET</Button>),
  //   createData('Eclair', <Button  variant="contained" startIcon={<EditIcon> </EditIcon>}  >  RET</Button>),
  //   createData('Cupcake', <Button  variant="contained" startIcon={<EditIcon> </EditIcon>}  >  RET</Button>),
  //   createData('Gingerbread', <Button  variant="contained" startIcon={<EditIcon> </EditIcon>}  >  RET</Button>),
  // ];

  return (
    <div>
      <span className="span-design">
        <div className="icon-design"><WifiTetheringIcon /> LIVE </div>
        <h3 className="text-design">  CONTENT - HQ</h3>
      </span>
      <TableContainer component={Paper} className={classes.table}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">SPILLELISTER</StyledTableCell>
              <StyledTableCell align="right">&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => (
              <StyledTableRow key={row.name} >
                <StyledTableCell align="left">{row.SPILLELISTER}</StyledTableCell>
                <StyledTableCell align="right">{row.BUTTON}</StyledTableCell>
              </StyledTableRow>
            ))} */}
            {!isUndefined(dynamicPlaylists) ? (
              [...dynamicPlaylists].map(item => (
                <StyledTableRow key={item.name} >
                  <StyledTableCell align="left">{item.name}</StyledTableCell>
                  <StyledTableCell align="left"> <Button
                    onClick={handleRedirectToPage}
                    variant="contained"
                    startIcon={<EditIcon />}
                    data-value="playlist"
                    data-id={item.id}
                    className={classes.button}
                  >
                    RET  
                  </Button></StyledTableCell>

                </StyledTableRow>
              ))
            ) : (
              <div className="loader">
                <CircularProgress />
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
