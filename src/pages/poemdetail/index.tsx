import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPoemById } from "@/api";
import { Button, Image, useDisclosure } from "@chakra-ui/react";
import EditPoem from "@/pages/updatepoem";


const REST_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

interface Poem {
    title: string;
    content: string;
    year: number;
    imagePath: string;
    audioPath: string;
    creatorId: number;
}
  

const PoemDetail = () => {
    const { id } = useParams<{ id: string }>();
    const poemId = Number(id) as number;
    const [poem, setPoem] = useState<Poem | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
  
    useEffect(() => {
      const fetchPoem = async () => {
        try {
          const data = await getPoemById(poemId);
          setPoem(data);
        } catch (error) {
          console.error("Error fetching poem: ", error);
        }
      };
  
      fetchPoem();
    }, [id]);

  
    if (!poem) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>{poem.title}</h1>
        <p>Content: {poem.content}</p>
        <p>Year: {poem.year}</p>
        <p>Creator: {poem.creatorId}</p>
        <p>Image path: {REST_BASE_URL + poem.imagePath}</p>
        <p>Audio path: {REST_BASE_URL + poem.audioPath}</p>
        <Image
          boxSize="500px"
          src={REST_BASE_URL + poem.imagePath}/>
        
        <audio controls>
          <source src={REST_BASE_URL + poem.audioPath} type="audio/mpeg"/>
        </audio>
        <Button onClick={() => setIsOpen(true)} colorScheme="pink" width="fit-content">
        Edit Poem
      </Button>

      <EditPoem isOpen={isOpen} onClose={onClose} poemId={poemId}/>
      </div>
    );
};
  
export default PoemDetail;
