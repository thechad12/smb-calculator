import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";

const API_BASE_URL = 'http://localhost:8000/actions';

function NewBusiness() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    biz_type: ''
  });

  const createBusiness = async (data) => {
    const response = await fetch(`${API_BASE_URL}/add_business`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return responseData;
  };

  const { mutate: createBusinessMutation, isLoading: isCreatingBusiness } = useMutation(createBusiness, {
    onSuccess: () => {
      alert('Business added successfully');
      setFormData({
        name: '',
        location: '',
        description: '',
        biz_type: ''
      });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBusinessMutation(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      </FormControl>
      <FormControl id="location">
        <FormLabel>Location</FormLabel>
        <Input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
      </FormControl>
      <FormControl id="description">
        <FormLabel>Description</FormLabel>
        <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      </FormControl>
      <FormControl id="biz_type">
        <FormLabel>Business Type</FormLabel>
        <Input type="text" name="biz_type" value={formData.biz_type} onChange={handleChange} placeholder="Business Type" />
      </FormControl>
      <Button type="submit" isLoading={isCreatingBusiness}>Add Business</Button>
    </form>
  );
}

export default NewBusiness;