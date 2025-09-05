import { Box, Button, Container, Flex, Heading, Text, VStack, SimpleGrid, Image, useBreakpointValue, Icon, Stack, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { FaShieldAlt, FaMobileAlt, FaGlobeAsia, FaCheckCircle, FaArrowRight, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { GiSmartphone } from 'react-icons/gi';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Accessibility: Skip to main content
  const handleSkipToContent = (e: React.MouseEvent) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.tabIndex = -1;
      mainContent.focus();
    }
  };

  const features = [
    {
      icon: FaShieldAlt,
      title: t('features.secure.title'),
      description: t('features.secure.description'),
    },
    {
      icon: FaMobileAlt,
      title: t('features.offline.title'),
      description: t('features.offline.description'),
    },
    {
      icon: FaGlobeAsia,
      title: t('features.vernacular.title'),
      description: t('features.vernacular.description'),
    },
  ];

  return (
    <Box>
      {/* Skip to main content link for screen readers */}
      <Box 
        as="a" 
        href="#main-content" 
        position="absolute" 
        left="-9999px" 
        zIndex="9999" 
        p="3"
        bg="white"
        color="green.600"
        _focus={{ left: '10px', top: '10px' }}
        onClick={handleSkipToContent}
      >
        {t('common.skipToContent')}
      </Box>
      
      {/* Voice Assistant Button - Mobile Only */}
      <Box 
        display={{ base: 'block', md: 'none' }}
        position="fixed"
        bottom="6"
        right="6"
        zIndex="1000"
      >
        <Button
          onClick={onOpen}
          colorScheme="green"
          size="lg"
          borderRadius="full"
          boxShadow="lg"
          p={4}
          aria-label={t('sahayak.openAssistant')}
        >
          <FaHeadset size={24} />
        </Button>
      </Box>
      {/* Hero Section */}
      <Box 
        id="main-content"
        bg={useColorModeValue('gray.50', 'gray.900')} 
        py={[12, 16, 20]}
        position="relative"
        overflow="hidden"
      >
        {/* Decorative elements */}
        <Box
          position="absolute"
          top="-10%"
          right="-10%"
          w="600px"
          h="600px"
          borderRadius="full"
          bgGradient="radial(green.100, transparent 70%)"
          opacity={0.6}
          zIndex="0"
        />
        
        <Container maxW="container.xl" position="relative" zIndex="1">
          <Flex 
            direction={{ base: 'column', lg: 'row' }} 
            align="center"
            justify="space-between"
          >
            <Box 
              flex={1} 
              pr={{ base: 0, lg: 12 }} 
              mb={{ base: 10, lg: 0 }}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              <Text 
                color="green.500" 
                fontWeight="bold" 
                mb={4}
                fontSize={['md', 'lg']}
                display="inline-flex"
                alignItems="center"
                mx={{ base: 'auto', lg: 0 }}
              >
                <Icon as={MdOutlineVerifiedUser} mr={2} />
                {t('home.welcome')}
              </Text>
              
              <Heading 
                as="h1" 
                size={['2xl', '3xl', '4xl']} 
                mb={6} 
                lineHeight="1.2"
                fontWeight="extrabold"
                color={useColorModeValue('gray.800', 'white')}
              >
                {t('home.title')}
              </Heading>
              
              <Text 
                fontSize={['lg', 'xl']} 
                mb={8} 
                color={useColorModeValue('gray.600', 'gray.300')}
                maxW={{ base: '100%', lg: '90%' }}
                mx={{ base: 'auto', lg: 0 }}
              >
                {t('home.subtitle')}
              </Text>
              
              <Stack 
                direction={{ base: 'column', sm: 'row' }}
                spacing={4} 
                justify={{ base: 'center', lg: 'flex-start' }}
                flexWrap="wrap"
                rowGap={4}
                width="100%"
                align="center"
              >
                <Button
                  as="a"
                  href="/kyc/start"
                  size="lg"
                  colorScheme="green"
                  rightIcon={<FaArrowRight />}
                  px={8}
                  py={6}
                  fontSize={['md', 'lg']}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  style={{ transform: 'translateY(0)' }}
                  transition="all 0.2s"
                >
                  {t('home.getStarted')}
                </Button>
                <Button
                  as="a"
                  href="#how-it-works"
                  size="lg"
                  variant="outline"
                  colorScheme="green"
                  px={8}
                  py={6}
                  fontSize={['md', 'lg']}
                  _hover={{
                    bg: useColorModeValue('green.50', 'whiteAlpha.100'),
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                >
                  {t('home.learnMore')}
                </Button>
                
                {/* Voice Assistant Button - Desktop */}
                <Button
                  onClick={onOpen}
                  leftIcon={<FaHeadset />}
                  size="lg"
                  variant="ghost"
                  colorScheme="green"
                  display={{ base: 'none', md: 'inline-flex' }}
                  _hover={{
                    bg: useColorModeValue('green.50', 'whiteAlpha.100'),
                  }}
                >
                  {t('sahayak.needHelp')}
                </Button>
              </Stack>
            </Box>
            <Box 
              flex={1} 
              display="flex" 
              justifyContent="center"
              position="relative"
            >
              <Box
                position="absolute"
                w="400px"
                h="400px"
                borderRadius="full"
                bgGradient="radial(circle, saffron.100 0%, transparent 70%)"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={-1}
              />
              <Box
                position="relative"
                maxW="600px"
                mx="auto"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  right: '20px',
                  bottom: '20px',
                  border: '2px solid',
                  borderColor: 'green.300',
                  borderRadius: 'xl',
                  zIndex: '-1',
                  transition: 'all 0.3s ease',
                  _hover: {
                    top: '-15px',
                    left: '-15px',
                  },
                }}
              >
                <Image
                  src="/hero-illustration.svg"
                  alt={t('home.heroAlt')}
                  width="100%"
                  height="auto"
                  borderRadius="xl"
                  boxShadow="lg"
                  loading="eager"
                  decoding="async"
                />
                
                {/* Floating elements */}
                <Box
                  position="absolute"
                  top="-20px"
                  right="-20px"
                  bg="white"
                  p={3}
                  borderRadius="lg"
                  boxShadow="lg"
                  display="flex"
                  alignItems="center"
                  zIndex="1"
                  _dark={{
                    bg: 'gray.800',
                  }}
                >
                  <Icon as={GiSmartphone} color="green.500" boxSize={8} mr={2} />
                  <Box>
                    <Text fontSize="sm" fontWeight="bold">{t('home.mobileFriendly')}</Text>
                    <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                      {t('home.worksOnAllDevices')}
                    </Text>
                  </Box>
                </Box>
                
                <Box
                  position="absolute"
                  bottom="-20px"
                  left="-20px"
                  bg="white"
                  p={3}
                  borderRadius="lg"
                  boxShadow="lg"
                  display="flex"
                  alignItems="center"
                  zIndex="1"
                  _dark={{
                    bg: 'gray.800',
                  }}
                >
                  <Icon as={RiSecurePaymentLine} color="green.500" boxSize={8} mr={2} />
                  <Box>
                    <Text fontSize="sm" fontWeight="bold">{t('home.secureData')}</Text>
                    <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                      {t('home.encrypted')}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={16} bg="white">
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} textAlign="center">
            <Box>
              <Text fontSize="4xl" fontWeight="bold" color="brand.500">
                500M+
              </Text>
              <Text color="gray.600">Underserved Users</Text>
            </Box>
            <Box>
              <Text fontSize="4xl" fontWeight="bold" color="brand.500">
                68%
              </Text>
              <Text color="gray.600">Low Digital Literacy</Text>
            </Box>
            <Box>
              <Text fontSize="4xl" fontWeight="bold" color="brand.500">
                2-3G
              </Text>
              <Text color="gray.600">Dominant Networks</Text>
            </Box>
            <Box>
              <Text fontSize="4xl" fontWeight="bold" color="brand.500">
                12+
              </Text>
              <Text color="gray.600">Indian Languages</Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="how-it-works" py={20} bg="gray.50">
        <Container maxW="7xl">
          <VStack spacing={2} textAlign="center" mb={16}>
            <Text color="brand.500" fontWeight="semibold">
              {t('features.tagline')}
            </Text>
            <Heading as="h2" size="xl" fontWeight="bold">
              {t('features.title')}
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              {t('features.description')}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {features.map((feature, index) => (
              <Box
                key={index}
                bg="white"
                p={8}
                borderRadius="xl"
                boxShadow="md"
                _hover={{ transform: 'translateY(-5px)', transition: 'all 0.3s' }}
              >
                <Icon as={feature.icon} w={10} h={10} color="brand.500" mb={4} />
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  {feature.title}
                </Text>
                <Text color="gray.600">{feature.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="brand.50" py={20}>
        <Container maxW="4xl" textAlign="center">
          <Heading as="h2" size="xl" fontWeight="bold" mb={6}>
            {t('cta.readyToStart')}
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={8}>
            {t('cta.getStartedDescription')}
          </Text>
          <Button
            size="lg"
            colorScheme="brand"
            onClick={() => navigate('/kyc/start')}
            rightIcon={<FaCheckCircle />}
          >
            {t('cta.startKYC')}
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
