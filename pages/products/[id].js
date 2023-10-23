import React from "react";
import { styled } from "@mui/material/styles";
import { useState,useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import styles from "styles/products.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import HomeIcon from "@mui/icons-material/Home";
import { Wrapper } from "../../components/wrapper";
import styles2 from "styles/productsFromCart.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from 'next/image';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: "10px",
}));

export default function SeeMoreAboutProduct({ selectedProductData }) {
  const [selectedProduct,setSelectedProduct] = useState()
  const [count, setCount] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setSelectedProduct(selectedProductData);
  }, [])

  const goToHome = () => {
    router.push(`/products`);
  };

  const addProductToOrder = () => {
    axios
      .post("http://localhost:4000/orders", {
        ...selectedProduct,
        id: "",
        quantity: count,
        time: new Date(),
      })
      .then((data) => {
        setTimeout(() => {
          setsuccessMessage(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = async (data) => {
    await axios
      .delete(`http://localhost:4000/products/${data.id}`)
      .then((data) => {
  router.push('/products')
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const addProductToCart = (data) => {
    axios
      .post("http://localhost:4000/cartProducts", data)
      .then((data) => {
        setsuccessMessage(true);
        auth.setCartItemCount(auth.cartItemCount + 1);
        setTimeout(() => {
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });

    deleteProduct(data);
  };

  const order = (selectedProductData) => {
    addProductToOrder();
    router.push(`/order`);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count >= 2) setCount(count - 1);
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    // <Wrapper style={{ backgroundColor: "green" }}>
      <div>
        {
          <Grid
            container
            spacing={2}
            style={{
              margin: "10px",
              marginLeft: "-20px",
              caretColor: "transparent",
              backgroundColor: "",
            }}
          >
            <div>
              <Button variant="outlined" onClick={() => goToHome()}>
                {" "}
                Back to <HomeIcon style={{marginLeft:'10px'}} />
              </Button>
            </div>
            <br />
            {
              <Grid item xs={12} md={8} lg={12}>
                <Item
                  sx={{ boxShadow: 10 }}
                  className={styles.product_card_padding}
                >
                  <div>
                    <div>
                      <div className={styles.product_image_padding}>
                          <img src={selectedProduct?.image} height="290px" width="250" />
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ color: "red" }}
                        className={styles.product_title}
                      >
                        {selectedProduct?.title}
                   
                      </div>
                      <div>{selectedProduct?.description}</div>
                 
                      <div>
                        {" "}
                        {selectedProduct?.rating ? (
                          <div>
                            <div>
                              Rating : {selectedProduct?.rating.rate}
                            </div>
                            <div>
                              Rating Count : {selectedProduct?.rating.count}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className={styles.product_price_icon_outer}>
                        <div className={styles.product_price_icon}>
                          <div className={styles.price}>
                            ₹ {selectedProduct?.price}
                          </div>
                              <AddCircleIcon
                          className={styles.add_icon}
                          onClick={() => {
                            addProductToCart(selectedProduct);
                          }}
                        />
                          {/* <div className={styles2.incrementDecrement}>
                            <div
                              className={styles2.increment}
                              onClick={() => handleIncrement()}
                            >
                              +
                            </div>
                            <div className={styles2.count}>{count}</div>
                            <div
                              className={styles2.decrement}
                              onClick={() => handleDecrement()}
                            >
                              -
                            </div>
                            </div> */}
                      
                        </div>
                      </div>
                    </div>
                  </div>
                </Item>
              </Grid>
            }
          </Grid>
        }
      </div>
    // </Wrapper>
  );
}

// export async function getStaticProps(context) {
//   const { params } = context;
//   const response = await fetch(`http://localhost:4000/products/${params.id}`);
//   const data = await response.json();
//   console.log(`Generating page for /products/${params.id}`);

//   return {
//     props: {
//       selectedProductData: data,
//     },
//     revalidate: 10,
//   };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "1" } }],
//     fallback: true,
//   };
// }

export async function getServerSideProps(context) {
  const { params } = context;
  let response = null;
  response =await fetch(`http://localhost:4000/products/${params.id}`);
  const data = await response.json();
  return {
    props: {
      selectedProductData: data,
    },
  };
}