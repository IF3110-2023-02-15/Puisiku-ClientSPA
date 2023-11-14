import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getPoemById, deletePoem } from "@/api";
import { Button, Image, Box, Text, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import EditPoem from "@/pages/updatepoem";


const REST_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

interface Poem {
    title: string;
    content: string;
    year: number;
    imagePath: string;
    audioPath: string;
    creatorId: number;
    albumId: number;
} 


const PoemDetail = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams<{ id: string }>();
    const poemId = Number(id) as number;
    const [poem, setPoem] = useState<Poem | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const leastDestructiveRef = useRef(null);
  
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

    const handleDeleteClick = () => {
      setIsDeleteConfirmationOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteConfirmationOpen(false);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deletePoem(poemId);

            setIsDeleteConfirmationOpen(false);
            navigate(`/album/${poem?.albumId}`);
            toast({
              title: "Success!",
              description: `Successfully delete poem`,
              status: "success",
              isClosable: true,
              duration: 3000,
            });
        } catch (error) {
            console.error("Error deleting poem: ", error);
            toast({
              title: "An error occurred.",
              description: "Unable to delete poem. Please try again!",
              status: "error",
              isClosable: true,
              duration: 3000,
            });
        }
    };

  
    if (!poem) {
      return <div>Loading...</div>;
    }
  
    return (
      <Box display="flex" flexDirection="row" height="calc(100vh - 64px)">
        <Box backgroundColor="#5BBFAE" display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="25%">
          <Image 
            boxSize="250px"
            src={REST_BASE_URL + poem.imagePath}/>
          <Text as='b' fontSize="24px">{poem.title}</Text>
          <Text as='i' fontSize="16px">{poem.year}</Text>
          <audio controls style={{ width:"80%", marginTop: '10px' }}>
            <source 
              src={REST_BASE_URL + poem.audioPath} 
              type="audio/mpeg"
              />
          </audio>
        </Box>

        <Button 
              onClick={() => setIsOpen(true)} 
              colorScheme="pink" 
              width="fit-content"
              position="absolute"
              top="15px"
              right="100px"
          >
              Edit Poem
        </Button>

        <Button
            onClick={handleDeleteClick}
            colorScheme="red"
            width="fit-content"
            position="absolute"
            top="15px"
            right="20px"
          >
            Delete Poem
        </Button>

        <Box backgroundColor="#69DBC8" width="75%" display="flex" justifyContent="center" alignItems="center">
          <Box 
            height="calc(90vh - 64px)"
            overflow="auto"
            backgroundColor="#88E2D4"
            borderRadius="20px"
            border="3px solid #000000"
            width="50%"
            padding="20px"
            margin="20px auto">

            <Text as="b" fontSize="22px" 
            maxHeight="calc(90vh - 64px)"
            lineHeight="2.0">{poem.content}</Text>
          </Box>
        </Box>

      <EditPoem isOpen={isOpen} onClose={onClose} poemId={poemId}/>
      <AlertDialog
                isOpen={isDeleteConfirmationOpen}
                leastDestructiveRef={leastDestructiveRef}
                onClose={cancelDelete}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Poem
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this {poem.title} poem?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={leastDestructiveRef} onClick={handleDeleteConfirm} colorScheme="red" ml={3}>
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
  
export default PoemDetail;
