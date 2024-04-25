import React, { useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import EditableTable from '../tables/EditableTable';
import { 
    Button 
} from "@chakra-ui/react";

const API_BASE_URL = 'http://localhost:8000/';

function NewMetrics() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [metricData, setMetricData] = useState([]);

  const columns = useMemo(() => [
    {name: 'Cashflow', id: 'cashflow'},
    {name: 'Ask Price', id: 'ask_price'},
    {name: 'Gross Revenue', id: 'gross_revenue'},
    {name: 'EBITDA', id: 'ebitda'},
    {name: 'Valuation', id: 'valuation'},
    {name: 'Sector', id: 'sector'},
    {name: 'Geography', id: 'geography'},
    {name: 'Advantages', id: 'advantages'},
    {name: 'Multiple', id: 'multiple'},
  ]);

  const fetchBusinesses = async () => {
    const response = await fetch(`${API_BASE_URL}data/get_businesses`);
    const data = await response.json();
    setBusinesses(data);
  };

  const fetchBusinessMetrics = async () => {
    const response = await fetch(`${API_BASE_URL}data/get_business_metrics/${selectedBusiness}`);
    const data = await response.json();
    setMetricData[data];
  }

  useEffect(() => {
    fetchBusinesses();
    fetchBusinessMetrics();
  }, []);

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
      alert('Metrics added successfully');
    }
  });


  return (
    <>
      <Button onClick={createMetricsMutation}>Save New Metrics</Button>
      <EditableTable 
        columns={columns}
        data={metricData} />
    </>
  );
}

export default NewMetrics;
