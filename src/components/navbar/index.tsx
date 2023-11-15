import { Flex, Heading, Avatar, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "../loading";
import { REST_BASE_URL } from "@/configs/config.ts";

const Navbar = () => {
  const { imagePath, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  const imageUrl = REST_BASE_URL + imagePath
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
          src={imageUrl}
          name="Profile"
        />
      </Link>
    </Flex>
  );
};

export default Navbar;
