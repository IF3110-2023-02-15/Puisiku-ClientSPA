import { useState, ChangeEvent, FormEvent } from 'react';
import { addPoem } from '@/api';
// import { Link } from "react-router-dom";
// import { Button } from '@chakra-ui/react';

const AddPoem = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    genre: '',
    image: null,
    audio: null,
    year: '',
  });
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addPoem(formData);
      console.log("tes");
    } catch (error) {
      console.error("Error adding poem", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>Content</label>
        <textarea name="content" value={formData.content} onChange={handleInputChange} />
      </div>
      <div>
        <label>Genre</label>
        <select name="genre" value={formData.genre} onChange={handleInputChange}>
          <option value="Romantic">Romantic</option>
          <option value="Patriot">Patriot</option>
          <option value="Eligi">Eligi</option>
          <option value="Education">Education</option>
          <option value="Nature">Nature</option>
          <option value="Teacher">Teacher</option>
        </select>
      </div>
      <div>
        <label>Image</label>
        <input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
      </div>
      <div>
        <label>Audio</label>
        <input type="file" name="audio" accept=".mp3" onChange={handleFileChange} />
      </div>
      <div>
        <label>Year</label>
        <input type="number" name="year" value={formData.year} onChange={handleInputChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPoem;
