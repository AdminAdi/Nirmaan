import { Box, Container, Flex, Text, Link, SimpleGrid, Stack, Image, useColorModeValue, HStack } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box as="footer" bg={bg} borderTopWidth="1px" borderColor={borderColor} mt={16}>
      <Container maxW="7xl" py={12}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
          {/* Company Info */}
          <Box>
            <Flex align="center" mb={4}>
              <Image
                src="/logo.svg"
                alt="Nirmaan KYC"
                h="36px"
                mr={3}
              />
              <Text 
                fontSize="xl" 
                fontWeight="bold" 
                bgGradient="linear(to-r, green.600, saffron.500)"
                bgClip="text"
              >
                Nirmaan KYC
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.600" mb={4}>
              Empowering India's Digital Transformation with Secure Identity Solutions
            </Text>
            <HStack spacing={3} mt={4}>
              <Link href="#" aria-label="Twitter" color="gray.500" _hover={{ color: 'saffron.500' }}>
                <FaTwitter size="20px" />
              </Link>
              <Link href="#" aria-label="GitHub" color="gray.500" _hover={{ color: 'saffron.500' }}>
                <FaGithub size="20px" />
              </Link>
              <Link href="#" aria-label="LinkedIn" color="gray.500" _hover={{ color: 'saffron.500' }}>
                <FaLinkedin size="20px" />
              </Link>
              <Link href="#" aria-label="YouTube" color="gray.500" _hover={{ color: 'saffron.500' }}>
                <FaYoutube size="20px" />
              </Link>
            </HStack>
          </Box>

          {/* Quick Links */}
          <Stack spacing={3}>
            <Text fontSize="lg" fontWeight="bold" mb={3} color="green.700">Quick Links</Text>
            <Link href="#" fontSize="md" color="gray.600" _hover={{ color: 'green.600', textDecoration: 'none', transform: 'translateX(4px)' }} transition="all 0.2s">
              Home
            </Link>
            <Link href="#" fontSize="md" color="gray.600" _hover={{ color: 'green.600', textDecoration: 'none', transform: 'translateX(4px)' }} transition="all 0.2s">
              About Us
            </Link>
            <Link href="#" fontSize="md" color="gray.600" _hover={{ color: 'green.600', textDecoration: 'none', transform: 'translateX(4px)' }} transition="all 0.2s">
              How It Works
            </Link>
            <Link href="#" fontSize="md" color="gray.600" _hover={{ color: 'green.600', textDecoration: 'none', transform: 'translateX(4px)' }} transition="all 0.2s">
              Pricing
            </Link>
          </Stack>

          {/* Legal */}
          <Stack spacing={3}>
            <Text fontSize="lg" fontWeight="bold" mb={3} color="green.700">Legal</Text>
            <Link href="#" fontSize="md" color="gray.600" _hover={{ color: 'green.600', textDecoration: 'none', transform: 'translateX(4px)' }} transition="all 0.2s">
              Privacy Policy
            </Link>
            <Link href="#" fontSize="md" color="gray.600" _hover={{ color: 'green.600', textDecoration: 'none', transform: 'translateX(4px)' }} transition="all 0.2s">
              Terms of Service
            </Link>
            <Link href="#" fontSize="md" color="gray.600" _hover={{ color: 'green.600', textDecoration: 'none', transform: 'translateX(4px)' }} transition="all 0.2s">
              Security
            </Link>
            <Link href="#" fontSize="md" color="gray.600" _hover={{ color: 'green.600', textDecoration: 'none', transform: 'translateX(4px)' }} transition="all 0.2s">
              Compliance
            </Link>
          </Stack>

          {/* Contact Info */}
          <Stack spacing={3}>
            <Text fontSize="lg" fontWeight="bold" mb={3} color="green.700">Contact Us</Text>
            <Stack spacing={3}>
              <Box>
                <Text fontSize="md" color="gray.600" display="flex" alignItems="center">
                  <Box as="span" mr={2}>📧</Box>
                  <Link href="mailto:support@nirmaankyc.in" _hover={{ color: 'green.600', textDecoration: 'none' }}>
                    support@nirmaankyc.in
                  </Link>
                </Text>
              </Box>
              <Box>
                <Text fontSize="md" color="gray.600" display="flex" alignItems="center">
                  <Box as="span" mr={2}>📱</Box>
                  <Link href="tel:+919876543210" _hover={{ color: 'green.600', textDecoration: 'none' }}>
                    +91 98765 43210
                  </Link>
                </Text>
              </Box>
              <Box>
                <Text fontSize="md" color="gray.600" display="flex" alignItems="flex-start">
                  <Box as="span" mr={2} mt={1}>🏢</Box>
                  <Box>
                    Nirmaan KYC Solutions<br />
                    123 Tech Hub, Sector 62<br />
                    Noida, Uttar Pradesh 201301
                  </Box>
                </Text>
              </Box>
              <Box mt={2}>
                <Link 
                  href="#" 
                  fontSize="sm" 
                  fontWeight="medium"
                  color="green.600" 
                  display="inline-flex" 
                  alignItems="center"
                  _hover={{ textDecoration: 'none', color: 'green.700' }}
                >
                  Partner with us <ExternalLinkIcon ml={1} />
                </Link>
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>

        {/* Copyright Section */}
        <Box 
          borderTopWidth="1px" 
          borderColor={borderColor} 
          mt={12} 
          pt={8} 
          textAlign="center"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '4px',
            bgGradient: 'linear(to-r, saffron.500, white, green.500)',
            borderRadius: 'full',
          }}
        >
          <Text fontSize="sm" color="gray.500">
            &copy; {new Date().getFullYear()} Nirmaan KYC. All rights reserved.
          </Text>
          <Text fontSize="xs" color="gray.500" mt={2} display="flex" alignItems="center" justifyContent="center">
            <Box as="span" mr={1}>🇮🇳</Box> Made with Pride in India
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
