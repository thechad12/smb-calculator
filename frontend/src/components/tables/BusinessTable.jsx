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


const DealTable = props => {

    const { isLoading, error, data, fetchError } = GetData('data/get_businesses');

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

export default DealTable;