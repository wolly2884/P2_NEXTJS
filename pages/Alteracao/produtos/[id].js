import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import classNames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import { Grid,  Button, } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import ArrowBack from "@material-ui/icons/ArrowBack";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Datetime from "react-datetime";
import Icon from "@material-ui/core/Icon";

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

const ProdutoEditPage = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query; // Get id from the URL query parameter
  const [error, setError] = useState("");
  const [cardAnimation, setCardAnimation] = useState("cardHidden");

  const [produto, setProduto] = useState({
    ds_produto: '',
    vl_unitario: '',
    vl_total: '',
    qt_quantidade: '0', // Inicializado como string
    ds_observacao: '',
    dt_compra: '',
  });

  useEffect(() => {
    if (id) {
      fetchProduto(id);
    }
  }, [id]);

  const fetchProduto = async (id) => {
    setError(""); // Reset error message

    console.log(id);
    try {
      const response = await axios.get(`/api/GetId/produtos?id=${id}`); // Use axios for GET request
      if (!response.data) {
        throw new Error('Produto not found');
      }
      setProduto(response.data);
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
      const formattedProduto = {
        ...produto,
        qt_quantidade: produto.qt_quantidade.toString(), // Garantir que qt_quantidade seja string
      };

      const response = await axios.put(`/api/produtos?id=${id}`, formattedProduto); // Use axios for PUT request
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
              <h1 className={classes.title}>Alteração de Produto</h1>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}> 
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes[cardAnimation]}>
                <form className={classes.form} onSubmit={handleSubmit} style={{marginTop: '10px', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
                <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Cadastrar Produto</h4>
                </CardHeader>
                <Grid container spacing={2} style={{marginTop: '10px',justifyContent: "center"}} justifyContent="center">
                  <Grid item xs={10}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="ds_produto"
                      label="Descrição do Produto"
                      name="ds_produto"
                      value={produto.ds_produto}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              description
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="vl_unitario"
                      label="Preço Unitário"
                      name="vl_unitario"
                      value={produto.vl_unitario}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              attach_money
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="vl_total"
                      label="Preço Total"
                      name="vl_total"
                      value={produto.vl_total}
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
                  <Grid item xs={10}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="qt_quantidade"
                      label="Quantidade"
                      name="qt_quantidade"
                      value={produto.qt_quantidade}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              attach_money
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="ds_observacao"
                      label="Observação"
                      name="ds_observacao"
                      value={produto.ds_observacao}
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
                  <Grid Item xs={10} >
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="dt_compra"
                      label="Data da Compra"
                      name="dt_compra"
                      type="date"
                      value={produto.dt_compra}
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
                  <GridContainer>
              </GridContainer>
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
