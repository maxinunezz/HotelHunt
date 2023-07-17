import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface GoogleSignInButtonProps {
  clientID: string;
  endpoint: string;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ clientID, endpoint }) => {

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      console.log(response);
    };

    const initializeGoogleSignIn = () => {
      google.accounts.id.initialize({
        client_id: clientID,
      });
    };

    const loadGoogleSignInScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        initializeGoogleSignIn();
      };
    };

    loadGoogleSignInScript();
  },);

  return (
    <div>
      <div id="g_id_onload"
        data-client_id={clientID}
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri={endpoint}
        data-auto_prompt="false">
      </div>

      <div className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="filled_blue"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="left">
      </div>
    </div>
  );
};

export default GoogleSignInButton;
