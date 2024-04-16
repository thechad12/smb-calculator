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
        }
    }
});

export default theme;