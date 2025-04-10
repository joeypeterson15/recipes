
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext'; // Assuming your AuthContext is in a separate file

const Login = () => {
  const { login } = useAuth();

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
    meta.content = process.env.GOOGLE_CLIENT_ID;
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
  }, [login]);

  return (
    <div className="login-container">
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  );
};

export default Login;