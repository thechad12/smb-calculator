import React, {useState, useEffect} from 'react';
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

    const { status, data, error } = GetData('comp_deal_box');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setLoading(false);
        }
    }, [data]);

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

    if (loading) {
        return (
            <>
                <Toolbar/>
                <Spinner size='xl' 
                    position='absolute'
                    top='5rem' 
                    left='45rem'/>
            </>
        )
    }

    if (error) {
        console.log(error);
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

    return (
        <>
            <Toolbar/>
            <div className='table-container'>
                <TableContainer>
                    <Table variant='striped'>
                        <TableCaption>Diligence on Businesses</TableCaption>
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
            </div>  
        </>
    )
}

export default DealTable;