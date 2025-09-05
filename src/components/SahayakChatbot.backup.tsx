import { 
  Box, 
  Button, 
  IconButton, 
  Input, 
  Popover, 
  PopoverBody, 
  PopoverContent, 
  PopoverTrigger, 
  VStack, 
  HStack, 
  Text, 
  useDisclosure, 
  useToast,
  Tooltip,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react';
import { FaRobot, FaMicrophone, FaStop, FaPaperPlane, FaVolumeUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Extend Window interface to include webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

// Define interfaces for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
  new (): SpeechRecognition;
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
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      // Try to find a female voice for the current language
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
        title: t('sahayak.errors.speechSynthesis'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [i18n.language, t, toast]);

  // Handle speech recognition result
  const handleRecognitionResult = useCallback(async (event: SpeechRecognitionEvent) => {
    const result = event.results[0];
    if (result && result.length > 0) {
      const transcript = result[0].transcript;
      if (transcript) {
        setIsProcessing(true);
        try {
          // Add user message
          setMessages(prev => [...prev, { text: transcript, sender: 'user' }]);
          
          // Generate bot response
          const response = generateBotResponse(transcript);
          
          // Add bot response
          const botMessage = { text: response, sender: 'bot' as const };
          setMessages(prev => [...prev, botMessage]);
          
          // Speak the response
          speak(response);
        } catch (error) {
          console.error('Error handling recognition result:', error);
          toast({
            title: 'Error',
            description: 'Failed to process your message',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setIsProcessing(false);
        }
      }
    }
  }, [generateBotResponse, speak, toast, setIsProcessing, setMessages]);

  // Generate bot response based on user input
  const generateBotResponse = useCallback((message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
      return t('sahayak.responses.greeting');
    } else if (lowerMessage.includes('help') || lowerMessage.includes('sahayata')) {
      return t('sahayak.responses.help');
    } else if (lowerMessage.includes('kyc') || lowerMessage.includes('verification')) {
      return t('sahayak.responses.kyc');
    } else if (lowerMessage.includes('thank')) {
      return t('sahayak.responses.thanks');
    } else {
      return t('sahayak.responses.default');
    }
  }, [t]);

  // Convert text to speech
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      // Try to find a female voice for the current language
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
    }
  }, [i18n.language]);

  // Handle sending a message
  const handleSendMessage = useCallback(async (message: string = input) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Add user message
    const userMessage = { text: trimmedMessage, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      // Small delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = generateBotResponse(trimmedMessage);
      const botMessage = { text: response, sender: 'bot' as const };
      setMessages(prev => [...prev, botMessage]);
      speak(response);
    } catch (error) {
      console.error('Error generating bot response:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate response',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  }, [generateBotResponse, input, speak, toast]);

      const transcript = result[0].transcript;
      if (transcript) {
        setInput(transcript);
        const trimmedMessage = transcript.trim();
        if (!trimmedMessage) return;

        // Add user message
        const userMessage = { text: trimmedMessage, sender: 'user' as const };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsProcessing(true);

        try {
          // Simulate bot response (in a real app, this would be an API call)
          const response = generateBotResponse(trimmedMessage);
          const botMessage = { text: response, sender: 'bot' as const };
          setMessages(prev => [...prev, botMessage]);
          speak(response);
        } catch (error) {
          console.error('Error handling recognition result:', error);
          toast({
            title: 'Error',
            description: 'Failed to process your message',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setIsProcessing(false);
        }
      }
    }
  }, [generateBotResponse, speak, toast]);

  // Initialize speech recognition
  const initSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = i18n.language;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          handleRecognitionResult(event).catch(error => {
            console.error('Error in recognition result handler:', error);
          });
        };

        recognition.onerror = (event: Event) => {
          console.error('Speech recognition error:', event);
          setIsListening(false);
          
          toast({
            title: 'Speech recognition error',
            description: 'An error occurred with speech recognition',
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
          title: 'Not supported',
          description: 'Speech recognition is not supported in your browser',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      toast({
        title: 'Initialization error',
        description: 'Failed to initialize speech recognition',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [handleRecognitionResult, i18n.language, toast]);

  const handleRecognitionResult = useCallback(async (event: SpeechRecognitionEvent) => {
    const result = event.results[0];
    if (result && result.length > 0) {
      const transcript = result[0].transcript;
      if (transcript) {
        setInput(transcript);
        const trimmedMessage = transcript.trim();
        if (!trimmedMessage) return;

        // Add user message
        const userMessage = { text: trimmedMessage, sender: 'user' as const };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsProcessing(true);

        try {
          // Simulate bot response (in a real app, this would be an API call)
          const response = generateBotResponse(trimmedMessage);
          const botMessage = { text: response, sender: 'bot' as const };
          setMessages(prev => [...prev, botMessage]);
          speak(response);
        } catch (error) {
          console.error('Error handling recognition result:', error);
          toast({
            title: 'Error',
            description: 'Failed to process your message',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setIsProcessing(false);
        }
      }
    }
  }, [generateBotResponse, speak, toast]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      toast({
        title: 'Speech recognition not available',
        description: 'Your browser does not support speech recognition or it has been disabled.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const startRecognition = () => {
      if (!recognitionRef.current) return;
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
        
        toast({
          title: 'Listening...',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
        
        toast({
          title: 'Error',
          description: 'Could not start speech recognition. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    // Stop any existing recognition first to avoid errors
    try {
      if (recognitionRef.current) {
        recognitionRef.current.onend = () => {
          startRecognition();
        };
        recognitionRef.current.stop();
      } else {
        startRecognition();
      }
    } catch (e) {
      console.error('Error stopping previous recognition:', e);
      startRecognition();
    }
  }, [toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language;
      utterance.rate = 0.9; // Slightly slower than normal
      utterance.pitch = 1; // Normal pitch
      
      // Set voice if available
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
    }
  }, [i18n.language]);

  const handleSendMessage = useCallback(async (message: string = input) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Add user message
    const userMessage = { text: trimmedMessage, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      // Small delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = generateBotResponse(trimmedMessage);
      const botMessage = { text: response, sender: 'bot' as const };
      setMessages(prev => [...prev, botMessage]);
      speak(response);
    } catch (error) {
      console.error('Error generating bot response:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate response',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  }, [generateBotResponse, input, speak, toast]);

  const generateBotResponse = useCallback((message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
      return t('sahayak.responses.greeting');
    } else if (lowerMessage.includes('help') || lowerMessage.includes('sahayata')) {
      return t('sahayak.responses.help');
    } else if (lowerMessage.includes('kyc') || lowerMessage.includes('verification')) {
      return t('sahayak.responses.kyc');
    } else if (lowerMessage.includes('document') || lowerMessage.includes('dokumen')) {
      return t('sahayak.responses.documents');
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('dhanyavad')) {
      return t('sahayak.responses.thanks');
    } else {
      return t('sahayak.responses.default');
    }
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box position="fixed" bottom={4} right={4} zIndex={1000}>
      <Popover isOpen={isOpen} onClose={onClose} placement="top-end" closeOnBlur={false}>
        <PopoverTrigger>
          <Box
            as="button"
            onClick={onToggle}
            bgGradient="linear(to-r, green.500, green.600)"
            color="white"
            p={4}
            borderRadius="full"
            boxShadow="lg"
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: 'xl',
            }}
            transition="all 0.2s"
          >
            <FaRobot size={24} />
          </Box>
        </PopoverTrigger>
        <PopoverContent width="350px" maxH="70vh" display="flex" flexDirection="column">
          <PopoverArrow />
          <PopoverHeader 
            bgGradient="linear(to-r, green.500, green.600)" 
            color="white" 
            borderTopRadius="md"
            p={3}
            display="flex"
            alignItems="center"
          >
            <Avatar size="sm" bg="white" icon={<FaRobot color="green.600" />} mr={2} />
            <Text fontWeight="bold">Sahayak - {t('sahayak.title')}</Text>
          </PopoverHeader>
          <PopoverCloseButton color="white" />
          <PopoverBody p={0} flex={1} display="flex" flexDirection="column">
            <Box 
              flex={1} 
              p={4} 
              overflowY="auto"
              bg={useColorModeValue('gray.50', 'gray.900')}
            >
              <VStack spacing={3} align="stretch">
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                    maxW="80%"
                  >
                    <Box
                      bg={msg.sender === 'user' ? 'green.100' : 'white'}
                      color={msg.sender === 'user' ? 'gray.800' : 'gray.700'}
                      px={4}
                      py={2}
                      borderRadius="lg"
                      boxShadow="sm"
                      borderWidth="1px"
                      borderColor={msg.sender === 'user' ? 'green.200' : 'gray.200'}
                    >
                      <Text fontSize="sm">{msg.text}</Text>
                    </Box>
                  </Box>
                ))}
                {isProcessing && (
                  <Box alignSelf="flex-start" maxW="80%">
                    <Box bg="white" px={4} py={2} borderRadius="lg" boxShadow="sm">
                      <Spinner size="sm" mr={2} />
                      <Text as="span" fontSize="sm">{t('sahayak.typing')}...</Text>
                    </Box>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </VStack>
            </Box>

            <Box p={3} borderTopWidth="1px" borderColor={borderColor} bg={bgColor}>
              <HStack spacing={2}>
                <Input
                  placeholder={t('sahayak.placeholder')}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  size="sm"
                  borderRadius="full"
                  borderColor={borderColor}
                  _focus={{
                    borderColor: 'green.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-green-500)',
                  }}
                />
                <Tooltip label={isListening ? t('sahayak.stopListening') : t('sahayak.startListening')}>
                  <IconButton
                    aria-label={isListening ? 'Stop listening' : 'Start listening'}
                    icon={isListening ? <FaStop /> : <FaMicrophone />}
                    onClick={isListening ? stopListening : startListening}
                    colorScheme={isListening ? 'red' : 'gray'}
                    size="sm"
                    borderRadius="full"
                  />
                </Tooltip>
                <IconButton
                  aria-label="Send message"
                  icon={<FaPaperPlane />}
                  onClick={() => handleSendMessage()}
                  colorScheme="green"
                  size="sm"
                  borderRadius="full"
                  isDisabled={!input.trim()}
                />
              </HStack>
              <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
                {t('sahayak.tip')}
              </Text>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default SahayakChatbot;
