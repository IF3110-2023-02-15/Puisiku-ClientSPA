import { useEffect, useState, ChangeEvent, useRef } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "@/api";
import ProfileView from "./view";
import { uploadImageFile } from "@/api";

const REST_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

interface IUserResponse {
  name: string;
  email: string;
  imagePath: string;
  description: string;
  subscriber: number;
}

const Profile = () => {
  const { logout, updateProfileImage } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    isOpen: isNameOpen,
    onOpen: onNameOpen,
    onClose: onNameClose,
  } = useDisclosure();
  const {
    isOpen: isDescOpen,
    onOpen: onDescOpen,
    onClose: onDescClose,
  } = useDisclosure();

  const [user, setUser] = useState<IUserResponse>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        setName(data.name);
        setDescription(data.description || "");
        setImage(REST_BASE_URL + data.imagePath);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    const formData = new FormData();

    formData.append("file", file);

    try {
      const imagePath = await uploadImageFile(formData);

      const { filePath } = imagePath;

      if (!filePath) {
        throw new Error("File path is missing");
      }

      await updateProfile({ imagePath: filePath });

      updateProfileImage(filePath);

      toast({
        title: "Profile updated.",
        description: "Your profile image has been successfully updated.",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to update profile.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleIconButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleNameChange = async (newName: string) => {
    onNameClose();

    try {
      await updateProfile({ name: newName });

      setName(newName);

      toast({
        title: "Profile updated.",
        description: "Your name has been successfully updated.",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to update profile.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const handleDescriptionChange = async (newDescription: string) => {
    onDescClose();

    try {
      await updateProfile({ description: newDescription });

      setDescription(newDescription);

      toast({
        title: "Profile updated.",
        description: "Your description has been successfully updated.",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to update profile.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  return (
    <ProfileView
      user={user}
      name={name}
      description={description}
      image={image}
      isNameOpen={isNameOpen}
      isDescOpen={isDescOpen}
      onNameOpen={onNameOpen}
      onDescOpen={onDescOpen}
      onNameClose={onNameClose}
      onDescClose={onDescClose}
      handleLogout={handleLogout}
      handleImageChange={handleImageChange}
      handleIconButtonClick={handleIconButtonClick}
      handleNameChange={handleNameChange}
      handleDescriptionChange={handleDescriptionChange}
      fileInputRef={fileInputRef}
    />
  );
};

export default Profile;
