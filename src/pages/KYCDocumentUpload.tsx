import { useState } from 'react';
import { Box, Button, Card, CardBody, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, VStack, useToast, Icon, HStack, Image } from '@chakra-ui/react';
import { FaArrowLeft, FaCamera, FaCheckCircle, FaCloudUploadAlt, FaFilePdf, FaIdCard, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type DocumentType = 'aadhaarFront' | 'aadhaarBack' | 'pan' | 'passport' | 'voterId' | 'drivingLicense';

interface DocumentState {
  file: File | null;
  preview: string | null;
  uploaded: boolean;
  type: DocumentType;
  name: string;
}

const KYCDocumentUpload = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [activeDoc, setActiveDoc] = useState<DocumentType>('aadhaarFront');
  const [documents, setDocuments] = useState<Record<DocumentType, DocumentState>>({
    aadhaarFront: { file: null, preview: null, uploaded: false, type: 'aadhaarFront', name: t('documents.aadhaarFront') },
    aadhaarBack: { file: null, preview: null, uploaded: false, type: 'aadhaarBack', name: t('documents.aadhaarBack') },
    pan: { file: null, preview: null, uploaded: false, type: 'pan', name: t('documents.pan') },
    passport: { file: null, preview: null, uploaded: false, type: 'passport', name: t('documents.passport') },
    voterId: { file: null, preview: null, uploaded: false, type: 'voterId', name: t('documents.voterId') },
    drivingLicense: { file: null, preview: null, uploaded: false, type: 'drivingLicense', name: t('documents.drivingLicense') },
  });

  const documentTypes: { id: DocumentType; icon: any; label: string }[] = [
    { id: 'aadhaarFront', icon: FaIdCard, label: t('documents.aadhaarFront') },
    { id: 'pan', icon: FaIdCard, label: t('documents.pan') },
    { id: 'passport', icon: FaIdCard, label: t('documents.passport') },
    { id: 'voterId', icon: FaIdCard, label: t('documents.voterId') },
    { id: 'drivingLicense', icon: FaIdCard, label: t('documents.drivingLicense') },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: DocumentType) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: t('errors.invalidFileType'),
        description: t('errors.onlyJpgPngPdf'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t('errors.fileTooLarge'),
        description: t('errors.maxFileSize', { size: '5MB' }),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setDocuments(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          file,
          preview: file.type.startsWith('image/') ? reader.result as string : null,
          uploaded: true,
        },
      }));

      // Auto-advance to next document if available
      const currentIndex = documentTypes.findIndex(doc => doc.id === type);
      if (currentIndex < documentTypes.length - 1) {
        setActiveDoc(documentTypes[currentIndex + 1].id);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeDocument = (type: DocumentType) => {
    setDocuments(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        file: null,
        preview: null,
        uploaded: false,
      },
    }));
  };

  const handleSubmit = () => {
    // Check if at least one document is uploaded
    const hasUploadedDoc = Object.values(documents).some(doc => doc.uploaded);
    
    if (!hasUploadedDoc) {
      toast({
        title: t('errors.noDocuments'),
        description: t('errors.uploadAtLeastOne'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    navigate('/kyc/face-verification');
  };

  const currentDoc = documents[activeDoc];

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Button
            variant="ghost"
            leftIcon={<FaArrowLeft />}
            onClick={() => navigate(-1)}
            mb={4}
          >
            {t('common.back')}
          </Button>
          <Text color="brand.500" fontWeight="semibold" mb={2}>
            {t('kyc.step', { current: 2, total: 3 })}
          </Text>
          <Heading as="h1" size="xl" fontWeight="bold" mb={4}>
            {t('kyc.upload.title')}
          </Heading>
          <Text color="gray.600">
            {t('kyc.upload.description')}
          </Text>
        </Box>

        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          {/* Document Type Selector */}
          <Box w={{ base: '100%', md: '250px' }}>
            <Card variant="outline">
              <CardBody p={0}>
                {documentTypes.map((docType) => (
                  <Box
                    key={docType.id}
                    p={4}
                    borderBottomWidth="1px"
                    bg={activeDoc === docType.id ? 'brand.50' : 'white'}
                    borderLeftWidth={activeDoc === docType.id ? '4px' : '0'}
                    borderLeftColor={activeDoc === docType.id ? 'brand.500' : 'transparent'}
                    cursor="pointer"
                    _hover={{ bg: 'gray.50' }}
                    onClick={() => setActiveDoc(docType.id)}
                  >
                    <HStack>
                      <Icon as={docType.icon} color="brand.500" />
                      <Text fontWeight={activeDoc === docType.id ? 'semibold' : 'normal'}>
                        {docType.label}
                      </Text>
                      {documents[docType.id].uploaded && (
                        <Box ml="auto" color="green.500">
                          <FaCheckCircle />
                        </Box>
                      )}
                    </HStack>
                  </Box>
                ))}
              </CardBody>
            </Card>
          </Box>

          {/* Document Upload Area */}
          <Box flex={1}>
            <Card variant="outline">
              <CardBody>
                {!currentDoc.uploaded ? (
                  <FormControl>
                    <FormLabel>{t('kyc.upload.uploadLabel', { docName: currentDoc.name })}</FormLabel>
                    <Box
                      borderWidth={2}
                      borderStyle="dashed"
                      borderColor="gray.300"
                      borderRadius="lg"
                      p={8}
                      textAlign="center"
                      _hover={{ borderColor: 'brand.500', bg: 'brand.50' }}
                      transition="all 0.3s"
                    >
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, activeDoc)}
                        display="none"
                        id="document-upload"
                      />
                      <label htmlFor="document-upload">
                        <VStack spacing={4} cursor="pointer">
                          <Icon as={FaCloudUploadAlt} w={12} h={12} color="gray.400" />
                          <Box>
                            <Text fontWeight="medium">{t('kyc.upload.dragAndDrop')}</Text>
                            <Text fontSize="sm" color="gray.500" mt={1}>
                              {t('kyc.upload.supportedFormats')}
                            </Text>
                            <Text fontSize="xs" color="gray.500" mt={2}>
                              {t('kyc.upload.maxSize')}
                            </Text>
                          </Box>
                          <Button colorScheme="brand" variant="outline" size="sm" mt={2}>
                            {t('kyc.upload.browseFiles')}
                          </Button>
                        </VStack>
                      </label>
                    </Box>
                  </FormControl>
                ) : (
                  <Box>
                    <Box position="relative" mb={4}>
                      <Box
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        bg="gray.50"
                        minH="200px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {currentDoc.preview ? (
                          <Image
                            src={currentDoc.preview}
                            alt={currentDoc.name}
                            maxH="300px"
                            objectFit="contain"
                          />
                        ) : (
                          <VStack spacing={2}>
                            <Icon as={FaFilePdf} w={12} h={12} color="red.500" />
                            <Text>{currentDoc.file?.name}</Text>
                          </VStack>
                        )}
                      </Box>
                      <Button
                        position="absolute"
                        top={2}
                        right={2}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeDocument(activeDoc)}
                      >
                        <FaTimes />
                      </Button>
                    </Box>
                    <Button
                      leftIcon={<FaCamera />}
                      colorScheme="brand"
                      variant="outline"
                      w="full"
                      onClick={() => document.getElementById('document-upload')?.click()}
                    >
                      {t('kyc.upload.retake')}
                    </Button>
                  </Box>
                )}

                <Box mt={8} bg="blue.50" p={4} borderRadius="lg">
                  <Text fontSize="sm" color="blue.800">
                    <strong>{t('kyc.tips.title')}:</strong> {t('kyc.tips.documentUpload')}
                  </Text>
                </Box>
              </CardBody>
            </Card>
          </Box>
        </Flex>

        <Flex justify="space-between" mt={8}>
          <Button
            variant="outline"
            onClick={() => navigate('/kyc/start')}
          >
            {t('common.back')}
          </Button>
          <Button
            colorScheme="brand"
            rightIcon={<FaCheckCircle />}
            onClick={handleSubmit}
            isDisabled={!Object.values(documents).some(doc => doc.uploaded)}
          >
            {t('common.continue')}
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default KYCDocumentUpload;
