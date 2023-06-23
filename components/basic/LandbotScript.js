import { useEffect } from 'react';

const LandbotScript = () => {
  useEffect(() => {
    const initLandbot = () => {
      if (!window.myLandbot) {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.addEventListener('load', () => {
          window.myLandbot = new Landbot.default({
            configUrl: 'https://storage.googleapis.com/landbot.pro/v3/H-1617100-ZUKSJ5MJ9MX7GJWV/index.json',
          });
        });

        s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
        const x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      }
    };

    window.addEventListener('mouseover', initLandbot, { once: true });
    window.addEventListener('touchstart', initLandbot, { once: true });

    return () => {
      window.removeEventListener('mouseover', initLandbot);
      window.removeEventListener('touchstart', initLandbot);
    };
  }, []);

  return null;
};

export default LandbotScript;