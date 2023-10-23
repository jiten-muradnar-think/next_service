import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Wrapper } from "../components/wrapper";

function Register() {
  const [registration, setregistration] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    additionalInformation: "",
  });

  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    addressError: "",
    emailError: "",
    passwordError: "",
    phoneError: "",
    setErrorInHeader: "",
  });
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    let checkUserExist;
    setError({ ...error, setErrorInHeader: "" });
    if (
      registration.firstName &&
      registration.lastName &&
      registration.address &&
      registration.password &&
      registration.email &&
      registration.phone
    ) {
      axios
        .get("http://localhost:4000/userList")
        .then((resp) => {
          let apiData = resp.data;
          checkUserExist = apiData.filter(
            (value, i) => value.email == registration.email
          );
          if (checkUserExist.length) {
            setError({
              ...error,
              setErrorInHeader:
                "Registration unsuccesful Email id already exist",
              firstNameError: "",
              lastNameError: "",
              addressError: "",
              emailError: "",
              passwordError: "",
              phoneError: "",
            });
          } else {
            axios
              .post("http://localhost:4000/userList", registration)
              .then((data) => {
                if (data) {
                  router.push("/");
                } else {
                  setError({
                    ...error,
                    setErrorInHeader: "Registration unsuccessful",
                    firstNameError: "",
                    lastNameError: "",
                    addressError: "",
                    emailError: "",
                    passwordError: "",
                    phoneError: "",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let firstNameError =
        registration.firstName == "" ? "First Name is required" : "";
      let lastNameError =
        registration.lastName == "" ? "Last Name is required" : "";
      let emailError = registration.email == "" ? "Email is required" : "";
      let addressError =
        registration.address == "" ? "Address is required" : "";
      let passwordError =
        registration.password == "" ? "Password is required" : "";
      let phoneError = registration.phone == "" ? "Phone Number is required" : "";
      let setErrorInHeader =
        registration.setErrorInHeader == "" ? "Email already Exist" : "";

      setError({
        ...error,
        setErrorInHeader,
        firstNameError,
        lastNameError,
        emailError,
        addressError,
        passwordError,
        phoneError,
      });
    }
  };

  const showErrorMessage = (error) => {
    return <p style={{ color: "red" }}>{error}</p>;
  };

  const setColorToRedAst = ()=>{
    return <sup style={{color:'red'}}>*</sup>
  }
  return (
      <Grid
        sx={{ flexGrow: 1 }}
        // style={{ caretColor: "transparent" }}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Box sx={{ boxShadow: 10, padding: "0px 30px", margin: 10 }}>
                <div style={{ textAlign: "center" }}>
                  <img height="80px" src={"/register.jpg"} />
                </div>
                <div>
                  <form onSubmit={handleSubmit}>
                    {showErrorMessage(error.setErrorInHeader)}
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label">First Name {setColorToRedAst()}</label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            value={registration.firstName}
                            onChange={(e) =>
                              setregistration({
                                ...registration,
                                firstName: e.target.value,
                              })
                            }
                          />
                          {error.firstNameError
                            ? showErrorMessage(error.firstNameError)
                            : ""}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label">Last Name {setColorToRedAst()}</label>
                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                            onChange={(e) =>
                              setregistration({
                                ...registration,
                                lastName: e.target.value,
                              })
                            }
                            value={registration.lastName}
                          />
                          {error.lastNameError
                            ? showErrorMessage(error.lastNameError)
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Address {setColorToRedAst()}</label>
                      <input
                        type="text"
                        id="form6Example4"
                        className="form-control"
                        onChange={(e) =>
                          setregistration({
                            ...registration,
                            address: e.target.value,
                          })
                        }
                        value={registration.address}
                      />
                      {error.addressError
                        ? showErrorMessage(error.addressError)
                        : ""}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Email {setColorToRedAst()}</label>
                      <input
                        type="email"
                        id="form6Example5"
                        className="form-control"
                        onChange={(e) =>
                          setregistration({
                            ...registration,
                            email: e.target.value,
                          })
                        }
                        value={registration.email}
                      />
                      {error.emailError
                        ? showErrorMessage(error.emailError)
                        : ""}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Password {setColorToRedAst()}</label>
                      <input
                        type="password"
                        id="form6Example5"
                        className="form-control"
                        onChange={(e) =>
                          setregistration({
                            ...registration,
                            password: e.target.value,
                          })
                        }
                        value={registration.password}
                      />
                      {error.passwordError
                        ? showErrorMessage(error.passwordError)
                        : ""}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Phone {setColorToRedAst()}</label>
                      <input
                        type="number"
                        id="form6Example6"
                        className="form-control"
                        onChange={(e) => {
                          if (e.target.value.length <= 10) {
                            setregistration({
                              ...registration,
                              phone: e.target.value,
                            });
                          }
                        }}
                        value={registration.phone}
                      />
                      {error.phoneError
                        ? showErrorMessage(error.phoneError)
                        : ""}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">
                        Additional Information
                      </label>
                      <textarea
                        className="form-control"
                        id="form6Example7"
                        rows="4"
                        onChange={(e) =>
                          setregistration({
                            ...registration,
                            additionalInformation: e.target.value,
                          })
                        }
                        value={registration.additionalInformation}
                      ></textarea>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        submit
                      </button>
                      <div>
                        <a href="" onClick={() => router.push("/")}>
                          Sign in
                        </a>
                      </div>
                    </div>
                  </form>{" "}
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

  );
}

export default Register;

Register.getLayout = function PageLayout(page){
  return(
    <>{page}</>
  )
}
