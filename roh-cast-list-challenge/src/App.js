import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://www.roh.org.uk/api/event-details?slug=turandot-by-andrei-serban");
        if (response.status === 200) {
          const json = await response.json();
          setData(json);
        } else {
          console.log('Error: ' + response.status);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  return (
    <div className="App">
      <h1>{data}</h1>
    </div>
  );
}

export default App;
