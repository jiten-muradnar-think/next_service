import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth, AuthContext } from "../components/auth";
import { useRouter } from "next/router";
import {Wrapper} from "../components/wrapper";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    setErrorInHeader: "",
  });

  const router = useRouter();
  let context = React.useContext(AuthContext);
  // let auth = useAuth();

  const showErrorMessage = (error) => {
    return <p style={{ color: "red" }}>{error}</p>;
  };

  // useEffect(() => {
  //   getProductFromCartCount()
  // })
  

  // const getProductFromCartCount = async () => {
  //   let data = await axios.get("http://localhost:4000/cartProducts");
  //   auth.setCartItemCount(data.data.length);
  // };

  useEffect(() => {
    let token;
    token = localStorage.getItem("token");
    token = JSON.parse(token);
    // setTokenData(token);

    // if (!token?.email) {
    //   router.push("/");
    // }

    // if (!token?.email && router.pathname == "/register") {
    //   router.push("/register");
    // }

    if (token?.email && router.pathname == "/") {
      router.push("/products");
    }
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError({ ...error, setErrorInHeader: "" });
    if (email && password) {
      let checkUserExist;
      axios
        .get("http://localhost:4000/userList")
        .then((data) => {
          let apiResponse = data.data;
          checkUserExist = apiResponse.filter(
            (value, i) => value.email == email && value.password == password
          );

          if (checkUserExist) {
            let tokenData = {...checkUserExist[0],password:''}
            localStorage.setItem("token",JSON.stringify(tokenData));
            router.push("/products");
          } else {
            setError({
              ...error,
              setErrorInHeader: "Invalid User name or Password",
              emailError: "",
              passwordError: "",
            });
          }
        })
        .catch((err) => {
          alert("might be server is off")
          console.log(err);
        });
    } else {
      let emailError = email == "" ? "Email is required" : "";
      let passwordError = password == "" ? "Password is required" : "";
      setError({ ...error, setErrorInHeader: "", emailError, passwordError });
    }
  };

  const setColorToRedAst = ()=>{
    return <sup style={{color:'red'}}>*</sup>
  }

  return (
    // <Wrapper>
      <Grid
        sx={{ flexGrow: 1 }}
        // style={{ caretColor: "transparent" }}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Box sx={{ boxShadow: 10, padding: 10, margin: 10 }}>
                <div>
                  <div>
                    <img height="200px" src={"/flipkart.jpg"}></img>
                  </div>
                  <form onSubmit={handleSubmit}>
                    {showErrorMessage(error.setErrorInHeader)}
                    <div className="form-outline mb-4">
                      <label className="form-label">Email address {setColorToRedAst()}</label>
                      <input
                        type="email"
                        id="form2Example1"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {error.emailError
                        ? showErrorMessage(error.emailError)
                        : ""}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Password {setColorToRedAst()}</label>
                      <input
                        type="password"
                        id="form2Example2"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {error.passwordError
                        ? showErrorMessage(error.passwordError)
                        : ""}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign in
                    </button>

                    <div className="text-center">
                      <p>
                        Not a member?{" "}
                        <a href="#!" onClick={() => router.push("/register")}>
                          Register
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    // </Wrapper>
  );
}

export default Login;


Login.getLayout = function PageLayout(page){
  return(
    <>{page}</>
  )
}