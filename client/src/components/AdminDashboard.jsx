import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Input, UnorderedList, ListItem, VStack, Text, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('https://idea-clan-backend-1.onrender.com/analytics', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error.message);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Box>
      <Navbar />
      <VStack align="center" mt={8}>
        <Heading as="h1" size="xl">Admin Dashboard</Heading>
        {analytics && (
          <>
            {analytics.students && (
              <Box mt={8} w="50%">
                <Heading as="h3" size="lg">Students:</Heading>
                <Table variant="simple" mt={4}>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Courses</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {analytics.students.map((student) => (
                      <Tr key={student._id}>
                        <Td>{student.name}</Td>
                        <Td>{student.email}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>

            )}
            <Box mt={8} w="50%">
              <Heading as="h3" size="lg">Courses:</Heading>
              <Table variant="simple" mt={4}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {analytics.courses.map((course) => (
                    <Tr key={course._id}>
                      <Td>{course.name}</Td>
                      <Td>{course.description}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

          </>
        )}
      </VStack>
    </Box>
  );
};

export default AdminDashboard;
