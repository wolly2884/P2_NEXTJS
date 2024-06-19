// pages/alteracao/produtos/[id].js

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import classNames from "classnames";
import { Grid,  Button, } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import ArrowBack from "@material-ui/icons/ArrowBack";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Icon from "@material-ui/core/Icon";

import axios from 'axios'; // Import axios
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Parallax from "/components/Parallax/Parallax.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";

const useStyles = makeStyles(styles);

const ProdutoEditPage = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query; // Get id from the URL query parameter
  const [error, setError] = useState("");
  const [cardAnimation, setCardAnimation] = useState("cardHidden");

  const [produto, setProduto] = useState({
    nm_cliente: "",
    dt_nascimento: "",
    cd_cpf: "",
    ds_telefone_cliente: "",
    ds_email_cliente: "",
    ds_logradouro_cliente: "",
    cd_numero_logradouro_cliente: "",
    ds_complemento_logradouro_cliente: "",
    cd_cep_cliente: "",
  });

  useEffect(() => {
    if (id) {
      fetchProduto(id);
    }
  }, [id]);

  const fetchProduto = async (id) => {
    setError(""); // Reset error message
    try {
      const response = await axios.get(`/api/GetId/clientes?id=${id}`); // Use axios for GET request
      if (!response.data) {
        throw new Error('Produto not found');
      }
      console.log(response.data[0]);
      setProduto(response.data[0]);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Set error message from server
      } else {
        setError("An unexpected error occurred. Please try again."); // Set a generic error message
      }
      console.error('Failed to fetch produto:', error);
    }
  };

  const handleSubmit = async (e) => {
    setError(""); // Reset error message

    e.preventDefault();
    try {
      const response = await axios.put(`/api/clientes?id=${id}`, produto); // Use axios for PUT request
      if (response.status === 200) {
        // Handle success, redirect or show success message
        router.back(); // Example: Redirect to home page after successful update
      } else {
        console.error('Failed to update produto');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Set error message from server
      } else {
        setError("An unexpected error occurred. Please try again."); // Set a generic error message
      }
      console.error('Error updating produto:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
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
              <h1 className={classes.title}>Alteração de Cliente</h1>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}> 
          <GridItem xs={12} sm={12} md={12}>
              <Card className={classes[cardAnimation]}>
              <form className={classes.form} onSubmit={handleSubmit} style={{marginTop: '10px', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
              <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Cadastrar Cliente</h4>
                </CardHeader>
                <Grid container spacing={2} style={{marginTop: '10px',}}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="nm_cliente"
                      label="Nome do Cliente..."
                      name="nm_cliente"
                      value={produto.nm_cliente}
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
                      id="dt_nascimento"
                      label="Data de Nascimento..."
                      name="dt_nascimento"
                      type="date"
                      value={produto.dt_nascimento}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              date_range
                            </Icon>
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
                      id="cd_cpf"
                      label="CPF..."
                      name="cd_cpf"
                      value={produto.cd_cpf}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                            fingerprint
                          </Icon>
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
                      id="ds_telefone_cliente"
                      label="Telefone..."
                      name="ds_telefone_cliente"
                      value={produto.ds_telefone_cliente}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              phone
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="ds_email_cliente"
                      label="Email..."
                      name="ds_email_cliente"
                      value={produto.ds_email_cliente}
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
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="ds_logradouro_cliente"
                      label="Endereço..."
                      name="ds_logradouro_cliente"
                      value={produto.ds_logradouro_cliente}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              location_on
                            </Icon>
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
                      id="cd_numero_logradouro_cliente"
                      label="Número..."
                      name="cd_numero_logradouro_cliente"
                      value={produto.cd_numero_logradouro_cliente}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              format_list_numbered
                            </Icon>
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
                      id="ds_complemento_logradouro_cliente"
                      label="Complemento..."
                      name="ds_complemento_logradouro_cliente"
                      value={produto.ds_complemento_logradouro_cliente}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                                notes
                            </Icon>
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
                      id="cd_cep_cliente"
                      label="CEP..."
                      name="cd_cep_cliente"
                      value={produto.cd_cep_cliente}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                                markunread_mailbox
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Atualizar
                    </Button>
                    <Button simple color="primary" size="lg" onClick={() => router.back()}>
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

export default ProdutoEditPage;
