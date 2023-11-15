import {RefObject, ChangeEvent, useEffect} from "react";
import {
  Box,
  Button,
  VStack,
  Image,
  Input,
  Textarea,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface IUserResponse {
  name: string;
  email: string;
  imagePath: string;
  description: string;
  subscriber: number;
}

interface ProfileViewProps {
  user: IUserResponse | undefined;
  name: string;
  description: string;
  image: string;
  isNameOpen: boolean;
  isDescOpen: boolean;
  onNameOpen: () => void;
  onDescOpen: () => void;
  onNameClose: () => void;
  onDescClose: () => void;
  handleLogout: () => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIconButtonClick: () => void;
  handleNameChange: (newName: string) => void;
  handleDescriptionChange: (newDescription: string) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  name,
  description,
  image,
  isNameOpen,
  isDescOpen,
  onNameOpen,
  onDescOpen,
  onNameClose,
  onDescClose,
  handleLogout,
  handleImageChange,
  handleIconButtonClick,
  handleNameChange,
  handleDescriptionChange,
  fileInputRef,
}) => {
  const [tempName, setTempName] = useState(name);
  const [tempDescription, setTempDescription] = useState(description);

  useEffect(() => {
    setTempName(name)
  }, [name]);

  useEffect(() => {
    setTempDescription(description)
  }, [description]);

  const handleTempNameChange = (event: any) => {
    setTempName(event.target.value);
  };

  const handleTempDescriptionChange = (event: any) => {
    setTempDescription(event.target.value);
  };

  return (
    <VStack spacing={4} padding={4} my={12}>
      <Box boxSize="150px" position="relative">
        <Box as="span" display="inline-block">
          <Image
            borderRadius="full"
            boxSize="150px"
            src={image}
            alt="Profile image"
            objectFit="cover"
          />
          <IconButton
            aria-label="Update image"
            icon={<EditIcon />}
            isRound={true}
            size="sm"
            position="absolute"
            bottom="0"
            right="0"
            colorScheme="teal"
            opacity="1"
            onClick={handleIconButtonClick}
          />
          <Input
            ref={fileInputRef}
            id="imageUpload"
            type="file"
            onChange={handleImageChange}
            hidden
          />
        </Box>
      </Box>

      <VStack spacing={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="b" fontSize="5xl">
            {name}
          </Text>
          <IconButton
            aria-label="Edit name"
            icon={<EditIcon />}
            onClick={onNameOpen}
            bg="none"
          />
        </Flex>

        <Modal isOpen={isNameOpen} onClose={onNameClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Name</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input value={tempName} onChange={handleTempNameChange} />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleNameChange(tempName)}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Text as="b" fontSize="lg">
          {user?.email}
        </Text>
        <Text as="b" fontSize="lg">
          {user?.subscriber} subscribers
        </Text>

        <Box
          width="400px"
          minHeight="250px"
          p={4}
          borderWidth={1}
          borderRadius="lg"
          overflow="auto"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text as="b">Description</Text>
            <IconButton
              aria-label="Edit description"
              icon={<EditIcon />}
              onClick={onDescOpen}
              bg="none"
            />
          </Flex>

          <Text fontSize="lg">{description || "No description provided."}</Text>
        </Box>

        <Modal isOpen={isDescOpen} onClose={onDescClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Description</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                value={tempDescription}
                onChange={handleTempDescriptionChange}
                minHeight="200px"
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleDescriptionChange(tempDescription)}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>

      <Button colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>
    </VStack>
  );
};

export default ProfileView;
