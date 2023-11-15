import { useState, useEffect } from "react";
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Image,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import defaultAlbum from "@/assets/default_album.png";
import { ChangeEvent } from "react";
import { addAlbum, getAlbums, uploadImageFile } from "@/api";
import Album from "@/components/album";

interface IAlbum {
  id: number;
  creatorId: number;
  name: string;
  imagePath: string;
  timestamp: string;
}

const Home = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addAlbumImage, setAddAlbumImage] = useState<File | null>(null);
  const [addAlbumImagePreview, setAddAlbumImagePreview] = useState<string>(
    defaultAlbum as string
  );
  const [addAlbumName, setAddAlbumName] = useState("");
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAlbums();
        setAlbums(response);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchData();
  }, [isOpen]);

  const handleAddAlbumImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files![0];

    setAddAlbumImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setAddAlbumImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleAddAlbumNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddAlbumName(e.target.value);
  };

  const handleAddAlbum = async () => {
    const formData = new FormData();

    if (addAlbumImage) {
      formData.append("file", addAlbumImage);
    }

    try {
      let imagePath;

      if (addAlbumImage) {
        const { filePath } = await uploadImageFile(formData);

        if (!filePath) {
          throw new Error("File path is missing");
        }

        imagePath = filePath;
      }

      await addAlbum({ name: addAlbumName, imagePath });

      toast({
        title: "Success!",
        description: `Successfully added album ${addAlbumName}`,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to add album. Please try again!",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }

    onClose();

    setAddAlbumImage(null);
    setAddAlbumImagePreview(defaultAlbum as string);
    setAddAlbumName("");
  };

  return (
    <>
      <Box mt="6" mr="6" display="flex" justifyContent="flex-end">
        <Button
          leftIcon={<IoIosAddCircleOutline />}
          colorScheme="teal"
          onClick={onOpen}
        >
          Add Album
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent mx={6}>
            <ModalHeader>Add a new poem</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Image
                src={addAlbumImagePreview}
                alt="Album Image"
                boxSize="150px"
                objectFit="cover"
                borderRadius="20px"
                mb={6}
              />

              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Poem name"
                  value={addAlbumName}
                  onChange={handleAddAlbumNameChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  id="imageUpload"
                  onChange={handleAddAlbumImageChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddAlbum}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Wrap justify="center" spacing={12} padding={20}>
        {albums.map((album, i) => {
          return <Album album={album} key={i} />;
        })}
      </Wrap>
    </>
  );
};

export default Home;
