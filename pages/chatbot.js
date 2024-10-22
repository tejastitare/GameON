import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Inject Botpress Webchat script
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    // Inject the custom Botpress configuration script
    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2024/10/22/18/20241022182400-ZY3RY7GT.js';
    script2.async = true;
    document.body.appendChild(script2);

    // Clean up scripts on unmount
    return () => {
      <h1 className='text-3xl text-black bg-pink-300'>This is Chatbot</h1>
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return <div id="bp-web-widget-container"></div>;
};

export default Chatbot;
