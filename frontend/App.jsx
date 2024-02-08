import Main from './components/Main';
import DealTable from './components/tables/DealTable';
import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from 'react-router-dom';

const router = createBrowserRouter(
    {
        path: "/",
        element: (
            <Main />
        )
    },
    {
        path: "/deal-box",
        element: (
            <DealTable />
        )
    },
)

const App = () => {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
