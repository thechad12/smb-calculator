import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
import {GetData} from '../../utils/api';
import Toolbar from '../display/Toolbar';


const DealTable = props => {

    const { isLoading, error, data, fetchError } = GetData('data/comp_deal_box');

    const metrics = [
        'Cashflow',
        'Ask Price',
        'Gross Revenue',
        'Valuation',
        'Revenue',
        'Sector',
        'Geography',
        'Scale',
        'Advantages',
        'Investor or Operator',
        'Multiple',
    ];

    if (isLoading && !data) {
        return (
            <Spinner size='xl' />
        )
    }

    if (error || fetchError) {
        console.log(error);
        console.log(fetchError);
        return (
            <>
                <Alert status='warning'>
                    <AlertIcon />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>There was an issue retrieving data</AlertDescription>
                </Alert>
            </>
        )
    }

    if ((!data && !isLoading) || (!isLoading && data.length == 0)) {
        return (
            <>
            <Alert status='info'>
                <AlertIcon />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>There is currently no data.</AlertDescription>
            </Alert>
        </>
        )
    }

    return (
        <>
            <Toolbar/>
            <TableContainer>
                <Table variant='striped'>
                    <TableCaption>Current Employee List</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Metrics</Th>
                            <Th>Deal Box</Th>
                            {data.map((item) => {
                                <Th>{item.biz_name}</Th>
                            })}
                        </Tr>
                        </Thead>
                        <Tbody>
                            {metrics.map( metric => {
                                return (
                                    <Tr>
                                        <Td>{metric}</Td>
                                    </Tr>
                                )
                            })}
                            {data.map((item) => {
                                if (!item.is_deal_box) {
                                    return (
                                        <Tr>
                                            <Td>{item.cashflow}</Td>
                                            <Td>{item.ask_price}</Td>
                                            <Td>{item.gross_revenue}</Td>
                                            <Td>{item.valuation}</Td>
                                            <Td>{item.revenue}</Td>
                                            <Td>{item.sector}</Td>
                                            <Td>{item.geography}</Td>
                                            <Td>{item.scale}</Td>
                                            <Td>{item.advantages}</Td>
                                            <Td>{item.investor}</Td>
                                            <Td>{item.multiple}</Td>
                                        </Tr>
                                    )
                                } else {
                                    return (
                                        <Tr>
                                            <Td>{item.cashflow}</Td>
                                            <Td>{item.ask_price}</Td>
                                            <Td>{item.revenue}</Td>
                                            <Td>{item.valuation}</Td>
                                            <Td>{item.profit}</Td>
                                            <Td>{item.sector}</Td>
                                            <Td>{item.geography}</Td>
                                            <Td>{item.scale}</Td>
                                            <Td>{item.advantages}</Td>
                                            <Td>{item.investor}</Td>
                                            <Td>{item.multiple}</Td>
                                        </Tr>
                                    )
                                }
                            })}
                        </Tbody>
                </Table>
            </TableContainer>   
        </>
    )
}

export default DealTable;