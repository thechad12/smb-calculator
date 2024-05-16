import { Link as ReactRouterLink } from 'react-router-dom'
import { 
    Link as ChakraLink, 
    HStack,
 } from '@chakra-ui/react';

const Toolbar = props => {
    return (
        <>
            <HStack 
                spacing={8} 
                ml='7vw'
                mt='10vh'
                bg='blue.500'
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
            </HStack>
        </>
    )
}

export default Toolbar;