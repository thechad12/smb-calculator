import {
    Table,
    Thead,
    Tbody,
    Tfoot,
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
  import { GetData } from '../../utils/api';


const DealTable = props => {

    const { isLoading, error, data, fetchError } = GetData('data/comp_deal_box');

    if (isLoading && !data) {
        return (
            <Spinner size='xl' />
        )
    }

    if (error || fetchError) {
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
            <TableContainer>
                <Table variant='striped'>
                    <TableCaption>Current Employee List</TableCaption>
                    <Thead>
                        <Tr>
                            {data.map((item) => {
                                <Th>{item.biz_name}</Th>
                            })}
                        </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((item) => {
                                if (!item.is_deal_box) {
                                    return (
                                        <Tr>
                                            <Td>{item.deal_box}</Td>
                                            <Td>{item.email}</Td>
                                            <Td>{item.department}</Td>
                                            <Td>{item.job_level}</Td>
                                            <Td>{item.manager}</Td>
                                            <Td>{item.worker_type}</Td>
                                            <Td>{item.employee_type}</Td>
                                            <Td>{item.hire_date}</Td>
                                            <Td>{item.bp_type}</Td>
                                            <Td>{item.termination_date}</Td>
                                            <Td>
                                                <Button 
                                                    colorScheme='blackAlpha'>
                                                        Expire Blackout
                                                </Button>
                                            </Td>
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