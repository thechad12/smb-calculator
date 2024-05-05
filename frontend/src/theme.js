import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontFamily: 'roboto',
                bg: '#242582',
            }
        }
    },
    components: {
        Link: {
            baseStyle: {
                fontWeight: 'bold',
                textDecoration: 'none',
                color: 'gray.50'
            }
        },
        FormLabel: {
            baseStyle: {
                color: 'gray.50',
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