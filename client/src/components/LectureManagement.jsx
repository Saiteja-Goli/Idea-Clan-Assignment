// LectureManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Input, Button, Textarea, Text, SimpleGrid, HStack, VStack, Center } from '@chakra-ui/react';
import Navbar from './Navbar';

const LectureManagement = () => {
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [searchCourseId, setSearchCourseId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    startTime: '',
    endTime: '',
    description: '',
    meetingLink: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  //Fetching All Lectures
  const fetchLectures = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      console.log("Authorization Token:", authToken);
      const response = await axios.get('http://localhost:9000/lectures', {
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

  //Searching Lecture
  const handleSearchByCourseId = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/courses/${searchCourseId}/lectures`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setFilteredLectures(response.data.lectures);
    } catch (error) {
      console.error('Error searching lectures by course ID:', error.message);
    }
  };

  //Creating Lecture
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Request Payload:", formData); // Log request payload
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(
        `http://localhost:9000/courses/${formData.courseId}/lectures`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      console.log("Response:", response.data); // Log response data

      alert('Lecture scheduled successfully');
      setFormData({
        courseId: '',
        title: '',
        startTime: '',
        endTime: '',
        description: '',
        meetingLink: '',
      });
      // Fetch lectures again to update the UI with the newly created lecture
    } catch (error) {
      console.error('Error scheduling lecture:', error.message);
      alert('Failed to schedule lecture');
    }
    fetchLectures()
  };

  //Deleting Lecture
  const handleDeleteLecture = async (lectureId) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:9000/lectures/${lectureId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      // Update the lectures list after deletion
      const updatedLectures = lectures.filter(lecture => lecture._id !== lectureId);
      setLectures(updatedLectures);
      alert('Lecture deleted successfully');
    } catch (error) {
      console.error('Error deleting lecture:', error.message);
      alert('Failed to delete lecture');
    }
  };
  return (
    <Box>
      <Navbar />
      <VStack align="center" mt={8}>
        <Heading as="h2" size="xl">Create Lecture -[Only Admin]</Heading>

        <Box className="form-Box" mt={8} w="50%" boxShadow={'lg'} p="20px 20px" borderRadius={'20px'}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input
                type="text"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                placeholder="Course ID"
              />
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
              />
              <HStack spacing={4}>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  placeholder="Start Time"
                />
                <Input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  placeholder="End Time"
                />
              </HStack>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              />
              <Input
                type="text"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleChange}
                placeholder="Meeting Link"
              />
              <Button type="submit" colorScheme="teal">Schedule Lecture</Button>
            </VStack>
          </form>
        </Box>
        <Heading as="h1" size="xl" mt={8}>Lectures</Heading>
        <HStack>
          <Input
            type="text"
            placeholder="Search by Course ID"
            value={searchCourseId}
            onChange={(e) => setSearchCourseId(e.target.value)}
            mt={4}
            w="100%"
          />
          <Button onClick={handleSearchByCourseId} colorScheme="teal" mt={4}>Search</Button>

        </HStack>
        <SimpleGrid columns={2} spacing={4} mt={10} w="80%">
          {filteredLectures.map((lecture) => (
            <Box key={lecture._id} p={4} borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md">{lecture.title}</Heading>
              <Text>Course ID: {lecture.courseId}</Text>
              <Text>Start Time: {new Date(lecture.startTime).toLocaleString()}</Text>
              <Text>End Time: {new Date(lecture.endTime).toLocaleString()}</Text>
              <Text>Description: {lecture.description}</Text>
              <Text>Meeting Link: <a href={lecture.meetingLink}>{lecture.meetingLink}</a></Text>
              <Center mt='10px'>{userRole === 'admin' && <Button onClick={() => handleDeleteLecture(lecture._id)}>Delete</Button>}</Center>
            </Box>
          ))}
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4} w="80%">
          {lectures.map((lecture) => (
            <Box key={lecture._id} p={4} borderWidth="1px" borderRadius="md">   <Heading as="h3" size="lg" mb={2}>
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
              <HStack>
                <Button colorScheme="teal" onClick={() => window.open(lecture.meetingLink, '_blank')} mb={2}>
                  Join Meeting
                </Button>
                <Button mb='2' onClick={() => handleDeleteLecture(lecture._id)}>Delete</Button>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default LectureManagement;
