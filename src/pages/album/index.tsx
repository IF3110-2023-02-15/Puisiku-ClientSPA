import { useState, useEffect, useRef } from "react";
import { Button, Box, Image, Text, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAlbum, getAlbumPoems, deleteAlbum } from "@/api";
import { IoIosAddCircleOutline, IoIosCreate, IoMdTrash } from "react-icons/io";
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
  const toast = useToast();

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

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const leastDestructiveRef = useRef(null);

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

  const handlePoemClick = () => {
  };

  const handlePoemAdded = () => {
    fetchData();
  };

  const handleOpenUpdateModal = (album: IAlbum) => {
    setSelectedAlbum(album);
    setIsUpdateModalOpen(true);
  };
  
  const handleCloseUpdateModal = () => {
    setSelectedAlbum(null);
    setIsUpdateModalOpen(false);
  };
  
  const handleUpdateCallback = () => {
    fetchData();
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const cancelDelete = () => {
      setIsDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirm = async () => {
      try {
          await deleteAlbum(idNumber);

          setIsDeleteConfirmationOpen(false);
          navigate("/");
          toast({
            title: "Success!",
            description: `Successfully delete album`,
            status: "success",
            isClosable: true,
            duration: 3000,
          });
      } catch (error) {
          console.error("Error deleting album: ", error);
          toast({
            title: "An error occurred.",
            description: "Unable to delete album. Please try again!",
            status: "error",
            isClosable: true,
            duration: 3000,
          });
      }
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
            objectFit="cover"
            src={REST_BASE_URL + album.imagePath}
            alt={album.name} />
            <Box display="flex" alignItems="center" gap={2}>
              <Text as='b' fontSize="28px" paddingLeft="50px">
                {album.name}
              </Text>
              <Button 
              ml={2} 
              onClick={() => handleOpenUpdateModal(album)}
              >
                <IoIosCreate/>
              </Button>

              <Button
                onClick={handleDeleteClick}
              >
                <IoMdTrash/>
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

      <AlertDialog
        isOpen={isDeleteConfirmationOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={cancelDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Album
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this album?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={leastDestructiveRef}
                onClick={handleDeleteConfirm}
                colorScheme="red"
                ml={3}
              >
                Delete
              </Button>
              <Button colorScheme="gray" onClick={cancelDelete}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Album;
