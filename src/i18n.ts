import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const en = {
  translation: {
    // Sahayak Chatbot
    sahayak: {
      title: 'Your Digital Assistant',
      welcome: 'Namaste! I am Sahayak, your digital assistant for {name}. How can I help you today?',
      placeholder: 'Type your message or speak...',
      typing: 'Sahayak is typing',
      tip: 'Tip: Click the microphone to speak in your language',
      startListening: 'Start speaking',
      stopListening: 'Stop listening',
      needHelp: 'Need Help?',
      responses: {
        greeting: 'Namaste! How can I assist you with your KYC process today?',
        help: 'I can help you with KYC verification, document submission, and answer your questions about the process. What do you need help with?',
        kyc: 'KYC (Know Your Customer) is a verification process. You\'ll need to provide identity and address proof documents. Would you like me to guide you through the steps?',
        documents: 'For KYC, you may need: Aadhaar card, PAN card, Voter ID, or Passport. Which document would you like to submit?',
        thanks: 'You\'re welcome! Is there anything else I can help you with?',
        default: 'I\'m here to help with your KYC process. You can ask me about required documents, how to submit them, or any other questions you have.'
      }
    },

    // Common
    common: {
      back: 'Back',
      continue: 'Continue',
      select: 'Select',
      cancel: 'Cancel',
      retry: 'Retry',
      complete: 'Complete',
      contactSupport: 'Contact Support',
      backToHome: 'Back to Home',
    },

    // Header
    header: {
      getStarted: 'Get Started',
    },

    // Hero Section
    hero: {
      title: 'Lightweight Digital Onboarding for Rural & Semi-Urban India',
      subtitle: 'Bharat KYC',
      description: 'A simple, secure, and fast way to complete your KYC process with support for all Indian languages and offline functionality.',
    },

    // Home (used by Home.tsx)
    home: {
      welcome: 'Welcome',
      title: 'Nirmaan',
      subtitle: 'Bharat KYC',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
    },

    // CTA Buttons
    cta: {
      startKYC: 'Start KYC Now',
      learnMore: 'Learn More',
      readyToStart: 'Ready to get started?',
      getStartedDescription: 'Join thousands of users who have completed their KYC in minutes.',
    },

    // Features Section
    features: {
      tagline: 'Why Choose Us',
      title: 'Built for Bharat, Made Simple',
      description: 'Our platform is designed keeping in mind the unique challenges faced by users in rural and semi-urban India.',
      secure: {
        title: 'Bank-Grade Security',
        description: 'Your data is encrypted and protected with the highest security standards.',
      },
      offline: {
        title: 'Offline First',
        description: 'Works even with unstable or no internet connection. Syncs when back online.',
      },
      vernacular: {
        title: 'Vernacular Support',
        description: 'Available in 12+ Indian languages with voice guidance for better understanding.',
      },
    },

    // KYC Steps
    kyc: {
      step: 'Step {{current}} of {{total}}',

      // Start Page
      start: {
        title: 'Choose Your KYC Method',
        description: 'Select the most convenient way to complete your KYC verification.',
      },

      // Document Upload
      upload: {
        title: 'Upload Your Documents',
        description: 'Please upload clear photos or scans of the required documents.',
        uploadLabel: 'Upload {{docName}}',
        dragAndDrop: 'Drag & drop your file here or',
        browseFiles: 'Browse Files',
        supportedFormats: 'Supported formats: JPG, PNG, PDF (Max 5MB)',
        maxSize: 'Max file size: 5MB',
        retake: 'Retake Photo',
      },

      // Face Verification
      faceVerification: {
        title: 'Face Verification',
        description: 'We need to verify that you are a real person. Please follow the instructions below.',
        ready: 'Ready for Face Verification',
        instructions: 'Make sure your face is clearly visible in the frame with good lighting. Remove any accessories that cover your face.',
        positionFace: 'Position your face in the frame',
        takePhoto: 'Take Photo',
        smiling: 'Smile!',
        verifying: 'Verifying Your Identity',
        pleaseWait: 'Please wait while we verify your identity. This may take a few moments.',
        doNotClose: 'Do not close this window or refresh the page.',
        verificationComplete: 'Verification Complete!',
        verificationSuccess: 'Your face has been successfully verified. You can now proceed to the next step.',
      },

      // Success Page
      success: {
        title: 'KYC Submitted Successfully!',
        subtitle: 'Your KYC application has been received and is being processed.',
        thankYou: 'Thank You!',
        referenceNumber: 'Your reference number is: {{number}}',
        downloadReceipt: 'Download Receipt',
        whatsNext: 'What happens next?',
        emailNotification: 'We\'ve sent you an email confirmation',
        emailSentTo: 'A confirmation has been sent to {{email}} with next steps.',
        needHelp: 'Need help with your KYC?',

        // Status Steps
        steps: {
          verification: 'Document Verification',
          verificationDesc: 'We\'re verifying your submitted documents.',
          approval: 'Approval Process',
          approvalDesc: 'Your documents are under review. This may take 1-2 business days.',
          complete: 'KYC Complete',
          completeDesc: 'You\'ll receive a confirmation once your KYC is approved.',
        },
      },

      // KYC Methods
      methods: {
        digilocker: {
          title: 'Digilocker',
          description: 'Fetch documents directly from your Digilocker account',
        },
        document: {
          title: 'Document Upload',
          description: 'Upload photos of your Aadhaar, PAN, or other ID proofs',
        },
        aadhaar: {
          title: 'Aadhaar OTP',
          description: 'Verify using Aadhaar OTP (Instant verification)',
        },
      },

      // Security Note
      security: {
        title: 'Your Security is Our Priority',
        description: 'All your documents and personal information are encrypted and securely stored in compliance with Indian regulations.',
        bullet1: '256-bit SSL encryption',
        bullet2: 'RBI & UIDAI compliant',
        bullet3: 'Your data is never shared without consent',
      },

      // Tips
      tips: {
        title: 'Tips',
        documentUpload: 'Make sure all text is clearly visible and the entire document is in the frame.',
      },
    },

    // OTP Flow
    otp: {
      title: 'Verify your phone number',
      enterPhone: 'Enter your 10-digit phone number',
      sendOtp: 'Send OTP',
      enterOtp: 'Enter the 6-digit OTP',
      verify: 'Verify OTP',
      resend: 'Resend OTP',
      otpSent: 'OTP sent successfully',
      otpVerified: 'Phone number verified',
      invalidPhone: 'Please enter a valid 10-digit phone number',
      invalidOtp: 'Invalid OTP, please try again',
    },

    // Document Types
    documents: {
      aadhaarFront: 'Aadhaar Card (Front)',
      aadhaarBack: 'Aadhaar Card (Back)',
      pan: 'PAN Card',
      passport: 'Passport',
      voterId: 'Voter ID',
      drivingLicense: 'Driving License',
    },

    // Errors
    errors: {
      cameraAccess: 'Camera Access Required',
      enableCameraPermission: 'Please enable camera permissions to continue with face verification.',
      invalidFileType: 'Invalid File Type',
      onlyJpgPngPdf: 'Only JPG, PNG, and PDF files are allowed.',
      fileTooLarge: 'File Too Large',
      maxFileSize: 'Maximum file size is {{size}}',
      noDocuments: 'No Documents Uploaded',
      uploadAtLeastOne: 'Please upload at least one document to continue.',
    },
  },
};

