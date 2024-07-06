import Main from './Main';
import theme from './theme';
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
import Portfolio from './components/pages/Portfolio';
import DealTable from './components/tables/DealTable';
import NewDealBox from './components/forms/NewDealBox';
import NewMetrics from './components/forms/NewMetrics';
import NewBusiness from './components/forms/NewBusiness';
import BusinessTable from './components/tables/BusinessTable';
import BusinessProfile from './components/pages/BusinessProfile';

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Main />
        )
    },
    {
        path: "/business-diligence",
        element: (
            <DealTable />
        )
    },
    {
        path: "/new-business-diligence",
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
    {
        path: "/businesses",
        element: (
            <BusinessTable />
        )
    },
    {
        path: "/business/:id",
        element: (
            <BusinessProfile />
        )
    },
    {
        path: "/portfolio/:id",
        element: (
            <Portfolio />
        )
    },
]);

const App = () => {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
