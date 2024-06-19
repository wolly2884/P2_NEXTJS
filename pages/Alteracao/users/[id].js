import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import classNames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import { Grid,  Button, } from '@material-ui/core';
import TextField from '@mui/material/TextField';

import ArrowBack from "@material-ui/icons/ArrowBack";
import InputAdornment from '@mui/material/InputAdornment';

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/Lock";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import axios from 'axios'; // Import axios
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Parallax from "/components/Parallax/Parallax.js";
import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";

const useStyles = makeStyles(styles);

const UserEditPage = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query; // Get id from the URL query parameter
  const [error, setError] = useState("");
  const [cardAnimation, setCardAnimation] = useState("cardHidden");

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  const fetchUser = async (id) => {
    setError(""); // Reset error message

    try {
      const response = await fetch(`/api/users?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error('User not found');
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Set error message from server
      } else {
        setError("An unexpected error occurred. Please try again."); // Set a generic error message
      }
      console.error('Failed to fetch user:', error);
    }
  };

  const handleSubmit = async (e) => {
    setError(""); // Reset error message

    e.preventDefault();
    try {
      const response = await axios.put(`/api/users?id=${id}`, user); // Use axios for PUT request
      if (response.status === 200) {
        // Handle success, redirect or show success message
        router.back(); // Example: Redirect to previous page after successful update
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Set error message from server
      } else {
        setError("An unexpected error occurred. Please try again."); // Set a generic error message
      }
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <Header
        color="transparent"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />
      <Parallax filter responsive image="/img/landing-bg.jpg" style={{ height: "40vh" }}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>Alteração de Usuário</h1>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} style={{marginTop: '-10vh',}}> 
          <GridItem xs={12} sm={12} md={12}>
              <Card className={classes[cardAnimation]}>
                <form className={classes.form} onSubmit={handleSubmit} style={{marginTop: '10px', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
                <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Cadastrar Usuario</h4>
                  </CardHeader>
                  <Grid container spacing={2} style={{marginTop: '10px',}}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="Primeiro Nome"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Último Nome"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
                <CardFooter className={classes.cardFooter}>
                  <Button simple color="primary" size="lg" type="submit">
                    Cadastrar
                  </Button>
                  <Button simple color="primary" size="lg" onClick={() => router.back()} >
                    <ArrowBack className={classes.inputIconsColor} />
                    Voltar
                  </Button>
                </CardFooter>
              </form>
            </Card>
            </GridItem>
          </div>
      </div>
      <Footer />
    </div>   
  );
};

export default UserEditPage;
