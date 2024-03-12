import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Heading, Button, Center, VStack, Text, SimpleGrid, HStack } from '@chakra-ui/react';
import axios from 'axios';
import Navbar from './Navbar';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [lectures, setLectures] = useState([]);

  const [token, setToken] = useState('');
  const navigation = useNavigate();


  const handleCourseSelection = () => {
    navigation('/course-selection');
  };

  const handleProfileView = () => {
    navigation('/profile');
  };


  useEffect(() => {
    const checkToken = () => {
      let homeCheck = window.location.href.split("/");
      console.log("Auth token:", localStorage.getItem('authToken'));
      console.log("Home check:", homeCheck[3]);

      const storedToken = localStorage.getItem("authToken");

      if (!storedToken) {
        console.log('Token not found');
        navigation('/');
        return;
      }

      try {
        const decodedToken = jwtDecode(storedToken);
        console.log("Decoded token:", decodedToken);

        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          console.log('Token has expired');
          localStorage.removeItem('authToken');
          navigation('/');
        } else {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('authToken');
        navigation('/');
      }
    };

    checkToken();
  }, [navigation]);



  useEffect(() => {
    fetchLectures();
  }, []);

  //Fetching All Lectures
  const fetchLectures = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      console.log("Authorization Token:", authToken);
      const response = await axios.get('https://idea-clan-backend-r2mh.onrender.com/lectures', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log("Response Data:", response.data);
      setLectures(response.data.lectures);
    } catch (error) {
      console.error('Error fetching lectures:', error.message);
    }
  };

  return (
    <Box>
      <HStack>
        <Navbar />
      </HStack>
      <Center>
        <Text size="xl" mt='5'>
          Welcome to Dashboard
        </Text>
      </Center>
      <VStack spacing={8} mt={1}>
      </VStack>
      <Center>
        <Box mt={1} w="80%">
          <Center>
            <Heading as="h1" size="xl" mb={4} color="teal.500">
              Lectures
            </Heading>
          </Center>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {lectures.map((lecture) => (
              <Box key={lecture._id} p={6} borderWidth="1px" borderRadius="md">
                <Heading as="h3" size="lg" mb={2}>
                  {lecture.title}
                </Heading>
                <Text fontSize="md" mb={2}>
                  <Text as="span" fontWeight="bold">Course ID:</Text>
                  <Text as="span" ml={1}>{lecture.courseId}</Text>
                </Text>
                <Text fontSize="md" mb={2}>
                  <Text as="span" fontWeight="bold">Description:</Text>
                  <Text as="span" ml={1}>{lecture.description}</Text>
                </Text>

                <Text fontSize="md" mb={2}>
                  <Text as="span" fontWeight="bold">Time:</Text>
                  <Text as="span" ml={1}>{new Date(lecture.startTime).toLocaleDateString()} at {new Date(lecture.startTime).toLocaleTimeString()} - {new Date(lecture.endTime).toLocaleTimeString()}</Text>
                </Text>

                <Button colorScheme="teal" onClick={() => window.open(lecture.meetingLink, '_blank')} mb={2}>
                  Join Meeting
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Center>
    </Box>

  );
};

export default Dashboard;
