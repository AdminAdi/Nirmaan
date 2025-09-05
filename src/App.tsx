import { Box, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { ChakraProvider, CSSReset, ColorModeScript } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { theme } from './styles/theme';
import HomePage from './pages/Home';
import KYCStartPage from './pages/KYCStart';
import KYCDocumentUpload from './pages/KYCDocumentUpload';
import KYCFaceVerification from './pages/KYCFaceVerification';
import KYCSuccess from './pages/KYCSuccess';
import KYCOTP from './pages/KYCOTP';
import Header from './components/Header';
import Footer from './components/Footer';
import SahayakChatbot from './components/SahayakChatbot';

function App() {
  const bgColor = useColorModeValue('white', 'gray.900');
  const isMobile = useBreakpointValue({ base: true, md: false });
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

  // Set the base font size based on screen size
  useEffect(() => {
    const html = document.documentElement;
    const updateFontSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        html.style.fontSize = '14px';
      } else if (width < 768) {
        html.style.fontSize = '15px';
      } else {
        html.style.fontSize = '16px';
      }
    };

    // Initial call
    updateFontSize();

    // Add event listener for window resize
    window.addEventListener('resize', updateFontSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box
        minH="100vh"
        display="flex"
        flexDirection="column"
        bg={bgColor}
        color={textColor}
        fontSize={isMobile ? 'md' : 'lg'}
        lineHeight="tall"
      >
        <Header />
        <Box
          as="main"
          flex="1"
          py={[4, 6, 8]}
          px={[2, 4, 6]}
          maxW="100%"
          mx="auto"
          w="100%"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kyc/start" element={<KYCStartPage />} />
            <Route path="/kyc/document-upload" element={<KYCDocumentUpload />} />
            <Route path="/kyc/face-verification" element={<KYCFaceVerification />} />
            <Route path="/kyc/otp" element={<KYCOTP />} />
            <Route path="/kyc/success" element={<KYCSuccess />} />
          </Routes>
        </Box>
        <Footer />

        {/* Sahayak Chatbot */}
        <SahayakChatbot />

        {/* Accessibility Features */}
        <Box
          position="fixed"
          bottom={4}
          left={4}
          zIndex={1000}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Box>
            <Box
              as="button"
              bgGradient="linear(to-r, saffron.500, saffron.600)"
              color="white"
              p={3}
              borderRadius="full"
              boxShadow="lg"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: 'xl',
              }}
              transition="all 0.2s"
              fontSize={isMobile ? 'md' : 'lg'}
              onClick={() => {
                // Toggle high contrast mode
                const html = document.documentElement;
                html.classList.toggle('high-contrast');
              }}
              title="Toggle High Contrast Mode"
              aria-label="Toggle High Contrast Mode"
            >
              👁️
            </Box>
            <Box display="flex" gap={2} mt={2}>
              <Box
                as="button"
                aria-label="Increase text size"
                p={2}
                bg="saffron.500"
                color="white"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: 'saffron.600' }}
                _active={{ transform: 'scale(0.95)' }}
                onClick={() => {
                  const html = document.documentElement;
                  const currentSize = parseFloat(window.getComputedStyle(html).fontSize);
                  html.style.fontSize = `${Math.min(currentSize + 1, 20)}px`;
                }}
              >
                A+
              </Box>
              <Box
                as="button"
                aria-label="Decrease text size"
                p={2}
                bg="saffron.500"
                color="white"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: 'saffron.600' }}
                _active={{ transform: 'scale(0.95)' }}
                onClick={() => {
                  const html = document.documentElement;
                  const currentSize = parseFloat(window.getComputedStyle(html).fontSize);
                  html.style.fontSize = `${Math.max(currentSize - 1, 12)}px`;
                }}
              >
                A-
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
