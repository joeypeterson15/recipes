import React, { useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  useEffect(() => {
    if (user?.username && user?.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const loginStyle = {
    border: '0.2px solid black', 
    width: '24rem',
    maxWidth: '90%',
    padding: '2rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "511466373592-oom82ta6ctiqlukuigj1ajjvlmndsqg0.apps.googleusercontent.com",
          callback: handleGoogleSignIn
        });
        
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          { theme: "outline", size: "large" }
        );
      }
    };

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGoogleSignIn = (response) => {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
    login({
      username: payload.name,
      email: payload.email,
      picture: payload.picture,
      token: response.credential
    });
  };

  return (
    <div 
      className="login-container"
      style={loginStyle}
    >
      <h2>Sign in with Google</h2>
      <div id="googleSignInButton" ref={googleButtonRef}></div>
    </div>
  );
};

export default Login;