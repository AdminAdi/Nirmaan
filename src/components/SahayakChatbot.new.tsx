import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  IconButton,
  Input,
  Text,
  VStack,
  HStack,
  useDisclosure,
  Tooltip,
  Spinner,
  useToast,
  useColorModeValue,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { FaRobot, FaMicrophone, FaStop, FaPaperPlane, FaVolumeUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Extend Window interface to include webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

const SahayakChatbot = () => {
  const { t, i18n } = useTranslation();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Generate bot response
  const generateBotResponse = useCallback((message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
      return t('sahayak.responses.greeting', 'Hello! How can I help you today?');
    } else if (lowerMessage.includes('help') || lowerMessage.includes('sahayata')) {
      return t('sahayak.responses.help', 'I can help you with KYC verification. What do you need help with?');
    } else if (lowerMessage.includes('kyc') || lowerMessage.includes('verification')) {
      return t('sahayak.responses.kyc', 'For KYC verification, please have your ID proof and address proof ready.');
    } else if (lowerMessage.includes('thank')) {
      return t('sahayak.responses.thanks', "You're welcome! Is there anything else I can help with?");
    } else {
      return t('sahayak.responses.default', 'I am not sure how to respond to that. Could you please rephrase?');
    }
  }, [t]);

  // Convert text to speech
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = voices.filter(voice => 
        voice.lang.startsWith(i18n.language) && 
        voice.name.toLowerCase().includes('female')
      );
      
      if (preferredVoices.length > 0) {
        utterance.voice = preferredVoices[0];
      }
      
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error with speech synthesis:', error);
      toast({
        title: t('sahayak.errors.speechSynthesis', 'Speech Synthesis Error'),
        description: t('sahayak.errors.speechSynthesisError', 'Failed to convert text to speech'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [i18n.language, t, toast]);

  // Handle sending a message
  const handleSendMessage = useCallback(async (message: string = input) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Add user message
    const userMessage: ChatMessage = { text: trimmedMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = generateBotResponse(trimmedMessage);
      const botMessage: ChatMessage = { text: response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
      speak(response);
    } catch (error) {
      console.error('Error generating bot response:', error);
      toast({
        title: t('sahayak.errors.generic', 'Error'),
        description: t('sahayak.errors.failedToGenerateResponse', 'Failed to generate response'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  }, [generateBotResponse, input, speak, t, toast]);

  // Handle speech recognition result
  const handleRecognitionResult = useCallback((event: SpeechRecognitionEvent) => {
    const result = event.results[0];
    if (result && result.length > 0) {
      const transcript = result[0].transcript;
      if (transcript) {
        handleSendMessage(transcript);
      }
    }
  }, [handleSendMessage]);

  // Toggle voice input
  const toggleListening = useCallback(() => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
          
          toast({
            title: t('sahayak.listening', 'Listening...'),
            status: 'info',
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          console.error('Error starting speech recognition:', error);
          toast({
            title: t('sahayak.errors.generic', 'Error'),
            description: t('sahayak.errors.couldNotStartListening', 'Could not start listening'),
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
  }, [isListening, t, toast]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = i18n.language;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          handleRecognitionResult(event);
        };

        recognition.onerror = (event: Event) => {
          console.error('Speech recognition error:', event);
          setIsListening(false);
          
          toast({
            title: t('sahayak.errors.speechRecognition', 'Speech Recognition Error'),
            description: t('sahayak.errors.speechRecognitionError', 'An error occurred with speech recognition'),
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        console.warn('Speech recognition not supported in this browser');
        toast({
          title: t('sahayak.errors.notSupported', 'Not Supported'),
          description: t('sahayak.errors.speechRecognitionNotSupported', 'Speech recognition is not supported in your browser'),
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      toast({
        title: t('sahayak.errors.initialization', 'Initialization Error'),
        description: t('sahayak.errors.failedToInitialize', 'Failed to initialize speech recognition'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [handleRecognitionResult, i18n.language, t, toast]);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        text: t('sahayak.welcome', 'Welcome to Nirmaan KYC Assistant! How can I help you today?'),
        sender: 'bot'
      }
    ]);
  }, [t]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error('Error stopping recognition:', e);
        }
      }
    };
  }, []);

  return (
    <Box position="fixed" bottom={8} right={8} zIndex={1000}>
      {isOpen ? (
        <Box
          width="350px"
          height="500px"
          bg={bgColor}
          borderRadius="lg"
          boxShadow="lg"
          display="flex"
          flexDirection="column"
          borderWidth="1px"
          borderColor={borderColor}
          overflow="hidden"
        >
          <Flex
            bg="blue.500"
            color="white"
            p={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack spacing={2}>
              <FaRobot />
              <Text fontWeight="bold">Sahayak</Text>
            </HStack>
            <HStack spacing={2}>
              <Tooltip label={isListening ? t('sahayak.stopListening', 'Stop Listening') : t('sahayak.startListening', 'Start Listening')}>
                <IconButton
                  icon={isListening ? <FaStop /> : <FaMicrophone />}
                  aria-label={isListening ? t('sahayak.stopListening', 'Stop Listening') : t('sahayak.startListening', 'Start Listening')}
                  size="sm"
                  colorScheme={isListening ? 'red' : 'blue'}
                  onClick={toggleListening}
                  isDisabled={isProcessing}
                />
              </Tooltip>
              <Tooltip label={t('sahayak.textToSpeech', 'Read Aloud')}>
                <IconButton
                  icon={<FaVolumeUp />}
                  aria-label={t('sahayak.textToSpeech', 'Read Aloud')}
                  size="sm"
                  onClick={() => {
                    const lastBotMessage = [...messages].reverse().find(m => m.sender === 'bot');
                    if (lastBotMessage) {
                      speak(lastBotMessage.text);
                    }
                  }}
                  isDisabled={isProcessing}
                />
              </Tooltip>
              <IconButton
                icon={<span>&times;</span>}
                aria-label={t('sahayak.close', 'Close')}
                size="sm"
                onClick={onClose}
                variant="ghost"
                _hover={{ bg: 'blue.600' }}
              />
            </HStack>
          </Flex>
          
          <Box flex={1} p={4} overflowY="auto" bg={bgColor}>
            <VStack spacing={4} align="stretch">
              {messages.map((message, index) => (
                <Box
                  key={index}
                  alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                  maxW="80%"
                  bg={message.sender === 'user' ? 'blue.500' : 'gray.100'}
                  color={message.sender === 'user' ? 'white' : 'gray.800'}
                  px={4}
                  py={2}
                  borderRadius="lg"
                  borderTopLeftRadius={message.sender === 'user' ? 'lg' : 'sm'}
                  borderTopRightRadius={message.sender === 'user' ? 'sm' : 'lg'}
                >
                  <Text>{message.text}</Text>
                </Box>
              ))}
              {isProcessing && (
                <Box
                  alignSelf="flex-start"
                  maxW="80%"
                  bg="gray.100"
                  color="gray.800"
                  px={4}
                  py={2}
                  borderRadius="lg"
                  borderTopLeftRadius="sm"
                >
                  <HStack spacing={2}>
                    <Spinner size="sm" />
                    <Text>{t('sahayak.typing', 'Sahayak is typing...')}</Text>
                  </HStack>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </VStack>
          </Box>
          
          <Box p={3} borderTopWidth="1px" borderColor={borderColor}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <HStack spacing={2}>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('sahayak.typeMessage', 'Type your message...')}
                  disabled={isProcessing}
                  flex={1}
                  bg={bgColor}
                  borderColor={borderColor}
                  _hover={{ borderColor: 'gray.300' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
                />
                <Button
                  type="submit"
                  colorScheme="blue"
                  disabled={isProcessing || !input.trim()}
                  px={4}
                >
                  <FaPaperPlane />
                </Button>
              </HStack>
            </form>
          </Box>
        </Box>
      ) : (
        <IconButton
          icon={<FaRobot />}
          aria-label={t('sahayak.openChat', 'Open Chat')}
          colorScheme="blue"
          size="lg"
          isRound
          onClick={onToggle}
          boxShadow="lg"
          position="fixed"
          bottom={8}
          right={8}
        />
      )}
    </Box>
  );
};

export default SahayakChatbot;
