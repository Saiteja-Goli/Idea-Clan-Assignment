import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigation = useNavigate();
  
  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    localStorage.clear();
    console.log('Successfully logged out');
    alert('Successfully logged out');
    navigation('/');
  };

  return (
    <Box width="90%" mx="auto">
      <Box bg="teal.500" height={16} color="white" borderBottom="1px solid" borderColor="teal.600">
        <Flex justify="space-between" alignItems="center" maxWidth="1200px" mx="auto" px={4} py={2}>
          <Flex align="center" gap={10}>
            <Link to="/dashboard" mr={4} _hover={{ textDecoration: 'none' }} fontSize="md">Dashboard</Link>
            <Link to="/course-selection" mr={4} _hover={{ textDecoration: 'none' }} fontSize="md">Courses</Link>
            <Link to="/admin/lectures" mr={4} _hover={{ textDecoration: 'none' }} fontSize="md">Lecture Management</Link>
            <Link to="/admin/courses" _hover={{ textDecoration: 'none' }} fontSize="md">Course Creation</Link>
            <Link to="/admin/dashboard" mr={4} _hover={{ textDecoration: 'none' }} fontSize="md">Admin Dashboard</Link>
            {/* <Link to="/admin/users" mr={4} _hover={{ textDecoration: 'none' }} fontSize="md">User Management</Link> */}
            <Link to="/profile" mr={4} _hover={{ textDecoration: 'none' }} fontSize="md">Profile</Link>
          </Flex>
          <Button colorScheme="red" size="md" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;
