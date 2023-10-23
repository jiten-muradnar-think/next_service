import React from "react";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import styles from "styles/products.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import styles2 from "styles/productsFromCart.module.css";
import HomeIcon from "@mui/icons-material/Home";
import { useAuth } from "../../components/auth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: "10px",
}));

export default function ProductsFromCart() {
  const [allCartProductData, setAllCartProductData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [productDeletedUpdated, setProductDeletedUpdated] = useState(false);

  const router = useRouter();
  let auth = useAuth();

  // const getProductFromCartCount = async () => {
  //   let data = await axios.get("http://localhost:4000/cartProducts");
  //   console.log("data??",data)
  //   auth.setCartItemCount(data.data.length);
  // };

  // useEffect(() => {
  //   getProductFromCartCount()
  // },[productDeletedUpdated])
  
  useEffect(() => {
    const getUserData = async () => {
      let data = await axios.get("http://localhost:4000/cartProducts");
      let newData = data.data.map((value, i) => {

        return { ...value, quantity: 1};
      });
      setAllCartProductData(newData);
      auth.setCartItemCount(data.data.length);
    };
    getUserData();
  }, [productDeletedUpdated]);

  const addProductBackToTheCart = async (data) => {
    axios
      .post(`http://localhost:4000/products`, data)
      .then((data) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProductFromCart = async (propsData, showError = true) => {
    await axios
      .delete(`http://localhost:4000/cartProducts/${propsData.id}`)
      .then((data) => {
        addProductBackToTheCart(propsData);
        setProductDeletedUpdated(true);
        auth.setCartItemCount(auth.cartItemCount - 1);
        if (showError) setErrorMessage(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setProductDeletedUpdated(false);
      setErrorMessage(false);
    }, 1000);
  };

  const order = (data) => {
    let showError = false;
    addProductToOrder(data);
    addProductBackToTheCart(data);
    deleteProductFromCart(data, showError);
    router.push(`/order`);
  };

  const showWarningMessage = () => {
    return (
      <Stack
      sx={{height:'50px', display: "flex", flexDirection: "row-reverse",marginTop:'-30px'}}
        spacing={2}
      >
        <Alert variant="filled" severity="warning">
          Item deleted successfully
        </Alert>
      </Stack>
    );
  };

  const backToHome = () => {
    router.push(`/products/`);
  };

  const handleIncrement = (data) => {
    setAllCartProductData(
      allCartProductData.map((value, index) => {
        if (data.id == value.id) {
          let updateQuantity = (value.quantity = value.quantity + 1);
          // let price = (value.price * updateQuantity)
          return { ...value, quantity: updateQuantity};
        }
        return value;
      })
    );
  };

  const handleDecrement = (data) => {
    setAllCartProductData(
      allCartProductData.map((value, index) => {
        if (data.id == value.id) {
          let updateQuantity = 1;
          if (value.quantity >= 2) {
            updateQuantity = value.quantity - 1;
          }
          return { ...value, quantity: updateQuantity };
        }
        return value;
      })
    );
  };

  const addProductToOrder = (data) => {
    let price=data.price * data.quantity
    axios
      .post("http://localhost:4000/orders", {
        ...data,
        price,
        id: "",
        time: new Date(),
      })
      .then((data) => {
        setTimeout(() => {}, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    // <Wrapper>
      <div style={{ caretColor: "transparent" }}>
        <Button variant="outlined" onClick={() => backToHome()}>
          Back to <HomeIcon style={{marginLeft:'10px'}} />
        </Button>
        <br/>   <br/>
        {allCartProductData.length ? <h3>Cart Item List :   {errorMessage
                ? showWarningMessage("Item deleted successfully ")
                : ""}</h3>:''}
        <div>
          {
            <Grid container spacing={2} style={{ marginTop: "0px" }}>

              {allCartProductData.length ? (
                allCartProductData.map((data, index) => {
                  return (
                    <Grid item xs={12} md={4} lg={3} key={index}>
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
                          {data.title}
                          {data?.title?.length<= 55? <div><br/><br/></div>:<div><br/></div>}
                       </div> 



                        <div className={styles2.tooltipQuantity}>
                       
                        <Tooltip title={data.description} arrow>
                            <Button
                              sx={{ m: 1 }}
                              style={{ padding: "none", margin: "none" }}
                            >
                           Description
                            </Button>
                          </Tooltip>
                          <div className={styles.price}>₹ {data.price * data.quantity}</div>
                         
                        </div>
                        <div className={styles.product_price_icon_outer}>
                          <div className={styles.product_price_icon}>
                          <Button
                              variant="contained"
                              onClick={() => order(data)}
                            >
                              Buy Now{" "}
                              <LocalMallIcon style={{ marginLeft: "10px" }} />
                          </Button>
                          <div className={styles2.incrementDecrement}>
                            <div
                              className={styles2.increment}
                              onClick={() => handleIncrement(data)}
                            >
                              +
                            </div>
                            <div className={styles2.count}>{data.quantity }</div>
                            <div
                              className={styles2.decrement}
                              onClick={() => handleDecrement(data)}
                            >
                              -
                            </div>
                          </div>
                            <DeleteIcon
                              className={styles.delete_icon}
                              onClick={() => {
                                deleteProductFromCart(data);
                              }}
                            />
                          </div>
                        </div>
                      </Item>
                    </Grid>
                  );
                })
              ) : (
                <div style={{ textAlign: "center", width: "100%",color:'red'}}>
                  <h2>Cart Is Empty </h2>
                  <img height="300px" src={"/emptyCart.png"}></img>
                </div>
              )}
            </Grid>
          }
        </div>
      </div>
    // </Wrapper>
  );
}
