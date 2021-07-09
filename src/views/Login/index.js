import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Link,
  MenuItem,
  TextField,
  Grid,
  Select
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { CircularProgress } from '@material-ui/core';

import './index.scss';
import { ROUTES } from '../../constants/routes';
import InstorexLogo from '../../assets/images/InstoreX3-02.png';
import { userActions } from '../../redux/actions';


export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const cookies = new Cookies();
  const userCookie = cookies.get('user');

  // const [cookies] = useCookies(['user']);

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [networkNames, setNetworkNames] = useState([]);
  const [networkSelected, setNetworkSelected] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { username, password } = inputs;
  const { user, networks } = useSelector(state => state.userAuthentication);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  const handleObtainTokenSubmit = (event) => {
    if (!isUndefined(user) && !isNull(user)) {
      const jwt = user;

      if (username && password && networkSelected) {
        const payload = {
          username: `${networkSelected}/${username}`,
          password: password
        }
        dispatch(userActions.obtainBearerToken(jwt, payload, history));
      }
    }
  }

  const handleSelectNetworkChange = (event) => {
    setNetworkSelected(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (networkSelected && showDropdown) {
      handleObtainTokenSubmit();
    } else {
      setShowDropdown(true);
      if (username && password) {
        const payload = {
          username: username,
          password: password
        }
        dispatch(userActions.login(payload, history, setShowDropdown));
      }
    }
  }

  useEffect(() => {
    if (!isUndefined(networks) && !isNull(networks)) {
      setNetworkNames(networks.networkNames);
    }
  }, [networks]);

  return (
    <Grid container className="login-container" justify="center">
      <Helmet></Helmet>
      <Grid
        item
        className="login-box"
        justify="center"
        xs={11}
        md={8}
        lg={5}
      >
        <Link className="link-title" href={ROUTES.LOGIN}>
          <h1>WELCOME TO <span className="span-orange">INSTOREX</span></h1>
        </Link>
        <Box container xs={12}>
          <div className="login-inner">
            <h3>LOG IND</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                className="credentials-input-field"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                fullWidth
                margin="normal"
                autoFocus
                value={username}
                onChange={handleChange}
              />

              <TextField
                className="credentials-input-field"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                fullWidth
                margin="normal"
                value={password}
                onChange={handleChange}
              />
              {showDropdown === true ?
                <FormControl variant="outlined" className={"network-select-field"}>
                  <InputLabel class="network-input-label">Networks</InputLabel>
                  <Select
                    labelId="network-select-label"
                    id="network-select"
                    value={networkSelected}
                    onChange={handleSelectNetworkChange}
                  >
                    {!isEmpty(networkNames) ? (
                      networkNames.map(item => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))
                    ) : (
                      <div className="loader">
                        <CircularProgress />
                      </div>
                    )}
                  </Select>
                </FormControl> : ''}
              {showDropdown === true ? (
                <>
                  <Button
                    className="back-button"
                    variant="contained"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    Back
                  </Button>
                  <Button
                    className="login-button"
                    variant="contained"
                    type="submit"
                  >
                    LOG IND
                  </Button>
                </>
              ) : (
                  <Button
                    className="next-button"
                    variant="contained"
                    type="submit"
                  >
                    Next
                  </Button>
                )
              }
            </form>
          </div>
          <div className="instorex-logo-container">
            <img className="instorex-logo-img" src={InstorexLogo} alt="Instorex Logo" />
          </div>
        </Box>
      </Grid>
    </Grid >
  )
}
