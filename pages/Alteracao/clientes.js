import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowBack from "@material-ui/icons/ArrowBack";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Icon from "@material-ui/core/Icon";
// core components
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const [cardAnimation, setCardAnimation] = useState("cardHidden");
  const [formData, setFormData] = useState({
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
  const [error, setError] = useState("");
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardAnimation("");
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Reset error message

    try {
      const response = await axios.post("/api/cadcliente", formData);
      console.log("Signup response:", response.data);
      // Redirect to the login page or some other page
      router.push("/"); // Example: Redirect to home page
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Set error message from server
      } else {
        setError("An unexpected error occurred. Please try again."); // Set a generic error message
      }
    }
  };

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...props}
      />
      <Parallax filter responsive image="/img/landing-bg.jpg" style={{ height: '40vh' }}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h1 className={classes.title}>Projeto de NextJS</h1>
              <h4>
                Projeto de NextJS 
                Linguagem de Programacao IV INTERNET-A485-N-ANALISE E DESENV. DE SISTEMAS-129-20241
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
            <GridItem xs={12} sm={12} md={12}>
              <Card className={classes[cardAnimation]}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Cadastrar Cliente</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Nome do Cliente..."
                      id="nm_cliente"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: formData.nm_cliente,
                        onChange: handleChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Data de Nascimento..."
                      id="dt_nascimento"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "date",
                        value: formData.dt_nascimento,
                        onChange: handleChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              date_range
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="CPF..."
                      id="cd_cpf"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: formData.cd_cpf,
                        onChange: handleChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              fingerprint
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Telefone..."
                      id="ds_telefone_cliente"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: formData.ds_telefone_cliente,
                        onChange: handleChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              phone
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="ds_email_cliente"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        value: formData.ds_email_cliente,
                        onChange: handleChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Endereço..."
                      id="ds_logradouro_cliente"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: formData.ds_logradouro_cliente,
                        onChange: handleChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              location_on
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Número..."
                      id="cd_numero_logradouro_cliente"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: formData.cd_numero_logradouro_cliente,
                        onChange: handleChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              format_list_numbered
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Complemento..."
                      id="ds_complemento_logradouro_cliente"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: formData.ds_complemento_logradouro_cliente,
                        onChange: handleChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              notes
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="CEP..."
                      id="cd_cep_cliente"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: formData.cd_cep_cliente,
                        onChange: handleChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              markunread_mailbox
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  {error && (
                    <div style={{ color: "red", textAlign: "center" }}>
                      {error}
                    </div>
                  )}
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Cadastrar
                    </Button>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={() => router.back()}
                    >
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
}
