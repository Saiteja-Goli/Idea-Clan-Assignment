import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Button, VStack, Checkbox, Stack } from '@chakra-ui/react';
import Navbar from './Navbar';

const CourseSelection = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userInfo, setUserInfo] = useState(null); // Store user information fetched from the backend
  const navigation = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetching All Courses with Authentication
  const fetchCourses = async () => {
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.get('http://localhost:9000/courses', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCourses(response.data.courses);
      setUserRole(response.data.userRole); // Assuming userRole is provided in the response
    } catch (error) {
      console.error('Error fetching courses:', error.message);
    }
  };

  const handleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else if (selectedCourses.length < 3) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:9000/select-courses',
        { courses: selectedCourses },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      console.log('Response:', response.data);
      alert("Courses selected successfully");
      navigation('/dashboard');
    } catch (error) {
      console.error('Error selecting courses:', error);
      if (error.response) {
        alert("Already Selected Courses");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box>
      <Navbar />
      <VStack align="center" mt={8}>
        <Heading as="h1" size="xl">Course Selection</Heading>
        <Heading as="h3" size="lg" mt={4}>Select Three Courses:</Heading>
        {courses.length === 0 ? (
          <Heading as="h4" size="md" mt={4}>No courses available</Heading>
        ) : (
          <Stack mt={4} spacing={2}>
            {courses.map((course) => (
              <Checkbox
                key={course._id}
                isChecked={selectedCourses.includes(course._id)}
                onChange={() => handleCourseSelection(course._id)}
                colorScheme="green"
                isDisabled={userInfo && userInfo.selectedCourses.includes(course._id)}
              >
                {userInfo && userInfo.selectedCourses.includes(course._id) ? 'Already Selected' : course.name}
              </Checkbox>
            ))}
          </Stack>
        )}
        <Button colorScheme="teal" mt={4} onClick={handleSubmit} disabled={selectedCourses.length !== 3 || loading} borderRadius="md">
          {loading ? 'Submitting...' : 'Submit Selection'}
        </Button>
      </VStack>
    </Box>
  );
};

export default CourseSelection;