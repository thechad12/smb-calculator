import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import EditableTable from '../tables/EditableTable';
import { 
    Alert,
    AlertIcon,
    Select,
} from "@chakra-ui/react";
import Toolbar from '../display/Toolbar';

const API_BASE_URL = 'http://localhost:8000/';

function NewMetrics() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [metricData, setMetricData] = useState([]);
  const [success, setSuccess] = useState(false);

  const columns = useState([
    {headerName: 'Cashflow', field: 'cashflow'},
    {headerName: 'Ask Price', field: 'ask_price'},
    {headerName: 'Gross Revenue', field: 'gross_revenue'},
    {headerName: 'EBITDA', field: 'ebitda'},
    {headerName: 'Valuation', field: 'valuation'},
    {headerName: 'Sector', field: 'sector'},
    {headerName: 'Geography', field: 'geography'},
    {headerName: 'Advantages', field: 'advantages'},
    {headerName: 'Multiple', field: 'multiple'},
  ]);

  const fetchBusinesses = async () => {
    const response = await fetch(`${API_BASE_URL}get_businesses`);
    const data = await response.json();
    setBusinesses(data);
  };

  const fetchBusinessMetrics = async () => {
    const response = await fetch(`${API_BASE_URL}get_business_metrics/${selectedBusiness}`);
    const data = await response.json();
    setMetricData[data];
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
