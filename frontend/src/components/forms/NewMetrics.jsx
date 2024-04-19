import React, { useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useTable } from 'react-table';
import { 
    FormControl, 
    FormLabel, 
    Input, 
    Select, 
    Checkbox, 
    CheckboxGroup, 
    Button 
} from "@chakra-ui/react";

const API_BASE_URL = 'http://localhost:8000/';

function NewMetrics() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [editRowId, setEditRowId] = useState(null);

  const handleEditClick = rowId => {
    setEditRowId(rowId);
  }

  const columns = useMemo(() => [
    {Header: 'Cashflow', accessor: 'cashflow'},
    {Header: 'Ask Price', accessor: 'ask_price'},
    {Header: 'Gross Revenue', accessor: 'gross_revenue'},
    {Header: 'EBITDA', accessor: 'ebitda'},
    {Header: 'Valuation', accessor: 'valuation'},
    {Header: 'Sector', accessor: 'sector'},
    {Header: 'Geography', accessor: 'geography'},
    {Header: 'Advantages', accessor: 'advantages'},
    {Header: 'Multiple', accessor: 'multiple'},
  ]);

  const [formData, setFormData] = useState({
    business_uid: '',
    cashflow: '',
    ask_price: '',
    gross_revenue: '',
    ebitda: '',
    valuation: '',
    revenue: '',
    sector: '',
    geography: '',
    scale: '',
    advantages: '',
    investor: false,
    multiple: ''
  });

  const fetchBusinesses = async () => {
    const response = await fetch(`${API_BASE_URL}data/get_businesses`);
    const data = await response.json();
    setBusinesses(data);
  };

  const fetchBusinessMetrics = async () => {
    const response = await fetch(`${API_BASE_URL}data/get_business_metrics/${selectedBusiness}`);
    const data = await response.json();
  }

  useEffect(() => {
    fetchBusinesses();
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
      setFormData({
        business_uid: '',
        cashflow: '',
        ask_price: '',
        gross_revenue: '',
        ebitda: '',
        valuation: '',
        revenue: '',
        sector: '',
        geography: '',
        scale: '',
        advantages: '',
        investor: false,
        multiple: ''
      });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedBusiness(value);
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMetricsMutation(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="business_uid" isRequired>
        <FormLabel>Select Business</FormLabel>
        <Select name="business_uid" value={formData.business_uid} onChange={handleChange} placeholder="Select Business">
          {businesses.map(business => (
            <option key={business.uid} value={business.uid}>{business.name}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl id="cashflow">
        <FormLabel>Cashflow</FormLabel>
        <Input type="number" name="cashflow" value={formData.cashflow} onChange={handleChange} placeholder="Cashflow" />
      </FormControl>
      <FormControl id="ask_price">
        <FormLabel>Ask Price</FormLabel>
        <Input type="number" name="ask_price" value={formData.ask_price} onChange={handleChange} placeholder="Ask Price" />
      </FormControl>
      <FormControl id="gross_revenue">
        <FormLabel>Gross Revenue</FormLabel>
        <Input type="number" name="gross_revenue" value={formData.gross_revenue} onChange={handleChange} placeholder="Gross Revenue" />
      </FormControl>
      <FormControl id="ebitda">
        <FormLabel>EBITDA</FormLabel>
        <Input type="number" name="ebitda" value={formData.ebitda} onChange={handleChange} placeholder="EBITDA" />
      </FormControl>
      <FormControl id="valuation">
        <FormLabel>Valuation</FormLabel>
        <Input type="number" name="valuation" value={formData.valuation} onChange={handleChange} placeholder="Valuation" />
      </FormControl>
      <FormControl id="revenue">
        <FormLabel>Revenue</FormLabel>
        <Input type="number" name="revenue" value={formData.revenue} onChange={handleChange} placeholder="Revenue" />
      </FormControl>
      <FormControl id="sector">
        <FormLabel>Sector</FormLabel>
        <Input type="text" name="sector" value={formData.sector} onChange={handleChange} placeholder="Sector" />
      </FormControl>
      <FormControl id="geography">
        <FormLabel>Geography</FormLabel>
        <Input type="text" name="geography" value={formData.geography} onChange={handleChange} placeholder="Geography" />
      </FormControl>
      <FormControl id="scale">
        <FormLabel>Scale</FormLabel>
        <Input type="number" name="scale" value={formData.scale} onChange={handleChange} placeholder="Scale" />
      </FormControl>
      <FormControl id="advantages">
        <FormLabel>Advantages</FormLabel>
        <Input type="text" name="advantages" value={formData.advantages} onChange={handleChange} placeholder="Advantages" />
      </FormControl>
      <CheckboxGroup colorScheme="green" value={formData.investor} onChange={checked => handleCheckboxChange('investor', checked)}>
        <FormControl id="investor">
          <Checkbox name="investor">Investor</Checkbox>
        </FormControl>
      </CheckboxGroup>
      <FormControl id="multiple">
        <FormLabel>Multiple</FormLabel>
        <Input type="number" name="multiple" value={formData.multiple} onChange={handleChange} placeholder="Multiple" />
      </FormControl>
      <Button type="submit" isLoading={isCreatingMetrics}>Add Metrics</Button>
    </form>
  );
}

export default NewMetrics;
