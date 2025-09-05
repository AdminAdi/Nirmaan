import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Indian Tricolor Theme
const colors = {
  // Indian Tricolors
  // Saffron (Top band of the flag)
  saffron: {
    50: '#fff8e6',
    100: '#ffecb3',
    200: '#ffdf80',
    300: '#ffd34d',
    400: '#ffc61a',
    500: '#FF9933', // Official Saffron (Pantone 1495 C)
    600: '#e68a2e',
    700: '#b36b24',
    800: '#804c1a',
    900: '#4d2e10',
  },
  // White (Middle band of the flag)
  white: {
    50: '#ffffff',
    100: '#f8f9fa',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#FFFFFF', // Pure White
    600: '#e9ecef',
    700: '#adb5bd',
    800: '#6c757d',
    900: '#495057',
  },
  // Green (Bottom band of the flag)
  green: {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#138808', // Official India Green (Pantone 2258 C)
    600: '#107a06',
    700: '#0d5c05',
    800: '#0a3d03',
    900: '#061f02',
  },
  // Ashoka Chakra Blue (Navy Blue)
  navy: {
    100: '#e6e6f2',
    200: '#b3b3d9',
    300: '#8080bf',
    400: '#4d4da6',
    500: '#000080', // Navy Blue for Ashoka Chakra (Pantone 2755 C)
    600: '#000073',
    700: '#000066',
    800: '#00004d',
    900: '#000033',
  },
  // Additional colors
  brand: {
    50: '#e6f7ff',
    100: '#b3e0ff',
    200: '#80c9ff',
    300: '#4db2ff',
    400: '#1a9bff',
    500: '#0084ff',
    600: '#006acc',
    700: '#004f99',
    800: '#003566',
    900: '#001a33',
  },
  accent: {
    50: '#f0f7ff',
    100: '#d0e7ff',
    200: '#b0d7ff',
    300: '#90c7ff',
    400: '#70b7ff',
    500: '#50a7ff',
    600: '#4086cc',
    700: '#306499',
    800: '#204366',
    900: '#102133',
  },
  gray: {
    50: '#f8f9fa',
    100: '#f1f3f5',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#868e96',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },
};

const fonts = {
  heading: 'Poppins, sans-serif',
  body: 'Inter, sans-serif',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'md',
      transition: 'all 0.2s',
    },
    variants: {
      solid: (props: any) => ({
        bg: 'saffron.500',
        color: 'white',
        _hover: {
          bg: 'saffron.600',
          _disabled: {
            bg: 'saffron.500',
          },
        },
        _active: {
          bg: 'saffron.700',
        },
      }),
      secondary: (props: any) => ({
        bg: 'green.500',
        color: 'white',
        _hover: {
          bg: 'green.600',
          _disabled: {
            bg: 'green.500',
          },
        },
        _active: {
          bg: 'green.700',
        },
      }),
      outline: (props: any) => ({
        border: '2px solid',
        borderColor: 'navy.500',
        color: 'navy.500',
        _hover: {
          bg: 'navy.50',
        },
        _active: {
          bg: 'navy.100',
        },
      }),
    },
    defaultProps: {
      size: 'md',
      variant: 'solid',
    },
  },
  Input: {
    baseStyle: {
      field: {
        fontSize: ['md', 'lg'],
        p: '0.875rem 1rem',
        h: 'auto',
        borderRadius: 'lg',
        _focus: {
          borderColor: 'green.500',
          boxShadow: '0 0 0 2px var(--chakra-colors-green-300)',
          borderWidth: '2px',
        },
      },
    },
    sizes: {
      lg: {
        field: {
          fontSize: ['lg', 'xl'],
          p: '1rem 1.25rem',
        },
      },
    },
  },
  Link: {
    baseStyle: {
      color: 'navy.600',
      _hover: {
        textDecoration: 'none',
        color: 'saffron.600',
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'xl',
        boxShadow: 'md',
        overflow: 'hidden',
        _hover: {
          boxShadow: 'xl',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.2s',
      },
    },
  },
  Text: {
    baseStyle: {
      fontSize: ['md', 'lg'],
      lineHeight: 'tall',
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
      lineHeight: 'shorter',
      mb: '0.5em',
      color: 'navy.700',
    },
  },
};

const styles = {
  global: (props: any) => ({
    'html, body': {
      bg: 'white',
      color: 'gray.800',
      lineHeight: 'tall',
    },
    'h1, h2, h3, h4, h5, h6': {
      color: 'navy.700',
      fontWeight: 'bold',
      mb: '0.5em',
    },
    a: {
      color: 'navy.600',
      _hover: {
        color: 'saffron.600',
        textDecoration: 'underline',
      },
    },
    button: {
      _hover: {
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      },
      _active: {
        transform: 'translateY(0)',
      },
    },
  }),
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  colors: {
    ...colors,
    primary: colors.saffron,
    secondary: colors.green,
    accent: colors.navy,
  },
  fonts,
  styles,
  components,
  config,
});
