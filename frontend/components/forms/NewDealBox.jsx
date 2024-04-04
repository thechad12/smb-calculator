import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { 
  FormControl, 
  FormLabel, 
  Input, 
  CheckboxGroup, 
  Checkbox, 
  Button 
} from "@chakra-ui/react";

const API_BASE_URL = 'http://localhost:8000/actions';

function NewDealBox() {
  const [formData, setFormData] = useState({
    name: '',
    valuation_low: 0,
    valuation_high: 0,
    revenue_low: 0,
    revenue_high: 0,
    cashflow_low: 0,
    cashflow_high: 0,
    ask_price_low: 0,
    ask_price_high: 0,
    margin: 0,
    sector: '',
    seller_type: '',
    geography: '',
    scale: 0,
    advantages: '',
    multiple_low: 0,
    multiple_high: 0,
    investor: true,
  });

  const createDealBox = async (data) => {
    // Adjust list-type fields
    const adjustedData = {
      ...data,
      sector: data.sector ? data.sector.split(';') : [],
      geography: data.geography ? data.geography.split(';') : [],
      advantages: data.advantages ? data.advantages.split(';') : []
    };

    const response = await fetch(`${API_BASE_URL}/add_deal_box`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adjustedData)
    });
    const responseData = await response.json();
    return responseData;
  };

  const { mutate: createDealBoxMutation, isLoading: isCreatingDealBox } = useMutation(createDealBox, {
    onSuccess: () => {
      alert('Deal Box added successfully');
      setFormData({
        name: '',
        valuation_low: 0,
        valuation_high: 0,
        revenue_low: 0,
        revenue_high: 0,
        cashflow_low: 0,
        cashflow_high: 0,
        ask_price_low: 0,
        ask_price_high: 0,
        margin: 0,
        sector: '',
        seller_type: '',
        geography: '',
        scale: 0,
        advantages: '',
        multiple_low: 0,
        multiple_high: 0,
        investor: true,
      });
    }
  });

  const handleCheckboxChange = (name, checked) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createDealBoxMutation(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      </FormControl>
      <FormControl id="valuation_low">
        <FormLabel>Valuation Low</FormLabel>
        <Input type="number" name="valuation_low" value={formData.valuation_low} onChange={handleChange} placeholder="Valuation Low" />
      </FormControl>
      <FormControl id="valuation_high">
        <FormLabel>Valuation High</FormLabel>
        <Input type="number" name="valuation_high" value={formData.valuation_high} onChange={handleChange} placeholder="Valuation High" />
      </FormControl>
      <FormControl id="cashflow_low">
        <FormLabel>Cashflow Low</FormLabel>
        <Input type="number" name="cashflow_low" value={formData.cashflow_low} onChange={handleChange} placeholder="Cashflow Low" />
      </FormControl>
      <FormControl id="cashflow_high">
        <FormLabel>Cashflow High</FormLabel>
        <Input type="number" name="cashflow_high" value={formData.cashflow_high} onChange={handleChange} placeholder="Cashflow High" />
      </FormControl>
      <FormControl id="ask_price_low">
        <FormLabel>Ask Price Low</FormLabel>
        <Input type="number" name="ask_price_low" value={formData.ask_price_low} onChange={handleChange} placeholder="Ask Price Low" />
      </FormControl>
      <FormControl id="ask_price_high">
        <FormLabel>Ask Price High</FormLabel>
        <Input type="number" name="ask_price_high" value={formData.ask_price_high} onChange={handleChange} placeholder="Ask Price High" />
      </FormControl>
      <FormControl id="revenue_low">
        <FormLabel>Revenue Low</FormLabel>
        <Input type="number" name="revenue_low" value={formData.revenue_low} onChange={handleChange} placeholder="Revenue Low" />
      </FormControl>
      <FormControl id="revenue_high">
        <FormLabel>Revenue High</FormLabel>
        <Input type="number" name="revenue_high" value={formData.revenue_high} onChange={handleChange} placeholder="Revenue High" />
      </FormControl>
      <FormControl id="profit_low">
        <FormLabel>Profit Low</FormLabel>
        <Input type="number" name="profit_low" value={formData.profit_low} onChange={handleChange} placeholder="Profit Low" />
      </FormControl>
      <FormControl id="profit_high">
        <FormLabel>Profit High</FormLabel>
        <Input type="number" name="profit_high" value={formData.profit_high} onChange={handleChange} placeholder="Profit High" />
      </FormControl>
      <FormControl id="margin">
        <FormLabel>Margin</FormLabel>
        <Input type="number" name="margin" value={formData.margin} onChange={handleChange} placeholder="Margin" />
      </FormControl>
      <FormControl id="sector">
        <FormLabel>Sector</FormLabel>
        <Input type="text" name="sector" value={formData.sector} onChange={handleChange} placeholder="Sector (semicolon-separated)" />
      </FormControl>
      <FormControl id="seller_type">
        <FormLabel>Seller Type</FormLabel>
        <Input type="text" name="seller_type" value={formData.seller_type} onChange={handleChange} placeholder="Seller Type" />
      </FormControl>
      <FormControl id="geography">
        <FormLabel>Geography</FormLabel>
        <Input type="text" name="geography" value={formData.geography} onChange={handleChange} placeholder="Geography (semicolon-separated)" />
      </FormControl>
      <FormControl id="scale">
        <FormLabel>Scale</FormLabel>
        <Input type="number" name="scale" value={formData.scale} onChange={handleChange} placeholder="Scale" />
      </FormControl>
      <FormControl id="advantages">
        <FormLabel>Advantages</FormLabel>
        <Input type="text" name="advantages" value={formData.advantages} onChange={handleChange} placeholder="Advantages (semicolon-separated)" />
      </FormControl>
      <CheckboxGroup colorScheme="green" value={formData.investor} onChange={checked => handleCheckboxChange('investor', checked)}>
        <FormControl id="investor">
          <Checkbox name="investor">Investor</Checkbox>
        </FormControl>
      </CheckboxGroup>
      <FormControl id="multiple_low">
        <FormLabel>Multiple Low</FormLabel>
        <Input type="number" name="multiple_low" value={formData.multiple_low} onChange={handleChange} placeholder="Multiple Low" />
      </FormControl>
      <FormControl id="multiple_high">
        <FormLabel>Multiple High</FormLabel>
        <Input type="number" name="multiple_high" value={formData.multiple_high} onChange={handleChange} placeholder="Multiple High" />
      </FormControl>
      <Button type="submit" isLoading={isCreatingDealBox}>Add Deal Box</Button>
    </form>
  );
}

export default NewDealBox;