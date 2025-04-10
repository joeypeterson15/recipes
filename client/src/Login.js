
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext'; // Assuming your AuthContext is in a separate file
import { Navigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();

  useEffect(() => {
    console.log('user: ', user)
    if (user?.username && user?.token) {
      return <Navigate to="/" />
    }
  }, [user, login])

  useEffect(() => {
    // Load the Google API script
    const script = document.createElement('script');
    script.src = "https://apis.google.com/js/platform.js"; 
    script.async = true;
    script.defer = true;
    window.document.body.appendChild(script);

    // Add meta tag for client ID
    const meta = document.createElement('meta');
    meta.name = 'google-signin-client_id';
    meta.content = '511466373592-oom82ta6ctiqlukuigj1ajjvlmndsqg0.apps.googleusercontent.com';
    window.document.head.appendChild(meta);

    // Initialize Google Sign-In when script is loaded
    // script.onload = () => {
    //   if (window.gapi) {
    //     window.gapi.load('auth2', () => {
    //       const auth2 = window.gapi.auth2.init({
    //         client_id: process.env.GOOGLE_CLIENT_ID,
    //       });

    //     //   Render Google Sign-In button
    //       if (googleButtonRef.current) {
    //         auth2.attachClickHandler(
    //           googleButtonRef.current,
    //           {},
    //           (googleUser) => {
    //             // Google Sign-In success handler
    //             const profile = googleUser.getBasicProfile();
    //             const token = googleUser.getAuthResponse().id_token;
                
    //             // Call your authentication context's login method
    //             login({
    //               username: profile.getName(),
    //               email: profile.getEmail(),
    //               googleId: profile.getId(),
    //               token: token
    //             });
                
    //             console.log('Google Sign-In successful');
    //           },
    //           (error) => {
    //             console.error('Google Sign-In error', error);
    //           }
    //         );
    //       }
    //     });
    //   }
    // };

    // Cleanup
    // return () => {
    //   document.body.removeChild(script);
    //   const metaTag = document.querySelector('meta[name="google-signin-client_id"]');
    //   if (metaTag) {
    //     document.head.removeChild(metaTag);
    //   }
    // };
  }, []);

  const onSignIn = (googleUser) => {
    login({
      username: 'asdfasdf',
      email: 'asdfasdf',
      googleId: 'asdfasdf',
      token: 'asdfasdf'
    });
  }

  return (
      <div className="login-container">
          <div className="g-signin2" data-onsuccess={(googleUser) => onSignIn(googleUser)}></div>
      </div>
    
  );
};

export default Login;