// Hindi translations
const hi = {
  translation: {
    // Sahayak Chatbot
    sahayak: {
      title: 'आपका डिजिटल सहायक',
      welcome: 'नमस्ते! मैं सहायक हूं, {name} के लिए आपका डिजिटल सहायक। मैं आपकी कैसे मदद कर सकता हूं?',
      placeholder: 'संदेश टाइप करें या बोलें...',
      typing: 'सहायक टाइप कर रहा है',
      tip: 'टिप: अपनी भाषा में बोलने के लिए माइक्रोफोन आइकन पर क्लिक करें',
      startListening: 'बोलना शुरू करें',
      stopListening: 'सुनना बंद करें',
      needHelp: 'मदद चाहिए?',
      responses: {
        greeting: 'नमस्ते! मैं आपकी KYC प्रक्रिया में कैसे मदद कर सकता हूं?',
        help: 'मैं KYC सत्यापन, दस्तावेज़ जमा करने और प्रक्रिया के बारे में आपके प्रश्नों का उत्तर देने में मदद कर सकता हूं। आपको किस बारे में मदद चाहिए?',
        kyc: 'KYC (अपने ग्राहक को जानें) एक सत्यापन प्रक्रिया है। आपको पहचान और पते के प्रमाण दस्तावेज प्रदान करने होंगे। क्या आप चाहेंगे कि मैं आपको चरण-दर-चरण मार्गदर्शन दूं?',
        documents: 'KYC के लिए आपको इनमें से कोई एक दस्तावेज चाहिए: आधार कार्ड, पैन कार्ड, वोटर आईडी या पासपोर्ट। आप कौन सा दस्तावेज जमा करना चाहेंगे?',
        thanks: 'आपका स्वागत है! क्या मैं आपकी और किसी बात में मदद कर सकता हूं?',
        default: 'मैं आपकी KYC प्रक्रिया में मदद के लिए यहां हूं। आप मुझसे आवश्यक दस्तावेजों, उन्हें कैसे जमा करें, या किसी अन्य प्रश्न के बारे में पूछ सकते हैं।'
      }
    },

    // Common
    common: {
      back: 'पीछे जाएं',
      continue: 'जारी रखें',
      select: 'चुनें',
      cancel: 'रद्द करें',
      retry: 'पुनः प्रयास करें',
      complete: 'पूर्ण',
      contactSupport: 'सहायता से संपर्क करें',
      backToHome: 'होम पर वापस जाएं',
    },

    // Header
    header: {
      getStarted: 'शुरू करें',
    },

    // Hero Section
    hero: {
      title: 'ग्रामीण और अर्ध-शहरी भारत के लिए डिजिटल ऑनबोर्डिंग',
      subtitle: 'भारत KYC',
      description: 'सभी भारतीय भाषाओं और ऑफलाइन कार्यक्षमता के साथ अपनी KYC प्रक्रिया को पूरा करने का एक सरल, सुरक्षित और तेज़ तरीका।',
    },

    // Home (used by Home.tsx)
    home: {
      welcome: 'स्वागत है',
      title: 'निर्माण',
      subtitle: 'भारत KYC',
      getStarted: 'शुरू करें',
      learnMore: 'और जानें',
    },

    // CTA Buttons
    cta: {
      startKYC: 'अभी KYC शुरू करें',
      learnMore: 'और जानें',
      readyToStart: 'शुरू करने के लिए तैयार हैं?',
      getStartedDescription: 'हजारों उपयोगकर्ताओं से जुड़ें जिन्होंने कुछ ही मिनटों में अपनी KYC पूरी कर ली है।',
    },

    // Features Section
    features: {
      tagline: 'हमें क्यों चुनें',
      title: 'भारत के लिए बनाया गया, सरल बनाया गया',
      description: 'हमारा प्लेटफ़ॉर्म ग्रामीण और अर्ध-शहरी भारत के उपयोगकर्ताओं के सामने आने वाली विशिष्ट चुनौतियों को ध्यान में रखकर बनाया गया है।',
      secure: {
        title: 'बैंक-ग्रेड सुरक्षा',
        description: 'आपका डेटा उच्चतम सुरक्षा मानकों के साथ एन्क्रिप्टेड और सुरक्षित है।',
      },
      offline: {
        title: 'ऑफ़लाइन पहले',
        description: 'अस्थिर या बिना इंटरनेट कनेक्शन के भी काम करता है। ऑनलाइन होने पर सिंक हो जाता है।',
      },
      vernacular: {
        title: 'स्थानीय भाषा समर्थन',
        description: '12+ भारतीय भाषाओं में उपलब्ध है जिसमें बेहतर समझ के लिए आवाज मार्गदर्शन शामिल है।',
      },
    },

    // KYC Steps
    kyc: {
      step: 'चरण {{current}} / {{total}}',

      // Start Page
      start: {
        title: 'अपनी KYC विधि चुनें',
        description: 'अपनी KYC सत्यापन पूरा करने का सबसे सुविधाजनक तरीका चुनें।',
      },

      // Document Upload
      upload: {
        title: 'अपने दस्तावेज़ अपलोड करें',
        description: 'कृपया आवश्यक दस्तावेज़ों की स्पष्ट तस्वीरें या स्कैन अपलोड करें।',
        uploadLabel: '{{docName}} अपलोड करें',
        dragAndDrop: 'अपनी फ़ाइल यहां खींचें या',
        browseFiles: 'फ़ाइलें ब्राउज़ करें',
        supportedFormats: 'समर्थित प्रारूप: JPG, PNG, PDF (अधिकतम 5MB)',
        maxSize: 'अधिकतम फ़ाइल आकार: 5MB',
        retake: 'फिर से लें',
      },

      // Face Verification
      faceVerification: {
        title: 'चेहरे की पहचान',
        description: 'हमें यह सत्यापित करने की आवश्यकता है कि आप एक वास्तविक व्यक्ति हैं। कृपया नीचे दिए गए निर्देशों का पालन करें।',
        ready: 'चेहरे की पहचान के लिए तैयार',
        instructions: 'सुनिश्चित करें कि आपका चेहरा अच्छी रोशनी में फ्रेम में स्पष्ट रूप से दिखाई दे रहा हो। कोई भी सामान हटा दें जो आपके चेहरे को ढकता हो।',
        positionFace: 'अपना चेहरा फ्रेम में रखें',
        takePhoto: 'फोटो लें',
        smiling: 'मुस्कुराइए!',
        verifying: 'आपकी पहचान सत्यापित की जा रही है',
        pleaseWait: 'कृपया प्रतीक्षा करें जब हम आपकी पहचान सत्यापित करते हैं। इसमें कुछ क्षण लग सकते हैं।',
        doNotClose: 'इस विंडो को बंद न करें या पेज को रिफ्रेश न करें।',
        verificationComplete: 'सत्यापन पूरा हो गया!',
        verificationSuccess: 'आपके चेहरे की सफलतापूर्वक पुष्टि हो गई है। अब आप अगले चरण पर आगे बढ़ सकते हैं।',
      },

      // Success Page
      success: {
        title: 'KYC सफलतापूर्वक जमा हो गई!',
        subtitle: 'आपका KYC आवेदन प्राप्त कर लिया गया है और संसाधित किया जा रहा है।',
        thankYou: 'धन्यवाद!',
        referenceNumber: 'आपका संदर्भ संख्या है: {{number}}',
        downloadReceipt: 'रसीद डाउनलोड करें',
        whatsNext: 'आगे क्या होगा?',
        emailNotification: 'हमने आपको एक ईमेल पुष्टिकरण भेजा है',
        emailSentTo: '{{email}} पर एक पुष्टि भेजी गई है जिसमें अगले चरण शामिल हैं।',
        needHelp: 'आपकी KYC के साथ सहायता चाहिए?',

        // Status Steps
        steps: {
          verification: 'दस्तावेज़ सत्यापन',
          verificationDesc: 'हम आपके द्वारा जमा किए गए दस्तावेज़ों को सत्यापित कर रहे हैं।',
          approval: 'अनुमोदन प्रक्रिया',
          approvalDesc: 'आपके दस्तावेज़ों की समीक्षा की जा रही है। इसमें 1-2 कार्यदिवस लग सकते हैं।',
          complete: 'KYC पूर्ण',
          completeDesc: 'आपकी KYC स्वीकृत होने पर आपको एक पुष्टिकरण प्राप्त होगा।',
        },
      },

      // KYC Methods
      methods: {
        digilocker: {
          title: 'डिजिलॉकर',
          description: 'अपने डिजिलॉकर खाते से सीधे दस्तावेज़ प्राप्त करें',
        },
        document: {
          title: 'दस्तावेज़ अपलोड',
          description: 'अपने आधार, पैन या अन्य आईडी प्रमाणों की तस्वीरें अपलोड करें',
        },
        aadhaar: {
          title: 'आधार OTP',
          description: 'आधार OTP का उपयोग करके सत्यापित करें (तुरंत सत्यापन)',
        },
      },

      // Security Note
      security: {
        title: 'आपकी सुरक्षा हमारी प्राथमिकता है',
        description: 'आपके सभी दस्तावेज़ और व्यक्तिगत जानकारी भारतीय विनियमों के अनुपालन में एन्क्रिप्टेड और सुरक्षित रूप से संग्रहीत की जाती है।',
        bullet1: '256-बिट SSL एन्क्रिप्शन',
        bullet2: 'RBI और UIDAI अनुपालन',
        bullet3: 'आपका डेटा सहमति के बिना कभी साझा नहीं किया जाता',
      },

      // Tips
      tips: {
        title: 'सुझाव',
        documentUpload: 'सुनिश्चित करें कि सभी पाठ स्पष्ट रूप से दिखाई दे रहे हों और संपूर्ण दस्तावेज़ फ्रेम में हो।',
      },
    },

    // OTP Flow
    otp: {
      title: 'अपने फोन नंबर की पुष्टि करें',
      enterPhone: 'अपना 10-अंकों का मोबाइल नंबर दर्ज करें',
      sendOtp: 'OTP भेजें',
      enterOtp: '6-अंकों का OTP दर्ज करें',
      verify: 'OTP सत्यापित करें',
      resend: 'OTP पुनः भेजें',
      otpSent: 'OTP सफलतापूर्वक भेजा गया',
      otpVerified: 'फोन नंबर सत्यापित हो गया',
      invalidPhone: 'कृपया मान्य 10-अंकों का मोबाइल नंबर दर्ज करें',
      invalidOtp: 'अमान्य OTP, कृपया पुनः प्रयास करें',
    },

    // Document Types
    documents: {
      aadhaarFront: 'आधार कार्ड (सामने की तरफ)',
      aadhaarBack: 'आधार कार्ड (पीछे की तरफ)',
      pan: 'पैन कार्ड',
      passport: 'पासपोर्ट',
      voterId: 'मतदाता पहचान पत्र',
      drivingLicense: 'ड्राइविंग लाइसेंस',
    },

    // Errors
    errors: {
      cameraAccess: 'कैमरा एक्सेस आवश्यक',
      enableCameraPermission: 'चेहरे की पहचान जारी रखने के लिए कृपया कैमरा अनुमतियाँ सक्षम करें।',
      invalidFileType: 'अमान्य फ़ाइल प्रकार',
      onlyJpgPngPdf: 'केवल JPG, PNG, और PDF फ़ाइलें स्वीकार्य हैं।',
      fileTooLarge: 'फ़ाइल बहुत बड़ी है',
      maxFileSize: 'अधिकतम फ़ाइल आकार {{size}} है',
      noDocuments: 'कोई दस्तावेज़ अपलोड नहीं किया गया',
      uploadAtLeastOne: 'जारी रखने के लिए कृपया कम से कम एक दस्तावेज़ अपलोड करें।',
    },
  },
};

