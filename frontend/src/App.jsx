import Main from './Main';
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
import DealTable from './components/tables/DealTable';
import NewDealBox from './components/forms/NewDealBox';
import NewMetrics from './components/forms/NewMetrics';
import NewBusiness from './components/forms/NewBusiness';

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
    {
        path: "/new-deal-box",
        element: (
            <NewDealBox />
        )
    },
    {
        path: "/new-business",
        element: (
            <NewBusiness />
        )
    },
    {
        path: "/new-metrics",
        element: (
            <NewMetrics />
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
