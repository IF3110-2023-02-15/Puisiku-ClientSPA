import { useState, useEffect } from "react";
import { Button, Box, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAlbum, getAlbumPoems } from "@/api";
import { IoIosAddCircleOutline, IoIosCreate } from "react-icons/io";
import Poem from "../../components/poem/poem";
import AddPoem from "@/pages/addpoem";
import UpdateAlbumModal from "@/pages/updatealbum";

const REST_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

interface IPoem {
  id: number;
  title: string;
  creatorId: string;
  genre: string;
}

interface IAlbum {
  id: number;
  name: string;
  imagePath: string;
  creatorId: number;
}

const Album = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    navigate("/404");
  }

  const [poems, setPoems] = useState<IPoem[]>([]);
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | null>(null);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    fetchData();
  }, [idNumber]);

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

  const handlePoemClick = (id: number) => {
    console.log(`Poem with id ${id} clicked.`);
  };

  const handlePoemAdded = () => {
    fetchData();
  };

  const handleOpenUpdateModal = (album: IAlbum) => {
    setSelectedAlbum(album);
    console.log(album.name);
    console.log(album.imagePath);
    setIsUpdateModalOpen(true);
  };
  
  const handleCloseUpdateModal = () => {
    setSelectedAlbum(null);
    setIsUpdateModalOpen(false);
  };
  
  const handleUpdateCallback = () => {
    fetchData();
  };
  

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          leftIcon={<IoIosAddCircleOutline />}
          onClick={() => setIsOpen(true)}
          colorScheme="teal"
          width="fit-content"
          marginTop="15px"
          marginRight="20px"
        >
          Add Poem
        </Button>
      </Box>
      {album && (
        <Box display="flex" justifyContent="center" marginBottom="20px">
          <Box display="flex" flexDirection="row" alignItems="center" width="60%">
            <Image 
            boxSize="200px"
            src={REST_BASE_URL + album.imagePath}
            alt={album.name} />
            <Box display="flex" alignItems="center">
              <Text as='b' fontSize="28px" paddingLeft="50px">
                {album.name}
              </Text>
              <Button 
              ml={2} 
              backgroundColor="#FFFFFF" 
              color="#000000"
              onClick={() => handleOpenUpdateModal(album)}
              >
                <IoIosCreate boxSize={12}/>
              </Button>
            </Box>
          </Box>
        </Box>
      )}


        <UpdateAlbumModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          album={selectedAlbum || { id: 0, name: "", imagePath: "", creatorId: 0 }}
          onUpdate={handleUpdateCallback}
        />

      {poems.map((poem) => (
        <Link to={`/poem/${poem.id}`} key={poem.id}>
          <Box display="flex" justifyContent="center">
            <Poem poem={poem} handlePoemClick={handlePoemClick}/>
          </Box>
        </Link>
      ))}
      <AddPoem isOpen={isOpen} onClose={onClose} albumId={idNumber} onPoemAdded={handlePoemAdded}/>
    </Box>
  );
};

export default Album;
