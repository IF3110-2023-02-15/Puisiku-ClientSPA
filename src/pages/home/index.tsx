import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getPoems } from "@/api";
import Poem from "../../components/poem/poem"

interface IPoem {
  id: number;
  title: string;
  creator: string;
}

const Home = () => {
  const { id } = useAuth();
  const [poems, setPoems] = useState<IPoem[]>([]);

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
    // Handle click event for each poem box
    console.log(`Poem with id ${id} clicked.`);
  };

  console.log(poems);

  return (
    <Box>
      <h1>Home {id}</h1>
      {poems.map((poem) => (
        <Poem key={poem.id} poem={poem} handlePoemClick={handlePoemClick} />
      ))}
      <Button as={Link} to="/profile" colorScheme="pink" width="fit-content">
        Profile
      </Button>
      <Button as={Link} to="/addpoem" colorScheme="pink" width="fit-content">
        addpoem
      </Button>
    </Box>
  );
};

export default Home;

