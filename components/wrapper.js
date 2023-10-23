import React, { useEffect,useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MailIcon from "@mui/icons-material/Mail";
import { AuthProvider } from "./auth";
import { useAuth, AuthContext } from "./auth";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import BusinessIcon from "@mui/icons-material/Business";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import axios from "axios";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export  function Wrapper({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [tokenData, setTokenData] = React.useState({});
  const router = useRouter();

  let authcontext= useContext(AuthContext)
  let auth = useAuth();
  console.log("wrapper",auth,authcontext)

  useEffect(() => {
    getProductFromCartCount()
    return () => {
    }
  })
  
  const getProductFromCartCount = async () => {
    let data = await axios.get("http://localhost:4000/cartProducts");
    auth.setCartItemCount(data.data.length);
  };

  useEffect(() => {
    let token;
    token = localStorage.getItem("token");
    token = JSON.parse(token);
    setTokenData(token);

    // if (!token?.email) {
    //   router.push("/");
    // }

    if (!token?.email && router.pathname == "/register") {
      router.push("/register");
    }

    if (token?.email && router.pathname == "/") {
      router.push("/products");
    }
  },[]);

  const handleDrawerOpen = () => {
    if (tokenData?.email) setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    auth.logout();
    router.push("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
    {tokenData?.email ?  <AppBar position="fixed" open={open}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

         FlipCart

            <span
              style={{ marginLeft: "90%", paddingBottom: "20px" }}
              onClick={() => {
                router.push("/productsFromCart");
              }}
            >
              <ShoppingCartIcon
                style={{
                  width: "58px",
                  height: "50px",
                  paddingTop: "20px",
                  marginBottom: "-20px",
                }}
              />
              <span
                style={{
                  position: "relative",
                  // top: "-30px",
                  left: "-32px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  padding: "2px 7px",
                  width: "50px",
                }}
              >
                {auth.cartItemCount}
              </span>
            </span>
      
        </Toolbar>
      </AppBar>:''}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <AccountCircleIcon
            style={{ marginRight: "40px", width: "60px", height: "100px" }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {tokenData ? (
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                Hello
                <b style={{ marginLeft: "10px" }}>
                  {/* {auth.user && auth.user[0] && auth?.user[0].firstName}{" "} */}
                  {tokenData.firstName} {tokenData.lastName}
                </b>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <MailIcon style={{ marginRight: "20px" }} /> {tokenData.email}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <MobileFriendlyIcon style={{ marginRight: "20px" }} />{" "}
                {tokenData.phone}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <BusinessIcon style={{ marginRight: "20px" }} />{" "}
                {tokenData.address}
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => {
                router.push("/productsFromCart");
              }}
            >
              <ListItemButton>
                <ShoppingCartCheckoutIcon style={{ marginRight: "20px" }} />{" "}
                Item in cart
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => {
                router.push("/myOrder");
              }}
            >
              <ListItemButton>
                <LocalMallIcon style={{ marginRight: "20px" }} /> My Order
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => {
                router.push("/products");
              }}
            >
              <ListItemButton>
                <Inventory2OutlinedIcon style={{ marginRight: "20px" }} /> Products
              </ListItemButton>
            </ListItem>

            

            <ListItem disablePadding>
              <ListItemButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleLogout()}
                >
                  {" "}
                  Logout
                </Button>
              </ListItemButton>
            </ListItem>
          </List>
        ) : (
          ""
        )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <AuthProvider> */}
          {children}
          {/* </AuthProvider> */}
      </Main>
    </Box>
  );
}
