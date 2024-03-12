import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text } from '@chakra-ui/react';
import Navbar from './Navbar';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:9000/profile', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  return (

    <Box>
      <Navbar />
      <Box mt={8} mx="auto" maxW="container.sm" p={4} borderWidth="1px" borderRadius="md">
        <Heading as="h1" size="xl" mb={4}>User Profile</Heading>
        {userData ? (
          <Box>
            <Text fontSize="lg"><strong>Name:</strong> {userData.name}</Text>
            <Text fontSize="lg"><strong>Email:</strong> {userData.email}</Text>
            <Text fontSize="lg"><strong>Username:</strong> {userData.username}</Text>
            <Text fontSize="lg"><strong>Role:</strong> {userData.role}</Text>
            {/* Add additional user information here */}
          </Box>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
