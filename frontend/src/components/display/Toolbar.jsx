import { Link as ReactRouterLink } from 'react-router-dom'
import { 
    Link as ChakraLink, 
    Stack,
 } from '@chakra-ui/react';
import MainDropdownMenu from './MainDropdownMenu';

const Toolbar = props => {
    const mt = props.mt || 0;
    const ml = props.ml || '7vw';

    return (
        <>
            <Stack 
                spacing={8} 
                ml={0}
                mt={mt}
                textAlign='left'
                bg='blue.500'
                z='1000000'
                w='15rem'
                h='100vw'
                position='relative'>
                <ChakraLink 
                    w='250px'
                    as={ReactRouterLink} 
                    to='/businesses'
                    textAlign='left'
                    ml='0.5rem'
                    mt='1rem'>
                    Main Feed
                </ChakraLink>
                <ChakraLink 
                    w='250px'
                    as={ReactRouterLink} 
                    to='/new-business-diligence'
                    textAlign='left'
                    ml='0.5rem'>
                    Create Business Diligence
                </ChakraLink>
                <ChakraLink 
                    w='250px'
                    textAlign='left'
                    as={ReactRouterLink} 
                    to='/new-business'
                    ml='0.5rem'>
                    Create a business
                </ChakraLink>
                <ChakraLink
                    w='250px'
                    textAlign='left'
                    as={ReactRouterLink} 
                    to='/business-diligence'
                    ml='0.5rem'>
                    Business Diligence Comparison
                </ChakraLink>
                <ChakraLink
                    w='250px'
                    textAlign='left'
                    as={ReactRouterLink} 
                    to='/business-diligence'
                    ml='0.5rem'>
                    Import Data
                </ChakraLink>
            </Stack>
        </>
    )
}

export default Toolbar;