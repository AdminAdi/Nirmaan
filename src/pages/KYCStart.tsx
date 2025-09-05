import { Box, Button, Card, CardBody, Container, Flex, Heading, SimpleGrid, Stack, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { FaFingerprint, FaIdCard, FaMobileAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const KYCStart = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const kycMethods = [
    {
      id: 'digilocker',
      title: t('kyc.methods.digilocker.title'),
      description: t('kyc.methods.digilocker.description'),
      icon: FaFingerprint,
      color: 'green.500',
    },
    {
      id: 'document',
      title: t('kyc.methods.document.title'),
      description: t('kyc.methods.document.description'),
      icon: FaIdCard,
      color: 'blue.500',
    },
    {
      id: 'aadhaar',
      title: t('kyc.methods.aadhaar.title'),
      description: t('kyc.methods.aadhaar.description'),
      icon: FaMobileAlt,
      color: 'purple.500',
    },
  ];

  const handleKYCStart = (method: string) => {
    if (method === 'aadhaar') {
      navigate('/kyc/otp');
      return;
    }
    navigate('/kyc/document-upload');
  };

  return (
    <Container maxW="4xl" py={12}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Text color="brand.500" fontWeight="semibold" mb={2}>
            {t('kyc.step', { current: 1, total: 3 })}
          </Text>
          <Heading as="h1" size="xl" fontWeight="bold" mb={4}>
            {t('kyc.start.title')}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            {t('kyc.start.description')}
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={8}>
          {kycMethods.map((method) => (
            <Card
              key={method.id}
              variant="outline"
              cursor="pointer"
              _hover={{ borderColor: 'brand.500', transform: 'translateY(-4px)', shadow: 'md' }}
              transition="all 0.2s"
              onClick={() => handleKYCStart(method.id)}
            >
              <CardBody>
                <VStack spacing={4} textAlign="center">
                  <Box
                    p={3}
                    bg={`${method.color}0F`}
                    color={method.color}
                    borderRadius="full"
                  >
                    <method.icon size={24} />
                  </Box>
                  <Heading size="md">{method.title}</Heading>
                  <Text color="gray.600" fontSize="sm">
                    {method.description}
                  </Text>
                  <Button
                    rightIcon={<FaArrowRight />}
                    variant="ghost"
                    colorScheme="brand"
                    size="sm"
                    mt={2}
                  >
                    {t('common.select')}
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Box mt={8} bg="blue.50" p={6} borderRadius="lg">
          <Heading size="md" mb={4} color="blue.800">
            {t('kyc.security.title')}
          </Heading>
          <Text color="blue.700" mb={4}>
            {t('kyc.security.description')}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
            {[
              t('kyc.security.bullet1'),
              t('kyc.security.bullet2'),
              t('kyc.security.bullet3'),
            ].map((text, index) => (
              <Flex key={index} align="center">
                <Box
                  bg="blue.100"
                  color="blue.600"
                  p={1}
                  borderRadius="md"
                  mr={3}
                >
                  <FaCheckCircle />
                </Box>
                <Text fontSize="sm" color="blue.700">
                  {text}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>

        <Flex justify="space-between" mt={8}>
          <Button variant="outline" onClick={() => navigate('/')}>
            {t('common.back')}
          </Button>
          <Button
            colorScheme="brand"
            rightIcon={<FaArrowRight />}
            onClick={() => navigate('/kyc/document-upload')}
          >
            {t('common.continue')}
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default KYCStart;
