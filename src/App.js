import React, { useState, useEffect } from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Col, Form, Container, Table} from "react-bootstrap";
import './App.css';


function App() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(2018);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false)


  const handleChange = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setYear(parseInt(event.target.value) || '')
    setValidated(true);
  };

  //====== Searchbar ======
  useEffect(() => {
    setLoading(true)
    const fetchData = () => {
      axios
        .get("https://jsonmock.hackerrank.com/api/movies?Year=" + year)
          .then(({data}) => {
            setLoading(false)
            setData(data.data);
          })
          .catch(error => console.log(error));
    };

    fetchData();
  }, [year]);

  return (
    <div className="App">
      <Container className="list-body">
        <h2>Movie Search</h2>
        <Form noValidate validated={validated} className="formbody">
          <Form.Row className="justify-content-md-center">
            <Form.Group as={Col} md="4" offset="2" controlId="validationCustom01">
              <Form.Control type="number" placeholder="Enter the year." required value={year} onChange={handleChange} />
            </Form.Group>
          </Form.Row>
        </Form>

        <Table striped bordered hover >
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Year</th>
              <th>AD_ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.Title}</td>
                <td>{element.Year}</td>
                <td>{element.imdbID}</td>
              </tr>
            ))}

            { loading && (
              <tr>
                <td colSpan="4">
                  Loading...
                </td>
              </tr>
            ) }

            { !loading && data.length === 0 && (
              <tr>
                <td colSpan="4">
                  No Movies
                </td>
              </tr>
            ) }
            
          </tbody>
        </Table>
        
        
      </Container>
    </div>
  );
}

export default App;
