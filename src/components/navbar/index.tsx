import { Flex, Heading, Avatar, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "../loading";

const REST_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const Navbar = () => {
  const { imagePath, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex w="100%" px={8} py={2} className="shadow-md">
      <Link to="/home">
        <Heading>Puisiku Pro</Heading>
      </Link>
      <Spacer />
      <Link to="/profile">
        <Avatar
          borderRadius="full"
          boxSize="50px"
          src={REST_BASE_URL + imagePath}
          name="Profile"
        />
      </Link>
    </Flex>
  );
};

export default Navbar;
