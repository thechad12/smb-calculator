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
import {link} from '../../utils/format';


const BusinessTable = props => {

    const { status, data, error } = GetData('get_businesses');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setLoading(false);
        }
    }, [data])

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
                <TableContainer
                    overflow='scroll'
                    overflowY='scroll'
                    w='75vw' 
                    position='absolute'
                    top='5rem'
                    ml='20rem'>
                    <Table variant='striped'>
                        <TableCaption>Businesses</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Business Name</Th>
                                <Th>Location</Th>
                                <Th>Description</Th>
                                <Th>Business Type</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((item) => {
                                    return (
                                        <Tr>
                                            <Td>{link(item.uid, 'business', item.name)}</Td>
                                            <Td>{item.location}</Td>
                                            <Td>{item.description}</Td>
                                            <Td>{item.biz_type}</Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                    </Table>
                </TableContainer>
        </>
    )
}

export default BusinessTable;