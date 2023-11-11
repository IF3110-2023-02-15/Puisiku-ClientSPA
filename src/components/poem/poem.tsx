import React from "react";

interface PoemProps {
  poem: {
    id: number;
    title: string;
    creator: string;
  };
  handlePoemClick: (id: number) => void;
}

const Poem: React.FC<PoemProps> = ({ poem, handlePoemClick }) => {
  return (
    <div
      key={poem.id}
      onClick={() => handlePoemClick(poem.id)}
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      <h2>{poem.title}</h2>
      <p>{poem.creator}</p>
    </div>
  );
};

export default Poem;
