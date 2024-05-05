import { Link as ReactRouterLink } from 'react-router-dom'
import { 
    Link as ChakraLink, 
    Stack,
 } from '@chakra-ui/react'



const Main = props => {

    return (
        <>
            <Stack 
                spacing={6} 
                ml='3vw'
                mt='3vh'
                position='absolute'>
                <ChakraLink 
                    w='250px'
                    border='3px solid'
                    borderRadius='4px'
                    as={ReactRouterLink} 
                    to='/new-deal-box'
                    textAlign='center'>
                    Create a deal box
                </ChakraLink>
                <ChakraLink 
                    w='250px'
                    border='3px solid'
                    borderRadius='4px'
                    textAlign='center'
                    as={ReactRouterLink} 
                    to='/new-business'>
                    Create a business
                </ChakraLink>
                <ChakraLink 
                    w='250px'
                    border='3px solid'
                    borderRadius='4px'
                    textAlign='center'
                    as={ReactRouterLink} 
                    to='/new-metrics'>
                    Attach Metrics to a Business
                </ChakraLink>
                <ChakraLink
                    w='250px'
                    border='3px solid'
                    borderRadius='4px'
                    textAlign='center'
                    as={ReactRouterLink} 
                    to='/deal-table'>
                    Deal Box
                </ChakraLink>
            </Stack>
        </>
    )
}

export default Main;
