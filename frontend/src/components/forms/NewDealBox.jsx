import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { 
  Button 
} from "@chakra-ui/react";
import EditableTable from '../tables/EditableTable';

const API_BASE_URL = 'http://localhost:8000/actions';

function NewDealBox() {

  const columns = useMemo(() => [
    {name: 'Name', id: 'name'},
    {name: 'Valuation', id: 'valuation'},
    {name: 'Gross Revenue', id: 'gross_revenue'},
    {name: 'Cashflow', id: 'cashflow'},
    {name: 'Ask Price', id: 'ask_price'},
    {name: 'Margin', id: 'margin'},
    {name: 'Sector', id: 'sector'},
    {name: 'Geography', id: 'geography'},
    {name: 'Advantages', id: 'advantages'},
    {name: 'Multiple', id: 'multiple'},
    {name: 'Investor', id: 'investor'},
    {name: 'Scale', id: 'scale'},
  ]);

  const createDealBox = async (data) => {
    // Adjust list-type fields
    const adjustedData = {
      ...data,
      cashflow_low: data.cashflow ? data.cashflow.split('-')[0] : 0,
      cashflow_high: data.cashflow ? data.cashflow.split('-')[1] : 0,
      valuation_low: data.valuation ? data.valuation.split('-')[0] : 0,
      valuation_high: data.valuation ? data.valuation.split('-')[1] : 0,
      ask_price_low: data.ask_price ? data.ask_price.split('-')[0] : 0,
      ask_price_high: data.ask_price ? data.ask_price.split('-')[1] : 0,
      revenue_low: data.revenue ? data.revenue.split('-')[0] : 0,
      revenue_high: data.revenue ? data.revenue.split('-')[1] : 0,
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
    }
  });


  return (
    <EditableTable 
      columns={columns}/>
  );
}

export default NewDealBox;