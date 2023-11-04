import { getProfile } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IUserResponse {
  email: string;
  name: string;
}

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUserResponse>();
  const [subscriber, setSubscriber] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
        setSubscriber(data.subscription.subscriber);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Button onClick={handleLogout} colorScheme="pink" width="fit-content">
        Logout
      </Button>
      {user && <div>Name: {user.name}</div>}
      <div>Subscriber: {subscriber}</div>
    </Box>
  );
};

export default Profile;
