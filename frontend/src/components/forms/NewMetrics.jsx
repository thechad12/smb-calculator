import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import EditableTable from '../tables/EditableTable';
import { 
    Alert,
    AlertIcon,
    Select,
} from "@chakra-ui/react";
import Toolbar from '../display/Toolbar';
import { blankRowFromEmptyData } from '../../utils/format';

const API_BASE_URL = 'http://localhost:8000/';

function NewMetrics() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [metricData, setMetricData] = useState([]);
  const [success, setSuccess] = useState(false);

  const [columns, setColumns] = useState([
    {headerName: 'Cashflow', field: 'cashflow', editable: true},
    {headerName: 'Ask Price', field: 'ask_price', editable: true},
    {headerName: 'Gross Revenue', field: 'gross_revenue', editable: true},
    {headerName: 'EBITDA', field: 'ebitda', editable: true},
    {headerName: 'Valuation', field: 'valuation', editable: true},
    {headerName: 'Sector', field: 'sector', editable: true},
    {headerName: 'Geography', field: 'geography', editable: true},
    {headerName: 'Advantages', field: 'advantages', editable: true},
    {headerName: 'Multiple', field: 'multiple', editable: true},
  ]);

  const fetchBusinesses = async () => {
    const response = await fetch(`${API_BASE_URL}get_businesses`);
    const data = await response.json();
    setBusinesses(data);
  };

  const fetchBusinessMetrics = async () => {
    const response = await fetch(`${API_BASE_URL}get_business_metrics/${selectedBusiness}`);
    const data = await response.json();
    setMetricData(blankRowFromEmptyData(columns, data));
  }

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    if (selectedBusiness) {
      fetchBusinessMetrics();
    }
  }, [selectedBusiness]);

  const createMetrics = async (data) => {
    const response = await fetch(`${API_BASE_URL}actions/add_business_metrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return responseData;
  };

  const { mutate: createMetricsMutation, isLoading: isCreatingMetrics } = useMutation(createMetrics, {
    onSuccess: () => {
      setSuccess(true);
      fetchBusinesses();
      fetchBusinessMetrics();
    }
  });


  return (
    <>
      <Toolbar/>
      {success && (
          <Alert status='success'>
            <AlertIcon />
            Metrics uploaded to the server. Fire on!
          </Alert>
      )}
      <Select size='md' position='relative' top='10rem'>
        {businesses.map((business) => {
          <option value={business.uid}>{business.name}</option>
        })}
      </Select>  
      <EditableTable 
        columns={columns}
        data={metricData}
        endpoint={createMetricsMutation} />
    </>
  );
}

export default NewMetrics;
