import React from "react";
import { styled } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import styles from "styles/products.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Wrapper } from "../../components/wrapper";
import { useAuth, AuthContext } from "../../components/auth";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: "10px",
}));

export default function Products({ products,open }) {
  const [allProductData, setAllProductData] = useState([]);
  const [successMessage, setsuccessMessage] = useState(false);
  const [productCategory, setProductCategory] = useState("All");
  const [productPrice, setProductPrice] = useState("0");
  const router = useRouter();
  let auth = useAuth();

  useEffect(() => {
    setAllProductData(
      products.filter((value) => {
        if (productCategory == "All" && value.price >= productPrice) {
          return value;
        } else if (
          value.category == productCategory &&
          value.price >= productPrice
        ) {
          return value;
        }
      })
    );
  }, [productCategory, productPrice,products]);

  // const getProductFromCartCount = async () => {
  //   let data = await axios.get("http://localhost:4000/cartProducts");
  //   auth.setCartItemCount(data.data.length);
  // };

  // useEffect(() => {
  //   getProductFromCartCount()
  // })

  const seeMoreAboutProduct = (data) => {
    router.push(`/products/${data.id}`);
  };

  const getLatestProductData = async (data) => {
    let response = await axios.get("http://localhost:4000/products");
    setAllProductData(response.data);
  };

  const deleteProduct = async (data) => {
    await axios
      .delete(`http://localhost:4000/products/${data.id}`)
      .then((data) => {
        getLatestProductData();
        getProductFromCartCount()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProductToCart = (data) => {
    setsuccessMessage();


    axios
      .post("http://localhost:4000/cartProducts", data)
      .then((data) => {
        setsuccessMessage(true);
        auth.setCartItemCount(auth.cartItemCount + 1);
        setTimeout(() => {
          setsuccessMessage(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });

    deleteProduct(data);
  };

  const showWarningMessage = (message) => {
    return (
      <Stack
        sx={{
          height: "50px",
          display: "flex",
          flexDirection: "row-reverse",
          marginTop: "30px",
        }}
        spacing={2}
      >
        <Alert variant="filled" severity="warning">
          {message}
        </Alert>
      </Stack>
    );
  };

  function selectProductCategory() {
    return (
      <Box sx={{ minWidth: 120 }} style={{ borderBottom: "none !important" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productCategory}
            label="Category"
            onChange={(e) => setProductCategory(e.target.value)}
          >
            {" "}
            <MenuItem value={"All"}>All </MenuItem>
            <MenuItem value={"mens clothing"}> Mens clothing </MenuItem>
            <MenuItem value={"womens clothing"}> Womens clothing </MenuItem>
            <MenuItem value={"jewelery"}> Jewelery </MenuItem>
            <MenuItem value={"electronics"}> Electronics </MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

  function selectProductPrice() {
    return (
      <Box sx={{ minWidth: 120 }} style={{ borderBottom: "none !important" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Price</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productPrice}
            label="Category"
            // onChange={(e) => setProductCategory(e.target.value)}
            onChange={(e) => setProductPrice(e.target.value)}
          >
            {" "}
            <MenuItem value={0}>All </MenuItem>
            <MenuItem value={50}>Greater Than 50</MenuItem>
            <MenuItem value={100}>Greater Than 100</MenuItem>
            <MenuItem value={200}>Greater Than 200</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    // <Wrapper>
    <>
        <h3>Product List : </h3>
      <div>
        {
          <Grid container spacing={2} style={{ marginTop: "0px" }}>
            <Grid container spacing={2} style={{ marginTop: "0px"}}>
              {" "} 
              <Grid
                item
                xs={12}
                md={3}
                lg={3}
                style={{ caretColor: "transparent" }}
              >
                <Item
                  sx={{ boxShadow: 10 }}
                  className={styles.product_card_padding}
                >
                  {selectProductCategory()}
                </Item>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                lg={3}
                style={{ caretColor: "transparent"}}
              >   
                <Item
                  sx={{ boxShadow: 10 }}
                  className={styles.product_card_padding}
                >
                  {selectProductPrice()}
                </Item>
              </Grid>
             
              <Grid
                item
                xs={12}
                md={6}
                lg={6}
                style={{ caretColor: "transparent" }}
              >  
                {successMessage
                ? showWarningMessage("Item added to the cart")
                : ""}
                </Grid>
        </Grid>
        <br/>

        <br/>
            <br />
            {allProductData.length ? (
              allProductData.map((data, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    style={{ caretColor: "transparent"}}
                    key={index}
                  >
                    <Item
                      key={data.id}
                      sx={{ boxShadow: 10 }}
                      className={styles.product_card_padding}
                    >
                      <div className={styles.product_image_padding}>
                        <img src={data.image} height="170px" width="40%" />
                      </div>
                      <div
                        style={{ color: "red" }}
                        className={styles.product_title}
                      >
                        {data.title}{data?.title?.length}
                        {/* {data?.title?.length<= 55? <div><br/></div>:''} */}
                        {data?.title?.length<= 55? <div><br/><br/></div>:<div><br/></div>}
                        {/* {data?.title?.length<= 25? <div><br/></div>:''} */}
                        {/* {data.title.slice(0, 25)} */}
                        {/* {data.title.length >= 25? '...':''} */}

                        {/* {data?.title?.length >= 25 ? (
                          <Tooltip title={data?.title?.slice(25)} arrow>
                            <Button
                              sx={{ m: 0 }}
                              style={{ padding: "none", margin: "none" }}
                            >
                              ...
                            </Button>
                          </Tooltip>
                        ) : (
                          ""
                        )} */}
                      </div>
                      <Button
                        variant="outlined"
                        onClick={() => seeMoreAboutProduct(data)}
                      >
                        See more about product
                      </Button>
                      <div className={styles.product_price_icon_outer}>
                        <div className={styles.product_price_icon}>
                          <div className={styles.price}>₹ {data.price}</div>

                          <AddCircleIcon
                            className={styles.add_icon}
                            onClick={() => {
                              addProductToCart(data);
                            }}
                          />
                        </div>
                      </div>
                    </Item>
                  </Grid>
                );
              })
            ) : (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <h1>No Data</h1>
              </div>
            )}
          </Grid>
        }
      </div>
      </>
    // </Wrapper>
  );
}

export async function getServerSideProps() {
  let response = null;
  response = await axios.get("http://localhost:4000/products");
  return {
    props: {
      products: response?.data,
    },
  };
}


