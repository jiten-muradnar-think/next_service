import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import styles from "styles/products.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { Wrapper } from "../../components/wrapper";
import Tooltip from "@mui/material/Tooltip";
import styles2 from "styles/productsFromCart.module.css";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: "10px",
}));

export default function MyOrder({ orders }) {
  const router = useRouter();

  const backToHome = () => {
    router.push(`/products`);
  };

  return (
    // <Wrapper>
      <div style={{ caretColor: "transparent" }}>
        <Button variant="outlined" onClick={() => backToHome()}>
          Back to <HomeIcon style={{marginLeft:'10px'}} />
        </Button>
        <br/>   <br/>
        <h3>My Order List :</h3>
        <div>
          {
            <Grid container spacing={2} style={{ marginTop: "40px" }}>
              <br />
              {orders.length ? (
                orders.map((data, index) => {
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
                          {data?.title?.length<= 56? <div><br/><br/></div>:<div><br/></div>}
                          {/* {data?.title?.slice(0,28)}
                      {data?.title?.length >= 28? 
                      <Tooltip title={data?.title?.slice(20)} arrow>
                            <Button
                              sx={{ m: 0 }}
                              style={{ padding: "none", margin: "none"}}
                            >
                             ...
                            </Button>
                          </Tooltip>
                       :''} */}
                        </div>
                        <div className={styles2.tooltipQuantity}>
                          <Tooltip title={data.description} arrow>
                            <Button
                              sx={{ m: 1 }}
                              style={{ padding: "none", margin: "none" }}
                            >
                              see more
                            </Button>
                          </Tooltip>
                          <div className={styles2.incrementDecrement}>
                            <div className={styles2.increment}>
                              Quantity : {data.quantity}
                            </div>
                          </div>
                        </div>
                        <div className={styles.product_price_icon_outer}>
                          <div className={styles.product_price_icon}>
                            <div className={styles.price}>₹ {data.price}</div>
                            <div className={styles.price}> {data?.time}</div>
                          </div>
                        </div>
                      </Item>
                    </Grid>
                  );
                })
              ) : (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <div>No Orders Yet</div>
                  <LocalMallIcon style={{ marginLeft: "15px",width:'100%' }} />
                </div>
              )}
            </Grid>
          }
        </div>
      </div>
    // </Wrapper>
  );
}

export async function getServerSideProps() {
  let response = null;
  response = await axios.get("http://localhost:4000/orders");
  return {
    props: {
      orders: response?.data,
    },
  };
}
