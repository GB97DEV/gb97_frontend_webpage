import React, {useEffect} from 'react'

const LandBot = () => {
    useEffect(() => {
        const initLandbot = () => {
          if (!window.myLandbot) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.addEventListener('load', () => {
              window.myLandbot = new window.Landbot.Livechat({
                configUrl:
                  'https://storage.googleapis.com/landbot.pro/v3/H-1617100-ZUKSJ5MJ9MX7GJWV/index.json',
              });
            });
            script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
            const firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(script, firstScript);
          }
        };
    
        window.addEventListener('mouseover', initLandbot, { once: true });
        window.addEventListener('touchstart', initLandbot, { once: true });
    
        return () => {
          window.removeEventListener('mouseover', initLandbot);
          window.removeEventListener('touchstart', initLandbot);
        };
      }, []);
    
      return <></>; // Render an empty fragment or your component JSX here
    };

export default LandBot