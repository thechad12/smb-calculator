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
        'Valuation',
        'Revenue',
        'Sector',
        'Geography',
        'Scale',
        'Advantages',
        'Investor or Operator',
        'Multiple',
    ];

    const keys = [
        'cashflow',
        'ask_price',
        'valuation',
        'revenue',
        'sector',
        'geography',
        'scale',
        'advantages',
        'investor',
        'multiple',
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
                    <AlertDescription>There was an issue retrieving diligence data</AlertDescription>
                </Alert>
            </>
        )
    }

    return (
        <>
            <Toolbar/>
                <TableContainer 
                    overflow='scroll'
                    overflowY='scroll'
                    w='75vw' 
                    position='absolute'
                    top='5rem'
                    ml='20rem'>
                    <Table variant='striped'>
                        <TableCaption>Diligence on Businesses</TableCaption>
                        <Thead>
                            <Tr>
                                {data.headers.map(header => (
                                    <Th>{header}</Th>
                                ))}
                            </Tr>
                            </Thead>
                            <Tbody>
                                {data.row_data.map(row => (
                                    <Tr>
                                        {row.map(item => (
                                            <Td w='auto'>{item}</Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                    </Table>
                </TableContainer>
        </>
    )
}

export default DealTable;