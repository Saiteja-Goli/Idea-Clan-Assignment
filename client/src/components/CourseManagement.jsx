import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  FormControl,
  FormLabel,
  CloseButton,
  HStack,
  Flex,
  Center,
} from '@chakra-ui/react';
import Navbar from './Navbar';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    prerequisites: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get('https://idea-clan-backend-r2mh.onrender.com/courses', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.post('https://idea-clan-backend-r2mh.onrender.com/courses', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 201) {
        alert('Course created successfully');
        setFormData({
          name: '',
          description: '',
          prerequisites: '',
        });
        fetchCourses(); // Refresh courses after creating a new one
      }
    } catch (error) {
      console.error('Error creating course:', error.message);
      alert('Failed to create course');
    }
  };

  const handleDelete = async (courseId) => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.delete(`https://idea-clan-backend-r2mh.onrender.com/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        alert('Course deleted successfully');
        fetchCourses(); // Refresh courses after deleting
      }
    } catch (error) {
      console.error('Error deleting course:', error.message);
      alert('Failed to delete course');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Navbar />
      <VStack align="center" mt={8}>
        <Heading as="h2" size="xl">Course Management-[Only Admin]</Heading>
        <Box boxShadow={"lg"} width="25%" p='20px' borderRadius={'20px'}>
          <form onSubmit={handleSubmit} w="50%">
            <FormControl>
              <FormLabel>Course Name:</FormLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} mt={4} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description:</FormLabel>
              <Textarea name="description" value={formData.description} onChange={handleChange} mt={2} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Prerequisites:</FormLabel>
              <Input type="text" name="prerequisites" value={formData.prerequisites} onChange={handleChange} mt={2} />
            </FormControl>
            <Button type="submit" colorScheme="teal" mt={4}>Create Course</Button>
          </form>
        </Box>
        <hr></hr>
        <hr></hr>
        <Center><Heading>Courses</Heading></Center>
        <Flex direction="row" flexWrap="wrap" justify="center">

          {courses.map((course) => (
            <Box key={course._id} borderWidth="1px" borderRadius="md" p={4} m={2} width="30%" boxShadow="md">
              <Heading as="h3" size="lg" mb={2}>{course.name}</Heading>
              <Box fontSize="sm" color="gray.600">{course.description}</Box>
              {course.prerequisites && (
                <Box mt={2}>
                  <strong>Prerequisites:</strong> {course.prerequisites}
                </Box>
              )}
              <Button
                mt={4}
                colorScheme="red"
                size="sm"
                onClick={() => handleDelete(course._id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Flex>
      </VStack>
    </Box>
  );
};

export default CourseManagement;
