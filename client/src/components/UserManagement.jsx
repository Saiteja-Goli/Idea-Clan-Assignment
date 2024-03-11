import React, { useState, useEffect } from 'react';
import { Box, Heading, UnorderedList, ListItem, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import Navbar from './Navbar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://idea-clan-backend-ku4x.onrender.com/profile');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box>
  <Navbar />
  <VStack align="center" mt={8}>
    <Heading as="h2" size="xl">User Management</Heading>
    <Heading as="h3" size="lg" mt={4}>Students:</Heading>
    <UnorderedList mt={4} styleType="none" w="50%">
      {users.map(student => (
        <ListItem key={student._id} p={2} borderWidth="1px" borderRadius="md" w="100%">
          <Text>{student.name} - {student.email}</Text>
        </ListItem>
      ))}
    </UnorderedList>
  </VStack>
</Box>
  );
};

export default UserManagement;
