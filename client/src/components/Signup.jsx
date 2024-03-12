import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Link,
  Text,
  VStack,
  Spinner
} from '@chakra-ui/react';
import axios from 'axios';

const Signup = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: 'admin',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigation('/');
    }
  }, [navigation]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post('https://idea-clan-backend-bhh0.onrender.com/register', formData);
      console.log(response.data);
      alert('Registration successful');
      navigation('/');
    } catch (error) {
      if (error.response.status === 400) {
        alert('Email already registered');
      }
      console.error('Registration failed:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <VStack align="center" mt={8}>
        <Heading as="h2" size="xl">User Register Form</Heading>
        <Box className='login' w="25%" boxShadow='xl' borderRadius={'30px'} p={'20px'} mt='40px'>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter the Name' required />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter the Email' required />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select name="role" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='Enter the Username' required />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter the Password' required />
            </FormControl>

            {loading ? (
              <Spinner size="md" color="teal" mt={4} />
            ) : (
              <Button type="submit" colorScheme="teal" mt={4}>Register</Button>
            )}

            <Text mt={2}>
              If you have an account? <Link href="/" textDecoration='underline'>Login here</Link>.
            </Text>
          </form>
        </Box>
      </VStack>
    </>
  );
};

export default Signup;
