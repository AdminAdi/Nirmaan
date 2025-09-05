import { Box, Flex, Image, Button, useColorMode, useColorModeValue, HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, Text, Tooltip } from '@chakra-ui/react';
import { MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

// Language configuration with native names and flags
const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', nativeName: 'मराठी', flag: '🇮🇳' },
];

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Box as="header" bg={bg} boxShadow="sm" position="sticky" top={0} zIndex={10} borderBottom="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Flex maxW="7xl" mx="auto" px={4} py={3} align="center" justify="space-between">
        <Flex align="center">
          <Image
            src="/logo.svg"
            alt="Nirmaan KYC"
            h="40px"
            mr={3}
          />
          <Box fontSize="xl" fontWeight="bold" bgGradient="linear(to-r, green.500, saffron.500, white)" bgClip="text">
            Nirmaan KYC
          </Box>
        </Flex>

        <HStack spacing={3}>
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />} 
              variant="ghost"
              leftIcon={<Text fontSize="lg">{currentLanguage.flag}</Text>}
              size="sm"
            >
              <Text>{currentLanguage.nativeName}</Text>
            </MenuButton>
            <MenuList zIndex={20}>
              {languages.map((lang) => (
                <MenuItem 
                  key={lang.code} 
                  onClick={() => changeLanguage(lang.code)}
                  bg={i18n.language === lang.code ? 'green.50' : 'transparent'}
                >
                  <Text mr={2} fontSize="lg">{lang.flag}</Text>
                  <Text>{lang.name} {lang.code !== 'en' && `(${lang.nativeName})`}</Text>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          
          <Tooltip label={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'} placement="bottom">
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
            />
          </Tooltip>
          
          <Button 
            colorScheme="green" 
            size="sm"
            bgGradient="linear(to-r, green.500, green.600)"
            _hover={{
              bgGradient: 'linear(to-r, green.600, green.700)',
              transform: 'translateY(-1px)',
              boxShadow: 'md',
            }}
            _active={{
              bgGradient: 'linear(to-r, green.700, green.800)',
              transform: 'translateY(0)',
            }}
          >
            {t('header.getStarted')}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
