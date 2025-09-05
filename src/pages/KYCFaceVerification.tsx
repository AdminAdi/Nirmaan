import { useState, useRef, useEffect } from 'react';
import { Box, Button, Container, Flex, Heading, Stack, Text, VStack, useToast, Progress, HStack, Icon, Card, CardBody, useBreakpointValue } from '@chakra-ui/react';
import { FaArrowLeft, FaCheckCircle, FaRedo, FaSmile, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const KYCFaceVerification = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [step, setStep] = useState<'instructions' | 'capture' | 'processing' | 'success'>('instructions');
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Request camera access and start video stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setStep('capture');
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: t('errors.cameraAccess'),
        description: t('errors.enableCameraPermission'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Take a photo from the video stream
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Stop the camera
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Show processing state
    setStep('processing');
    
    // Simulate face verification processing
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += Math.floor(Math.random() * 15) + 5;
      if (progressValue >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setStep('success');
        }, 500);
      }
      setProgress(progressValue > 100 ? 100 : progressValue);
    }, 300);
  };

  // Start countdown for photo capture
  const startCountdown = () => {
    setIsCapturing(true);
    let count = 3;
    setCountdown(count);
    
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      
      if (count <= 0) {
        clearInterval(timer);
        capturePhoto();
      }
    }, 1000);
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleRetry = () => {
    setStep('instructions');
    setProgress(0);
    startCamera();
  };

  const handleComplete = () => {
    navigate('/kyc/success');
  };

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Button
            variant="ghost"
            leftIcon={<FaArrowLeft />}
            onClick={() => navigate(-1)}
            mb={4}
            isDisabled={step === 'processing'}
          >
            {t('common.back')}
          </Button>
          <Text color="brand.500" fontWeight="semibold" mb={2}>
            {t('kyc.step', { current: 3, total: 3 })}
          </Text>
          <Heading as="h1" size="xl" fontWeight="bold" mb={4}>
            {t('kyc.faceVerification.title')}
          </Heading>
          <Text color="gray.600">
            {t('kyc.faceVerification.description')}
          </Text>
        </Box>

        <Card variant="outline" overflow="hidden">
          <CardBody p={0}>
            {step === 'instructions' && (
              <VStack p={8} textAlign="center">
                <Box
                  bg="blue.50"
                  p={6}
                  borderRadius="full"
                  display="inline-flex"
                  mb={6}
                >
                  <Icon as={FaUserCircle} w={16} h={16} color="blue.500" />
                </Box>
                <Heading size="lg" mb={4}>
                  {t('kyc.faceVerification.ready')}
                </Heading>
                <Text color="gray.600" mb={8} maxW="md" mx="auto">
                  {t('kyc.faceVerification.instructions')}
                </Text>
                
                <Stack spacing={4} w="full" maxW="md" mb={8}>
                  {[
                    t('kyc.faceVerification.tip1'),
                    t('kyc.faceVerification.tip2'),
                    t('kyc.faceVerification.tip3'),
                  ].map((tip, index) => (
                    <HStack key={index} align="start" spacing={3}>
                      <Box
                        bg="blue.100"
                        color="blue.600"
                        p={1}
                        borderRadius="md"
                        mt={1}
                        flexShrink={0}
                      >
                        <FaCheckCircle />
                      </Box>
                      <Text textAlign="left" color="gray.600">
                        {tip}
                      </Text>
                    </HStack>
                  ))}
                </Stack>
                
                <Button
                  colorScheme="brand"
                  size="lg"
                  onClick={startCamera}
                  leftIcon={<FaUserCircle />}
                >
                  {t('kyc.faceVerification.startVerification')}
                </Button>
              </VStack>
            )}

            {step === 'capture' && (
              <VStack p={4}>
                <Box
                  position="relative"
                  w="full"
                  maxW="md"
                  mx="auto"
                  borderRadius="lg"
                  overflow="hidden"
                  borderWidth="2px"
                  borderColor="gray.200"
                  bg="black"
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: isCapturing ? 'none' : 'block',
                    }}
                  />
                  
                  {isCapturing && (
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="blackAlpha.700"
                      color="white"
                      fontSize="6xl"
                      fontWeight="bold"
                    >
                      {countdown}
                    </Box>
                  )}
                  
                  <canvas
                    ref={canvasRef}
                    style={{
                      display: 'none',
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                  
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w="80%"
                    h="60%"
                    border="2px dashed"
                    borderColor="white"
                    borderRadius="lg"
                    pointerEvents="none"
                  />
                </Box>
                
                <Box mt={6} textAlign="center">
                  <Text color="gray.600" mb={4}>
                    {isCapturing 
                      ? t('kyc.faceVerification.smiling')
                      : t('kyc.faceVerification.positionFace')}
                  </Text>
                  
                  {!isCapturing && (
                    <Button
                      colorScheme="brand"
                      onClick={startCountdown}
                      leftIcon={<FaSmile />}
                      size="lg"
                    >
                      {t('kyc.faceVerification.takePhoto')}
                    </Button>
                  )}
                </Box>
              </VStack>
            )}
            
            {step === 'processing' && (
              <VStack p={12} textAlign="center">
                <Box
                  bg="blue.50"
                  p={6}
                  borderRadius="full"
                  display="inline-flex"
                  mb={6}
                >
                  <Icon as={FaUserCircle} w={16} h={16} color="blue.500" />
                </Box>
                
                <Heading size="lg" mb={4}>
                  {t('kyc.faceVerification.verifying')}
                </Heading>
                
                <Text color="gray.600" mb={8} maxW="md" mx="auto">
                  {t('kyc.faceVerification.pleaseWait')}
                </Text>
                
                <Box w="full" maxW="md" mb={8}>
                  <Progress 
                    value={progress} 
                    size="sm" 
                    colorScheme="blue" 
                    borderRadius="full"
                    hasStripe
                    isAnimated
                  />
                  <Text mt={2} textAlign="right" color="gray.500" fontSize="sm">
                    {progress}% {t('common.complete')}
                  </Text>
                </Box>
                
                <Text color="gray.500" fontSize="sm">
                  {t('kyc.faceVerification.doNotClose')}
                </Text>
              </VStack>
            )}
            
            {step === 'success' && (
              <VStack p={12} textAlign="center">
                <Box
                  bg="green.50"
                  p={6}
                  borderRadius="full"
                  display="inline-flex"
                  mb={6}
                >
                  <Icon as={FaCheckCircle} w={16} h={16} color="green.500" />
                </Box>
                
                <Heading size="lg" mb={4}>
                  {t('kyc.faceVerification.verificationComplete')}
                </Heading>
                
                <Text color="gray.600" mb={8} maxW="md" mx="auto">
                  {t('kyc.faceVerification.verificationSuccess')}
                </Text>
                
                <Button
                  colorScheme="brand"
                  onClick={handleComplete}
                  rightIcon={<FaCheckCircle />}
                  size="lg"
                >
                  {t('common.continue')}
                </Button>
              </VStack>
            )}
          </CardBody>
        </Card>
        
        {step === 'capture' && (
          <Flex justify="space-between" mt={8}>
            <Button
              variant="outline"
              onClick={() => {
                if (streamRef.current) {
                  streamRef.current.getTracks().forEach(track => track.stop());
                }
                setStep('instructions');
              }}
            >
              {t('common.back')}
            </Button>
            
            {!isCapturing && (
              <Button
                colorScheme="brand"
                variant="outline"
                leftIcon={<FaRedo />}
                onClick={startCamera}
              >
                {t('common.retry')}
              </Button>
            )}
          </Flex>
        )}
        
        {step === 'processing' && (
          <Button
            variant="outline"
            onClick={handleRetry}
            mt={8}
            isDisabled={progress > 90}
          >
            {t('common.cancel')}
          </Button>
        )}
      </VStack>
    </Container>
  );
};

export default KYCFaceVerification;
