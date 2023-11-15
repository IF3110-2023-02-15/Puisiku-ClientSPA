import { Flex, Image, Text } from "@chakra-ui/react";
import { REST_BASE_URL } from "@/configs/config";
import { Link } from "react-router-dom";
import { useState } from "react";

interface IAlbum {
  id: number;
  creatorId: number;
  name: string;
  imagePath: string;
  timestamp: string;
}

const Album = ({ album }: { album: IAlbum }) => {
  const imagePath = REST_BASE_URL + album.imagePath;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link to={`/album/${album.id}`}>
      <Flex
        direction="column"
        key={album.id}
        bg="white"
        boxShadow="lg"
        p="6"
        rounded="lg"
        alignItems="center"
        width={250}
        gap={4}
        height="100%"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <Image
          src={imagePath}
          alt={album.name}
          width={200}
          height={200}
          objectFit="contain"
        />
        <Text as="b" fontSize="xl" align="center">
          {album.name}
        </Text>
      </Flex>
    </Link>
  );
};

export default Album;
