import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import { theme } from './styles/theme';
import i18n from './i18n';
import './styles/global.css';

// Add global styles for better accessibility
const GlobalStyle = () => (
  <style>
    {`
      /* Ensure proper document flow and scroll behavior */
      html, body, #root {
        min-height: 100vh;
        width: 100%;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Improve text rendering */
      body {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Better focus styles for keyboard navigation */
      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {
        outline: none;
        box-shadow: none;
      }
      
      /* High contrast mode */
      .high-contrast img {
        filter: grayscale(100%) contrast(120%);
      }
      
      /* Ensure buttons and interactive elements have proper cursor */
      button, [role="button"], [type="button"], [type="submit"], [type="reset"], a[href] {
        cursor: pointer;
      }
    `}
  </style>
);

// Initialize Speech Recognition and Synthesis APIs if available
const initSpeechRecognition = () => {
  if (typeof window === 'undefined') return;
  
  // Initialize SpeechRecognition
  if (!('SpeechRecognition' in window) && 'webkitSpeechRecognition' in window) {
    // @ts-ignore
    window.SpeechRecognition = window.webkitSpeechRecognition;
  }
  
  // speechSynthesis is read-only, so we don't try to set it
  // It's already available as a global in modern browsers
};

// Initialize the application
const initApp = () => {
  initSpeechRecognition();
  
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <CSSReset />
            <GlobalStyle />
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </I18nextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Start the application
initApp();

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
