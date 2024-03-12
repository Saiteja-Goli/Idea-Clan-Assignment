import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Center } from '@chakra-ui/react';
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState();
  const navigation = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigation('/login');
    }

    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('https://idea-clan-backend-r2mh.onrender.com/analytics', {
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
  }, [navigation]);

  return (
    <Box>
      <Navbar />
      <Box mt={8}>
        <Center>
          <Heading as="h1" size="xl">Admin Dashboard</Heading>
        </Center>
        {analytics && (
          <>
            {analytics.msg ? (
              <Box mt={8}>
                <Center>
                  <Heading as="h3" size="lg">Not Authorised</Heading>
                </Center>
              </Box>
            ) : (
              <>
                {analytics.students && (
                  <Box mt={8} w="50%">
                    <Heading as="h3" size="lg">Students:</Heading>
                    <Table variant="simple" mt={4}>
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Email</Th>
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

                {analytics.courses && (
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
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
