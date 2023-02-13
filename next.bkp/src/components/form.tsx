import React, { useState } from 'react';
import { getBoards } from "@/services";

const Form = ({handleOnSubmit}) => {
  const [name, setName] = useState('');
  const [distance, setDistance] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("DISTANCE AND NAME", distance, name)
    try {
      const result = await getBoards()
      console.log("RESULT:", result)
      // const data = result.filter(r => (r.distance <= distance ))
      const data = result.filter(r => (r.distance <= distance && r.name.includes(name)))
      console.log("DATA:", data);
      handleOnSubmit(data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="distance">Distance:</label>
        <input
          type="number"
          id="distance"
          value={distance}
          onChange={(event) => setDistance(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;