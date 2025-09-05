# Bharat KYC - Digital Onboarding Solution

A lightweight, multilingual digital onboarding platform designed specifically for rural and semi-urban India. This React-based application provides a seamless KYC (Know Your Customer) experience with support for multiple Indian languages and offline functionality.

## Features

- 🌐 **Multilingual Support**: Available in English, Hindi, Marathi, and Bengali
- 📱 **Mobile-First Design**: Optimized for mobile devices and low-bandwidth connections
- 🔒 **Bank-Grade Security**: 256-bit SSL encryption with RBI & UIDAI compliance
- 📄 **Document Upload**: Support for Aadhaar, PAN, Passport, Voter ID, and Driving License
- 📸 **Face Verification**: Real-time face verification using device camera
- 🎨 **Modern UI**: Built with Chakra UI for a clean, accessible interface
- ⚡ **Fast Performance**: Optimized bundle with code splitting

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Chakra UI
- **Routing**: React Router DOM
- **Internationalization**: i18next
- **Icons**: React Icons
- **Forms**: React Hook Form
- **Validation**: Zod
- **Styling**: Emotion, CSS-in-JS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bharat-kyc
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card.tsx        # Custom card component
│   ├── Footer.tsx      # Footer component
│   └── Header.tsx      # Header with navigation
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── KYCStart.tsx    # KYC method selection
│   ├── KYCDocumentUpload.tsx  # Document upload
│   ├── KYCFaceVerification.tsx # Face verification
│   └── KYCSuccess.tsx  # Success page
├── styles/             # Global styles and theme
│   ├── global.css      # Global CSS styles
│   └── theme.ts        # Chakra UI theme configuration
├── i18n.ts            # Internationalization setup
├── App.tsx            # Main app component
└── main.tsx           # Application entry point
```

## KYC Flow

1. **Home Page**: Introduction and feature overview
2. **KYC Start**: Choose verification method (Digilocker, Document Upload, Aadhaar OTP)
3. **Document Upload**: Upload required identity documents
4. **Face Verification**: Real-time face verification using camera
5. **Success**: Confirmation and next steps

## Supported Documents

- Aadhaar Card (Front & Back)
- PAN Card
- Passport
- Voter ID
- Driving License

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Features

- 256-bit SSL encryption
- RBI & UIDAI compliance
- Secure document handling
- Privacy-first approach

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact:
- Email: support@bharatkyc.in
- Phone: +91 98765 43210

---

Built with ❤️ for Digital India