import { useAuth } from "@/contexts/AuthContext";
import { Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  const { id } = useAuth();
  return (
    <Box>
      <h1>Home {id}</h1>
      <Button as={Link} to="/profile" colorScheme="pink" width="fit-content">
        Profile
      </Button>
    </Box>
  );
};

export default Home;
