import { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAlbum, getAlbumPoems } from "@/api";
import Poem from "../../components/poem/poem";
import AddPoem from "@/pages/addpoem";

interface IPoem {
  id: number;
  title: string;
  creator: string;
}

const Album = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    navigate("/404");
  }

  const [poems, setPoems] = useState<IPoem[]>([]);
  const [album, setAlbum] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumData = await getAlbum(idNumber);
        setAlbum(albumData);

        const poemsData = await getAlbumPoems(idNumber);
        setPoems(poemsData);
      } catch (error: any) {
        if (error.response.status === 401) {
          navigate("/401");
        } else if (error.response.status === 404) {
          navigate("/404");
        }
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [idNumber]);

  const handlePoemClick = (id: number) => {
    console.log(`Poem with id ${id} clicked.`);
  };

  return (
    <Box>
      ini di album
      {poems.map((poem) => (
        <Link to={`/poem/${poem.id}`} key={poem.id}>
          <Poem poem={poem} handlePoemClick={handlePoemClick} />
        </Link>
      ))}
      <Button
        onClick={() => setIsOpen(true)}
        colorScheme="pink"
        width="fit-content"
      >
        Add Poem
      </Button>
      <AddPoem isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Album;
