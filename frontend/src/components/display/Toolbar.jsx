import { Link as ReactRouterLink } from 'react-router-dom'
import { 
    Link as ChakraLink, 
    HStack,
 } from '@chakra-ui/react';
import MainDropdownMenu from './MainDropdownMenu';

const Toolbar = props => {
    const mt = props.mt || 0;
    const ml = props.ml || '7vw';

    return (
        <>
            <HStack 
                spacing={8} 
                ml={0}
                mt={mt}
                textAlign='center'
                bg='blue.500'
                borderRadius='3px'
                w='100%'
                h='60px'
                position='absolute'>
                <ChakraLink 
                    w='250px'
                    as={ReactRouterLink} 
                    to='/new-deal-box'
                    textAlign='center'>
                    Create a deal box
                </ChakraLink>
                <ChakraLink 
                    w='250px'
                    textAlign='center'
                    as={ReactRouterLink} 
                    to='/new-business'>
                    Create a business
                </ChakraLink>
                <ChakraLink 
                    w='250px'
                    textAlign='center'
                    as={ReactRouterLink} 
                    to='/new-metrics'>
                    Attach Metrics to a Business
                </ChakraLink>
                <ChakraLink
                    w='250px'
                    textAlign='center'
                    as={ReactRouterLink} 
                    to='/deal-table'>
                    Deal Box
                </ChakraLink>
                <MainDropdownMenu />
            </HStack>
        </>
    )
}

export default Toolbar;