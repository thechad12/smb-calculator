import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'



const Main = props => {

    return (
        <>
            <ChakraLink as={ReactRouterLink} to='/new-deal-box'>
                Create a deal box
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to='/new-business'>
                Create a business and metrics
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to='/deal-table'>
                Deal Box
            </ChakraLink>
        </>
    )
}

export default Main;
