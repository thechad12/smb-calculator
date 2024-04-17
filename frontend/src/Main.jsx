import { Link as ReactRouterLink } from 'react-router-dom'
import { 
    Link as ChakraLink, 
    HStack,
 } from '@chakra-ui/react'



const Main = props => {

    return (
        <>
            <HStack 
                spacing={6} 
                ml='25vw'
                mt='3vh'
                position='absolute'>
                <ChakraLink as={ReactRouterLink} to='/new-deal-box'>
                    Create a deal box
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/new-business'>
                    Create a business
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/new-metrics'>
                    Attach Metrics to a Business
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/deal-table'>
                    Deal Box
                </ChakraLink>
            </HStack>
        </>
    )
}

export default Main;
