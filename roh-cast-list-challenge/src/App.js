import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [creatives, setCreatives] = useState([]);
  const [cast, setCast] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://www.roh.org.uk/api/event-details?slug=turandot-by-andrei-serban");
        if (response.status === 200) {
          const json = await response.json();
          setData(json);
          console.log(json);
          setTitle(json.data.attributes.title);
          setShortDescription(removeTags(json.data.attributes.shortDescription));
          setCreatives(getCreatives(json));
          setCast(getCast(json));
          // to return the date of the event
          setDate(formatDate(json.included[14].attributes.date));
        } else {
          console.log('Error: ' + response.status);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  const getCreatives = (data) => {
    const creatives = [];
    data.included.forEach(relationship => {
      if (relationship.type === "creatives") {
        creatives.push(relationship.attributes);
      }
    });
    return creatives;
  }

  const getCast = (data) => {
    const cast = [];
    data.included.forEach(relationship => {
      if (relationship.type === "castRoles") {
        cast.push(relationship.attributes);
      }
    });
    return cast;
  }

  const removeTags = (str) => {
    return str.slice(3,-4)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  return (
    <div className="App">
      <h1>{title}</h1>
      <p>Date: {date}</p>
      <p>{shortDescription}</p>
      <h2>Creatives</h2>
      {
        creatives.map((creative) => (
        <li key={creative.id}>{creative.name} ({creative.role})</li>
        ))
      }
      <h2>Cast</h2>
      {
        cast.map((cast) => (
          <li key={cast.id}>{cast.name} ({cast.role})</li>
        ))
      }
    </div>
  );
}

export default App;
