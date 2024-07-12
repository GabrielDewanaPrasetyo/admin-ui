import "./login.scss"; 
import { useContext,useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import LightModeOutlidnedIcon from "@mui/icons-material/LightModeOutlined";

const Login = () => { 
  const test = useContext(DarkModeContext);
  console.log(test)
  console.log(process.env.REACT_APP_FIREBASE_KEY);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user; 
        dispatch({type:"LOGIN", payload:user});
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div data-testid="form" className={darkMode ? "app dark" : "login"}>
      <form onSubmit={handleLogin}>
        <input
          id="email"
          type="email"
          placeholder="Enter your email" 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" data-testid="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon className="icon" 
            onClick={() => dispatch({ type: "TOGGLE"})}/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;