// Bengali translations
const bn = {
  translation: {
    common: {
      back: 'পিছনে যান',
      continue: 'চালিয়ে যান',
      select: 'নির্বাচন করুন',
      cancel: 'বাতিল',
      retry: 'পুনরায় চেষ্টা করুন',
      complete: 'সম্পূর্ণ',
      contactSupport: 'সাপোর্টে যোগাযোগ করুন',
      backToHome: 'হোমে ফিরে যান',
    },
    header: {
      getStarted: 'শুরু করুন',
    },
    // Add more translations as needed
  },
};

// Tamil translations
const ta = {
  translation: {
    common: {
      back: 'பின்னால் செல்',
      continue: 'தொடரவும்',
      select: 'தேர்ந்தெடு',
      cancel: 'ரத்து செய்',
      retry: 'மீண்டும் முயற்சிக்கவும்',
      complete: 'முடிந்தது',
      contactSupport: 'ஆதரவைத் தொடர்பு கொள்ளவும்',
      backToHome: 'முகப்புக்குச் செல்லவும்',
    },
    header: {
      getStarted: 'தொடங்குங்கள்',
    },
    // Add more translations as needed
  },
};

// Telugu translations
const te = {
  translation: {
    common: {
      back: 'వెనక్కి వెళ్ళు',
      continue: 'కొనసాగించు',
      select: 'ఎంచుకోండి',
      cancel: 'రద్దు చేయి',
      retry: 'మళ్లీ ప్రయత్నించు',
      complete: 'పూర్తి',
      contactSupport: 'మద్దతును సంప్రదించండి',
      backToHome: 'హోమ్‌కు తిరిగి వెళ్ళు',
    },
    header: {
      getStarted: 'ప్రారంభించండి',
    },
    // Add more translations as needed
  },
};

// Marathi translations
const mr = {
  translation: {
    common: {
      back: 'मागे जा',
      continue: 'सुरू ठेवा',
      select: 'निवडा',
      cancel: 'रद्द करा',
      retry: 'पुन्हा प्रयत्न करा',
      complete: 'पूर्ण',
      contactSupport: 'आधाराशी संपर्क साधा',
      backToHome: 'मुख्यपृष्ठावर परत जा',
    },
    header: {
      getStarted: 'सुरू करा',
    },
    // Add more translations as needed
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      hi: hi,
      bn: bn,
      ta: ta,
      te: te,
      mr: mr,
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'bn', 'ta', 'te', 'mr'],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
