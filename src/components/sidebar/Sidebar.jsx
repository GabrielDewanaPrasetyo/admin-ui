import "./sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import {useContext} from "react";
import {DarkModeContext} from "../../context/darkModeContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.jsx";

const Sidebar = () => {
  const {dispatch} = useContext(DarkModeContext);

  const { dispatch: AuthDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoout = () => {
    signOut(auth)
    .then(() => {
      AuthDispatch({ type: "LOGOUT" });
      navigate("/login");
    })
    .catch((error) => {
      console.error("Logout error: ");
    });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/">
          <span className="logo">Store</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LIST</p>
          <Link to="/users">
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products">
            <li>
              <CreditCardIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <StoreIcon className="icon" />
            <span>Orders</span>
          </li>
          <Link to="/categories">
            <li>
              <CategoryIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogoout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({type: "LIGHT"})}></div>
        <div className="colorOption" onClick={() => dispatch({type: "DARK"})}></div>
      </div>
    </div>
  );
};

export default Sidebar;
