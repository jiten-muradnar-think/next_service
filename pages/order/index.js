import React, { useState, useEffect } from "react";
import styles from "styles/order.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useAuth } from "../../components/auth";
import { Wrapper } from "../../components/wrapper";

function Index() {
  const router = useRouter();

  const [token, setToken] = useState();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    setToken(token);
  }, []);

  const backToHome = () => {
    router.push(`/products/`);
  };

  return (
    // <Wrapper style={{ backgroundColor: "green" }}>
      <div className={styles.order_image}>
        <img
          style={{ width: "30%", borderRadius: "50%" }}
          src={"/delivery boy.gif"}
        ></img>
        <div style={{ marginTop: "20px" }}>
          <h2>
            Congratulations !!!{" "}
            <b className={styles.Congratulations}>
              {token?.firstName.toUpperCase()} {token?.lastName.toUpperCase()}
            </b>
          </h2>
          <h3 className={styles.Successfully_placed}>
            Your order Successfully placed
          </h3>
          <Button variant="outlined" onClick={() => backToHome()}>
            Back to Home
          </Button>
        </div>
      </div>
    // </Wrapper>
  );
}

export default Index;
