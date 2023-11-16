import { Box, Text } from "@chakra-ui/react";

const Unauthorized = () => {
  return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <Text as='b' fontSize="42px">Unauthorized</Text>
  </Box>
};

export default Unauthorized;
