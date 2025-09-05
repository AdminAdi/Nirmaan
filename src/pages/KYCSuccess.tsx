import { Box, Button, Container, Flex, Heading, Stack, Text, VStack, useColorModeValue, Icon, HStack, Card } from '@chakra-ui/react';
import { FaCheckCircle, FaDownload, FaHome, FaRegClock, FaRegEnvelope, FaRegSmile } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const KYCSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleDownload = () => {
    // In a real app, this would trigger a download of the KYC document
    console.log('Download KYC document');
  };

  const statusUpdates = [
    {
      id: 1,
      title: t('kyc.success.steps.verification'),
      status: 'completed',
      description: t('kyc.success.steps.verificationDesc'),
    },
    {
      id: 2,
      title: t('kyc.success.steps.approval'),
      status: 'in-progress',
      description: t('kyc.success.steps.approvalDesc'),
    },
    {
      id: 3,
      title: t('kyc.success.steps.complete'),
      status: 'pending',
      description: t('kyc.success.steps.completeDesc'),
    },
  ];

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <VStack textAlign="center" spacing={4}>
          <Box
            bg="green.50"
            p={5}
            borderRadius="full"
            display="inline-flex"
            mb={4}
          >
            <Icon as={FaCheckCircle} w={12} h={12} color="green.500" />
          </Box>
          <Heading as="h1" size="2xl" fontWeight="bold">
            {t('kyc.success.title')}
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl">
            {t('kyc.success.subtitle')}
          </Text>
        </VStack>

        <Card variant="outline" bg={cardBg} borderRadius="xl" overflow="hidden">
          <Box p={8}>
            <VStack spacing={6}>
              <Box textAlign="center">
                <Icon as={FaRegSmile} w={12} h={12} color="green.500" mb={4} />
                <Heading size="lg" mb={2}>
                  {t('kyc.success.thankYou')}
                </Heading>
                <Text color="gray.600" mb={6}>
                  {t('kyc.success.referenceNumber', { number: 'KYC' + Math.floor(100000 + Math.random() * 900000) })}
                </Text>
                <Button
                  colorScheme="brand"
                  variant="outline"
                  leftIcon={<FaDownload />}
                  onClick={handleDownload}
                  mb={8}
                >
                  {t('kyc.success.downloadReceipt')}
                </Button>
              </Box>

              <Box w="full" maxW="md" mx="auto">
                <Text fontWeight="bold" mb={4}>
                  {t('kyc.success.whatsNext')}
                </Text>
                <Stack spacing={4}>
                  {statusUpdates.map((update) => (
                    <Flex key={update.id} align="flex-start">
                      <Box
                        w={8}
                        h={8}
                        borderRadius="full"
                        bg={update.status === 'completed' ? 'green.500' : 'gray.200'}
                        color={update.status === 'completed' ? 'white' : 'gray.600'}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        mr={4}
                        mt={1}
                      >
                        {update.status === 'completed' ? (
                          <FaCheckCircle />
                        ) : update.status === 'in-progress' ? (
                          <Box as="span" className="animate-pulse">
                            <FaRegClock />
                          </Box>
                        ) : (
                          <Box as="span" opacity={0.5}>
                            {update.id}
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Text fontWeight="medium">{update.title}</Text>
                        <Text color="gray.500" fontSize="sm">
                          {update.description}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </Stack>
              </Box>

              <Box
                bg="blue.50"
                p={4}
                borderRadius="lg"
                borderLeftWidth="4px"
                borderLeftColor="blue.500"
                w="full"
                maxW="2xl"
              >
                <HStack spacing={3}>
                  <Icon as={FaRegEnvelope} color="blue.500" />
                  <Box>
                    <Text fontWeight="medium" color="blue.800">
                      {t('kyc.success.emailNotification')}
                    </Text>
                    <Text fontSize="sm" color="blue.700">
                      {t('kyc.success.emailSentTo', { email: 'user@example.com' })}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </Card>

        <VStack spacing={4} mt={8}>
          <Text color="gray.600" textAlign="center">
            {t('kyc.success.needHelp')}{' '}
            <Button variant="link" colorScheme="brand">
              {t('common.contactSupport')}
            </Button>
          </Text>
          <Button
            colorScheme="brand"
            leftIcon={<FaHome />}
            onClick={() => navigate('/')}
            size="lg"
          >
            {t('common.backToHome')}
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default KYCSuccess;
