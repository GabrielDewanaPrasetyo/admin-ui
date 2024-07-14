import { Link, useNavigate } from "react-router-dom";
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext"
import { List } from "@mui/material";

const Sidebar = () => {
  const {dispatch} = useContext(DarkModeContext);

const {dispatch : autDispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const hadleLogout = () => {
    signOut(auth)
    .then(() => {
      autDispatch({type:"LOGOUT"})
      navigate("/login")
    })
    .catch((error) => {
      console.error("Logout error: ", error)
    })
  }

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
      <Link to="/home">
      <li>
      <DashboardIcon className="icon"></DashboardIcon>
        <span>Dashboard</span>
      </li>
      </Link>
      <p className="title">LIST</p>
      <Link to="/users">
        <li data-testid="user">
          <PersonIcon className="icon"></PersonIcon>
          <span>Users</span>
        </li>
      </Link>
      <Link to="/products">
        <li>
        <PaymentIcon className="icon"></PaymentIcon>
          <span>Products</span>
        </li>
      </Link>
      <li>
      <StoreIcon className="icon"></StoreIcon>
        <span>Orders</span>
      </li>
      <Link to="/categories">
      <li>
        <CategoryIcon className="icon"></CategoryIcon>
        <span data-testid="categories">Categories</span>
      </li>
      </Link>
      <p className="title">USER</p>
      <li>
      <AccountCircleIcon className="icon"></AccountCircleIcon>
        <span>Profile</span>
      </li>
      <li onClick={hadleLogout}>
        <LogoutIcon className="icon"></LogoutIcon>
        <span>Logout</span>
      </li>
    </ul>
  </div>
  <div className="bottom">
  <div className="colorOption" onClick={() => dispatch({type:"LIGHT"})}></div>
  <div className="colorOption" onClick={() => dispatch({type:"DARK"})}></div>
  </div>
</div>
  )
}

export default Sidebar