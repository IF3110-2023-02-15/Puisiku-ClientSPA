import { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { getPoems } from "@/api";
import Poem from "../../components/poem/poem"
import AddPoem from "@/pages/addpoem";

interface IPoem {
    id: number;
    title: string;
    creator: string;
}

const Album = () => {
    const navigate = useNavigate();

    const {id} = useParams<{ id: string }>();
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
        navigate('/404');
    }

    const [poems, setPoems] = useState<IPoem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    // TODO: replace getPoems with getPoemsWithAlbum(id)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPoems();
                setPoems(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const handlePoemClick = (id: number) => {
        console.log(`Poem with id ${id} clicked.`);
    };

    return (
        <Box>
            {poems.map((poem) => (
                <Link to={`/poem/${poem.id}`} key={poem.id}>
                    <Poem poem={poem} handlePoemClick={handlePoemClick} />
                </Link>
            ))}
            <Button onClick={() => setIsOpen(true)} colorScheme="pink" width="fit-content">
                Add Poem
            </Button>

            <AddPoem isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

export default Album;