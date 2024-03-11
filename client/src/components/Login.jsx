import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Link, VStack } from '@chakra-ui/react';

const Login = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigation('/dashboard');
    }
  }, [navigation]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://idea-clan-backend-ku4x.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert('Invalid credentials');
        throw new Error('Invalid credentials');
      }
      const data = await response.json();

      const { accessToken } = data;
      console.log('Received token:', accessToken);

      localStorage.setItem('authToken', accessToken);
      alert('Login successfully');
      navigation('/dashboard');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Invalid credentials');
    }
  };

  return (
    <Box>
      <VStack align="center" mt={8}>
        <Heading as="h2" size="xl">User Login</Heading>
        <Box className='login' w="25%" boxShadow='lg' borderRadius={'30px'} p={'20px'} mt='40px'>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter the Email'
              />
            </FormControl>

            <FormControl id="password" isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter the Password'
              />
            </FormControl>

            <Button mt={4} colorScheme="teal" type="submit">
              Login
            </Button>

            <Text mt={4}>
              Don't have an account? <Link href="/signup" textDecoration="underline" colorScheme='blue'>Sign up here</Link>.
            </Text>
          </form>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
