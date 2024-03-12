import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Link, VStack, Spinner } from '@chakra-ui/react';

const Login = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://idea-clan-backend-r2mh.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        throw new Error(data.message || 'Invalid credentials');
      }
      const { accessToken } = data;
      localStorage.setItem('authToken', accessToken);
      alert('Login successful');
      navigation('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      alert(error.message);
      setLoading(false);
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

            {loading ? (
              <Spinner size="md" color="teal" mt={4} />
            ) : (
              <Button mt={4} colorScheme="teal" type="submit">
                Login
              </Button>
            )}

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
