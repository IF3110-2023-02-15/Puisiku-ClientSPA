import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

interface PoemProps {
  poem: {
    id: number;
    title: string;
    creatorId: string;
    genre: string;
  };
  handlePoemClick: (id: number) => void;
}

const Poem: React.FC<PoemProps> = ({ poem, handlePoemClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      key={poem.id}
      onClick={() => handlePoemClick(poem.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      display="flex"
      justifyContent="space-between"
      style={{
        border: "1px solid #ccc",
        width: "60%",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        transform: isHovered ? "scale(1.03)" : "scale(1)",
        backgroundColor: isHovered ? "#88E2D4" : "#FFFFFF",
      }}
    >
      <Text as='b' textDecoration={isHovered ? "underline" : "none"}>
        {poem.title}
      </Text>
      <Text as='i' color="#AEAEAE">
        {poem.genre}
      </Text>
    </Box>
  );
};

export default Poem;
