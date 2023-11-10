import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getPoems } from "@/api";
import Poem from "../../components/poem/poem"
import AddPoem from "@/pages/addpoem";

interface IPoem {
  id: number;
  title: string;
  creator: string;
}

const Home = () => {
  const { id } = useAuth();
  const [poems, setPoems] = useState<IPoem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPoems();
        setPoems(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handlePoemClick = (id: number) => {
    console.log(`Poem with id ${id} clicked.`);
  };

  return (
    <Box>
      <h1>Home {id}</h1>
      {poems.map((poem) => (
        <Link to={`/poem/${poem.id}`} key={poem.id}>
          <Poem poem={poem} handlePoemClick={handlePoemClick} />
        </Link>
      ))}
      <Button as={Link} to="/profile" colorScheme="pink" width="fit-content">
        Profile
      </Button>
      <Button onClick={() => setIsOpen(true)} colorScheme="pink" width="fit-content">
        Add Poem
      </Button>

      <AddPoem isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Home;