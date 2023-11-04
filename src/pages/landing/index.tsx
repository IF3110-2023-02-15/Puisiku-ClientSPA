import { Button, Heading, Center } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Center h="100vh" w="100vw" flexDirection="column" gap={5}>
      <Heading as="h1" size="2xl" fontWeight="black">
        annyeong chagiya.
      </Heading>
      <Button
        as={Link}
        to="/login"
        rightIcon={<FaLongArrowAltRight />}
        colorScheme="pink"
        width="fit-content"
      >
        Get Started
      </Button>
    </Center>
  );
};

export default Landing;
