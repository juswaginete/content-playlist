import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  createMuiTheme,
  CardContent,
  Grid,
  makeStyles,
  ThemeProvider
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import FolderIcon from '@material-ui/icons/Folder';
import { deepOrange } from '@material-ui/core/colors';
import { CircularProgress } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useSelector } from 'react-redux';
import { isUndefined, isEmpty, isNull } from 'lodash';

import './index.scss';
import Navbar from '../../components/Navbar';

/**Connections */
import OutlinedCard from '../../components/FileUpload/Cards';
import StandaloneToggleButton from '../../components/FileUpload/Folders';
import CustomizedSelects from '../../components/FileUpload/Dropdowns';
import { uploadContentService } from '../../services';



const theme = createMuiTheme({
  root: {
    maxWidth: 345,
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: deepOrange[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2rem 0',
  },
});

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: deepOrange[500],
  },
  buttonFolderStepper: {
    color: 'white',
    marginLeft: '15px'
  },
  iconFolderStepper: {
    fontSize: '15px',
    color: 'white'
  },
  buttonFolderStepperActive: {
    color: '#f60',
    marginLeft: '15px'
  },
  iconFolderStepperActive: {
    fontSize: '15px',
    color: '#f60'
  }
}))

export default function UploadContent() {
  const classes = useStyles();

  const [uploadContents, setUploadContents] = useState([]);
  const { user } = useSelector(state => state.userAuthentication);

  let [folderStepper, setFolderStepper] = useState([{
    name: 'ALT',
    isActive: true,
    position: 1
  }]);

  const getUploadedContents = useCallback(async () => {
    if (!isUndefined(user)) {
      const res = await uploadContentService.uploadContent(user);
      setUploadContents(res?.items);
    }
  }, [user]);

  useEffect(() => {
    getUploadedContents();
  }, [getUploadedContents]);

  const getUploadContentSubfolder = useCallback(async (data) => {
    if (!isUndefined(user)) {
      const res = await uploadContentService.uploadContentSubfolder(user, data);
      setUploadContents(res?.items);
    }
  }, [user]);

  const handleClickFolder = (event) => {
    const data = event.currentTarget.dataset.value;
    setUploadContents([]);
    getUploadContentSubfolder(data);
    let folders = appendFolderStepper(data);
    setFolderStepper(folders);
  }

  const handleClickFolderStepper = async (data) => {
    setUploadContents([]);
    let folders = removeExcessFolderStepper(data);
    folders = setActiveFolderStepper(data, folders);
    setFolderStepper(folders);
    if (!isUndefined(user)) {
      if (data.position === 1) {
        const res = await uploadContentService.uploadContent(user);
        setUploadContents(res?.items);
      } else {
        const res = await uploadContentService.uploadContentSubfolder(user, data.name);
        setUploadContents(res?.items);
      }
    }
  }

  const appendFolderStepper = (data) => {
    let folders = folderStepper;
    folders.map(a => a.isActive = false);
    folders.push({
      name: data,
      position: (Math.max.apply(Math, folders.map(function (o) { return o.position; }))) + 1,
      isActive: true
    });
    folders = folders.sort(function (a, b) {
      return a.position - b.position
    });
    return folders;
  }

  const removeExcessFolderStepper = (data) => {
    let folders = folderStepper;
    folders = folders.filter(x => x.position <= data.position);
    return folders;
  }

  const setActiveFolderStepper = (data, folders) => {
    let selectedFolder = folders.filter(x => x.position === data.position)[0];
    selectedFolder.isActive = true;
    folders = folders.filter(x => x.position !== data.position);
    folders.push(selectedFolder);
    folders = folders.sort(function (a, b) {
      return a.position - b.position
    });
    return folders;
  }

  return (
    <>
      <Navbar />
      <Grid container className="dashboard-content container" justify="center">
        <Grid
          className="dashboard-content main-menu"
          justify="center"
          xs={11}
          md={8}
          lg={8}>
          <div className="positionText">
            <div className="inner-content">
              <PublishIcon />
            </div>
            <h1 className="title" >
              Handter
            </h1>
          </div>
          <div className="positionButton">
            <ThemeProvider theme={theme} >
              <Button className="buttonStyle" color="primary" variant="contained" >Upload</Button>
            </ThemeProvider>
          </div>

          {/* Here start the code for card media content */}
          <Card className="card-main">
            <Grid container>
              {/* <CardHeader className="card-header" avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  <FolderIcon></FolderIcon>
                </Avatar>}>
              </CardHeader>
              ALT */}
              {
                folderStepper.map(item => {
                  return (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickFolderStepper(item);
                      }}
                      className={item.isActive === false ?
                        classes.buttonFolderStepper :
                        classes.buttonFolderStepperActive}
                      type="button"
                      startIcon={<FolderIcon className={item.isActive === false ?
                        classes.iconFolderStepper :
                        classes.iconFolderStepperActive} />}
                    >
                      {item.name}
                    </Button>
                  )
                })
              }

            </Grid>

            <CardContent className="card-content" >
              <Box className="card-box" >
                <Grid className="grid-menu-container" container spacing={3} item justify="center">
                  {
                    isUndefined(uploadContents) || isEmpty(uploadContents) || isNull(uploadContents) ? (
                      <div className={classes.loader}>
                        <CircularProgress />
                      </div>
                    ) : (
                      <Grid container>
                        {
                          [...uploadContents].filter(x => x.mediaType === "Folder").map(item => {
                            if (item) {
                              return (
                                <ButtonBase className="content-folder" data-value={item.name} onClick={handleClickFolder}>
                                  <Grid>
                                    <StandaloneToggleButton className="folder-icon" item xs={12} sm={5} md={3}>
                                    </StandaloneToggleButton>
                                    <h4 className="content-folder-label">{item.name}</h4>
                                  </Grid>
                                </ButtonBase>
                              )
                            } else {
                              return null
                            }
                          })
                        }
                        {
                          [...uploadContents].filter(x => x.mediaType !== "Folder").map(item => {
                            if (item) {
                              console.log('item: ' + JSON.stringify(item.mediaType));

                              return (
                                <Grid item xs={12} sm={5} md={3} className="media-cards">
                                  <CustomizedSelects />
                                  <OutlinedCard filename={item.fileName} fileType={item.mediaType} />
                                </Grid>
                              )
                            } else {
                              return null
                            }
                          })
                        }
                      </Grid>
                    )}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}