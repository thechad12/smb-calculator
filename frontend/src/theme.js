import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontFamily: 'roboto',
            }
        }
    },
    components: {
        Link: {
            baseStyle: {
                fontWeight: 'bold',
                textDecoration: 'none',
            }
        }
    }
});