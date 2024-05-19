import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        blue: {
            200: '#84A7BA',
            300: '#6F90AF',
            500: '#303655',
        },
        gray: {
            300: '#BFCBCE',
        },

    },
    styles: {
        global: {
            body: {
                fontFamily: 'roboto',
                bg: '#ced2e0',
            }
        }
    },
    components: {
        Link: {
            baseStyle: {
                fontWeight: 'bold',
                textDecoration: 'none',
                color: 'gray.300',
                _hover: {
                    textDecoration: 'none',
                    bg: 'white',
                }
            }
        },
        FormLabel: {
            baseStyle: {
                color: 'gray.300',
                fontWeight: 'bold',
            }
        },
        ChakraLink: {
            variants: {
                'main': {
                    border: '3px solid',
                    borderRadius: '4px',
                    textAlign: 'center',
                }
            }
        }
    }
});

export default theme;