import React, { useState, useEffect, ChangeEvent } from "react";
import {
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
  Button,
  useToast,
} from "@chakra-ui/react";
import { updateAlbum, uploadImageFile } from "@/api";

interface UpdateAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: IAlbum;
  onUpdate: () => void;
}

interface IAlbum {
  id: number;
  creatorId: number;
  name: string;
  imagePath: string;
}

const UpdateAlbumModal: React.FC<UpdateAlbumModalProps> = ({
  isOpen,
  onClose,
  album,
  onUpdate,
}) => {
  const toast = useToast();
  const [updateAlbumImage, setUpdateAlbumImage] = useState<File | null>(null);
  const [updateAlbumName, setUpdateAlbumName] = useState(album.name);

  useEffect(() => {
    setUpdateAlbumName(album.name);
  }, [album]);


  const handleUpdateAlbumImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files![0];

    setUpdateAlbumImage(file);
  };

  const handleUpdateAlbumNameChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateAlbumName(e.target.value);
  };

  const handleUpdateAlbum = async () => {
    const formData = new FormData();

    if (updateAlbumImage) {
      formData.append("file", updateAlbumImage);
    }

    try {
      let imagePath = album.imagePath;

      if (updateAlbumImage) {
        const { filePath } = await uploadImageFile(formData);

        if (!filePath) {
          throw new Error("File path is missing");
        }

        imagePath = filePath;
      }

      await updateAlbum(album.id, { name: updateAlbumName, imagePath });

      toast({
        title: "Success!",
        description: `Successfully updated album ${updateAlbumName}`,
        status: "success",
        isClosable: true,
        duration: 3000,
      });

      onUpdate();

      onClose();
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to update album. Please try again!",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }

    setUpdateAlbumImage(null);
    setUpdateAlbumName("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Album</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FormControl mt={4}>
            <FormLabel>Album Image</FormLabel>
            <Input
              type="file"
              onChange={handleUpdateAlbumImageChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Album Name</FormLabel>
            <Input
              type="text"
              value={updateAlbumName}
              onChange={handleUpdateAlbumNameChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleUpdateAlbum}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateAlbumModal;
