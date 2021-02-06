import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from './logo.svg';
import './App.css';


function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("2018");


  //====== Searchbar ======
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://jsonmock.hackerrank.com/api/movies?Year=" + query)
          .then(({data}) => {
            console.log(data.data);
            setData(data.data);
          })
          .catch(error => console.log(error));
    };

    fetchData();
  }, [query]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="Form">
          <input value={query} onChange={event => setQuery(event.target.value)} />
          <ul>
            {data.map((element, index) => (
              <li key={index}>
                <p >{element.Title} / {element.Year}</p>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
