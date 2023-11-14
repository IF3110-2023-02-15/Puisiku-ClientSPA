import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { getPoemById, updatePoem } from '@/api';
import { uploadImageFile, uploadAudioFile } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  Select,
  useToast,
} from '@chakra-ui/react';

interface EditPoemModalProps {
  isOpen: boolean;
  onClose: () => void;
  poemId: number;
}

const EditPoem: React.FC<EditPoemModalProps> = ({ isOpen, onClose, poemId }) => {
  const { id } = useAuth();
  const toast = useToast();

  const initialState = {
    title: '',
    content: '',
    genre: '',
    image: null,
    audio: null,
    year: 2023,
    albumId: null,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const poemsData = await getPoemById(poemId);
        setFormData(poemsData);
      } catch (error) {
        console.error("Error fetching poem data", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let newFormData = { ...formData , creatorId : id};
      const imageFile = formData.image;
      const audioFile = formData.audio;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const imagePath = await uploadImageFile(formData);

        const { filePath } = imagePath;

        if (!filePath) {
          throw new Error("Image path is missing");
        }

        newFormData = { ...newFormData, image: filePath };
      }

      if (audioFile) {
        const audioFormData = new FormData();
        audioFormData.append("file", audioFile);
  
        const audioPath = await uploadAudioFile(audioFormData);
  
        const { filePath } = audioPath;
  
        if (!filePath) {
          throw new Error("Audio path is missing");
        }
  
        newFormData = { ...newFormData, audio: filePath};
      }

      await updatePoem(poemId, newFormData);

      handleClose();

      toast({
        title: "Success!",
        description: `Successfully updated poem`,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      
    } catch (error) {
      console.error("Error updating poem", error);
      toast({
        title: "An error occurred.",
        description: "Unable to update poem. Please try again!",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  }

  return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Edit Poem</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <div>
              <label>Title</label>
              <Input type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
              <div>
                <label>Content</label>
                <Textarea name="content" value={formData.content} onChange={handleInputChange} />
              </div>
              <div>
                <label>Genre</label>
                <Select name="genre" value={formData.genre} onChange={handleInputChange}>
                  <option value="Romantic">Romantic</option>
                  <option value="Patriot">Patriot</option>
                  <option value="Eligi">Eligi</option>
                  <option value="Education">Education</option>
                  <option value="Nature">Nature</option>
                  <option value="Teacher">Teacher</option>
                </Select>
              </div>
              <div>
                <label>Image</label>
                <Input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
              </div>
              <div>
                <label>Audio</label>
                <Input type="file" name="audio" accept=".mp3" onChange={handleFileChange} />
              </div>
              <div>
                <label>Year</label>
                <Input type="number" name="year" value={formData.year} onChange={handleInputChange} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Submit
              </Button>
              <Button onClick={handleClose}>Close</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
  );
};

export default EditPoem;