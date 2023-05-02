import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "src/authentication/authProvider";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { FaUserCircle, FaUserAlt, FaLock, FaTimes, FaBars } from "react-icons/fa";
import "../../../all-views-scss/_loginstyle.scss";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import axios from "src/api/axios";
import useAuth from "src/hooks/useAuth";

//import { axios } from "axios";
const LOGIN_URL = "/login/loginUser";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();
  const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const login = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(LOGIN_URL, JSON.stringify({email, password}),{
          headers: {'Content-Type': 'application/json'},
          withCredentials: false
        })
        .then((response) => {
          if (response.data.message === "Login Successfully!") {
            setErrMsg("Login Succesfully");
          } else if (
            response.data.message === "Email or Password does not match!"
          ) {
            setErrMsg("Email and Password Doesn't Match");
          } else if (response.data.message === "Wrong Password") {
            setErrMsg("Email and Password Doesn't Match");
          } else {
            setErrMsg("Login Failed");
          }

          const roles = response?.data?.role;
          if(roles === 'Super Admin'){
            const accessToken = response?.data?.accessToken;
            const roles1 = [1, 'Super Admin'] 
            const full_name = response?.data?.full_name 
            setAuth({ email, password, full_name, roles1, accessToken });
            navigate('/dashboard')
          }else if(roles === 'Admin'){
            const accessToken = response?.data?.accessToken;
            const roles1 = [2, 'Admin'] 
            const full_name = response?.data?.full_name 
            setAuth({ email, password, full_name, roles1, accessToken });
            
            navigate('/admin')
          }else if(roles === 'Unit Owner'){
            const accessToken = response?.data?.accessToken;
            const roles1 = [3, 'Unit Owner']
            const full_name = response?.data?.full_name
            const acc_balance = response?.data?.acc_balance  
            setAuth({ email, password, full_name, acc_balance, roles1, accessToken });
            
            navigate('/unitowner')
          }else if(roles === 'Tenant'){
            const accessToken = response?.data?.accessToken;
            const roles1 = [4, 'Tenant'] 
            const full_name = response?.data?.full_name
            const acc_balance = response?.data?.acc_balance 
            setAuth({ email, password, full_name, acc_balance, roles1, accessToken });
            
            navigate('/tenants')
          }
          
         
          errRef.current.focus();
        });
        
        navigate(from, {replace: true});
    } catch (error) {
      console.log(error);
      if (!error.response) {
        setErrMsg("No Server Response");
      }
    }
  };

  {
    /*const handleSubmit = async (e) => {
    //e.preventDefault();
    console.log("sad")
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({email, password}))
      setSuccess == true;
      console.log(JSON.stringify(response))
    } catch (err) {
      console.log(err)
    }
    
  }*/
  }

  return (
    <div>

      <header className="login-header-menu">
        <Link to="/homepage">
          <img src="./images/condo-connect.png" class="login-header-menu-logo" />
        </Link>
        <nav ref={navRef}>
          <Link to="/homepage">HOME</Link>
          <Link href="/#">ABOUT</Link>
          <Link href="/#">CONTACT</Link>
          <Link to="/login">SIGN IN</Link>
          <button
            className="login-nav-btn nav-close-btn"
            onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button
          className="login-nav-btn"
          onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

      <CContainer className="login-container">
        <CRow className="login-wrapper">
          <CCol className="col-md-6" id="welcome-col">
            <CCardGroup>
              <CCard className="login-form">
                <CCardBody>
                  <img src="./images/condo-connect.png"></img><br/>
                  <h1 className="welcome-back">WELCOME BACK!</h1><br/>
                  <p className="sign-access">Sign in to continue access</p>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
          <CCol className="col-md-6" id="login-col">
            <CCardGroup>
              <CCard className="login-form">
                <CCardBody className="login-form-body">
                  <CForm>
                    <p> LOGIN </p>

                    <p
                      ref={errRef}
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText className="input-icon">
                        <FaUserAlt />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText className="input-icon">
                        <FaLock />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </CInputGroup>
                    <Link>
                      <CRow>
                        <CCol className="button-row">
                          <CButton color="primary" onClick={login} className="login">
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </Link>
                    <br/>
                    <p className="register-label">Don't have an account yet? </p>
                    <Link to="/register" className="registernow">
                      <CCol className="reg-btn-col">
                        <CButton color="none">Signup here</CButton>
                      </CCol>
                    </Link>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>

      <footer className="footer">
        {/* <h4>Hello Word</h4> */}
      </footer>
    </div>
  );
};

export default Login;
