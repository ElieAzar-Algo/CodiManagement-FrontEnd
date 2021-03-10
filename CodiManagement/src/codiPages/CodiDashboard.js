import Page from 'components/Page';
import React,{useEffect,useState}from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

const CodiDashboard = () => {

  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState(false);


  const getStudents=async ()=>{
    const res =await  fetch("http://localhost:8000/api/families-major");
    const result=await res.json()
    setStudents(result.data.data)
    console.log(result.data.data)

  }

  useEffect(()=>{
    getStudents();
    
  },[])
  return (
    <Row >
      <Col>
        <Card className="mb-3">
          <CardHeader>Students</CardHeader>
          <CardBody>
            <Row>
              <Col>
                <Card body>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student,key)=>(
                        <tr key={key}>
                        <th scope="row">1</th>
                        <td>{student.interviewer}</td>
                      <td>{student.family_name}</td>
                      <td>{student.phone_number}</td>
                      </tr>
                      ))}
                      
                      <tr>
                        <th scope="row">2</th>
                        <td>Codi</td>
                        <td>Tech</td>
                        <td>@JIJI</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Hello</td>
                        <td>World</td>
                        <td>@Nice</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default CodiDashboard;