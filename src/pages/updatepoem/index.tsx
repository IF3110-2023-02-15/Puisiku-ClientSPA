import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { addPoem, getPoemById } from '@/api';
import { uploadImageFile, uploadAudioFile } from "@/api";
import { useParams } from "react-router-dom";
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
} from '@chakra-ui/react';

interface EditPoemModalProps {
  isOpen: boolean;
  onClose: () => void;
  poemId: number;
}

const EditPoem: React.FC<EditPoemModalProps> = ({ isOpen, onClose }) => {
  const { id } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    genre: '',
    image: null,
    audio: null,
    year: 2023,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const poemsData = await getPoemById(id);
        console.log(poemsData);
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

      await addPoem(newFormData);
      
    } catch (error) {
      console.error("Error adding poem", error);
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

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add Poem</ModalHeader>
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
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
  );
};

export default EditPoem;

// const EditPoem = () => {
//   const { id } = useParams<{ id: string }>();

//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     genre: '',
//     image: null,
//     audio: null,
//     year: 2023,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const poemsData = await getPoems();
//         console.log(poemsData);
//         setFormData(poemsData);
//       } catch (error) {
//         console.error("Error fetching poem data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       let newFormData = { ...formData , creatorId : id};
//       const imageFile = formData.image;
//       const audioFile = formData.audio;

//       if (imageFile) {
//         const formData = new FormData();
//         formData.append("file", imageFile);

//         const imagePath = await uploadImageFile(formData);

//         const { filePath } = imagePath;

//         if (!filePath) {
//           throw new Error("Image path is missing");
//         }

//         newFormData = { ...newFormData, image: filePath };
//       }

//       if (audioFile) {
//         const audioFormData = new FormData();
//         audioFormData.append("file", audioFile);
  
//         const audioPath = await uploadAudioFile(audioFormData);
  
//         const { filePath } = audioPath;
  
//         if (!filePath) {
//           throw new Error("Audio path is missing");
//         }
  
//         newFormData = { ...newFormData, audio: filePath};
//       }

//       await addPoem(newFormData);
      
//     } catch (error) {
//       console.error("Error adding poem", error);
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files.length) {
//       setFormData({ ...formData, [name]: files[0] });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Title</label>
//         <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Content</label>
//         <textarea name="content" value={formData.content} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Genre</label>
//         <select name="genre" value={formData.genre} onChange={handleInputChange}>
//           <option value="Romantic">Romantic</option>
//           <option value="Patriot">Patriot</option>
//           <option value="Eligi">Eligi</option>
//           <option value="Education">Education</option>
//           <option value="Nature">Nature</option>
//           <option value="Teacher">Teacher</option>
//         </select>
//       </div>
//       <div>
//         <label>Image</label>
//         <input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
//       </div>
//       <div>
//         <label>Audio</label>
//         <input type="file" name="audio" accept=".mp3" onChange={handleFileChange} />
//       </div>
//       <div>
//         <label>Year</label>
//         <input type="number" name="year" value={formData.year} onChange={handleInputChange} />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default EditPoem;