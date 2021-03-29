//import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input,
  Form,
  Modal,
  ModalBody, ModalFooter, ModalHeader,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledAlert
  
} from 'reactstrap';

const UserSkills = props => {
  const [studentSkills, setStudentSkills] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState('Student');


  const [modal, setModal] = useState(false);
  const [progress, setProgress] = useState();
  const [editForm, setEditForm] = useState(0);
  const [errors, setErrors] = useState(false);
  
  const cohortId = props.match.params.id;

  const handleIndexClick = sKey => {
    setEditForm(sKey);
  };


  const getStudentSkills = async () => {
    
    const res = await fetch(`http://localhost:8000/api/user-skills/${studentId}`);
    const result = await res.json();
    console.log(result.data);
    setStudentSkills(result.data);
  };

  const getCohortStudents = async () => {
    
    const res = await fetch(`http://localhost:8000/api/user-byCohort/${cohortId}`);
    const result = await res.json();
    console.log(result.data);
    setStudents(result.data);
  };

  const editProgress= async (id) => {
    const response = await fetch(`http://localhost:8000/api/skill-progress/${studentId}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        progress:progress,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
     
    } else {
      setErrors(result.errors);
    }
  };

  

  useEffect(() => {
    getCohortStudents();
  }, []);

  return (
    <Row>
      <Col>
        <Card className="mb-3">
          <CardHeader>Skill Map</CardHeader>
          <CardBody>
            <Row>
              <Col>
                <Row className="mb-2">
                  <Col sm={3}>
                  <UncontrolledButtonDropdown addonType="append">
                      <DropdownToggle caret> {studentName} </DropdownToggle>
                      <DropdownMenu>
                        {students.map((student, key) => (
                          <DropdownItem
                            key={key}
                            onClick={() => { setStudentId(student.id);setStudentName(student.user_first_name)}}>
                            {student.user_first_name} {student.user_last_name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </Col>
                  <Col sm={3}>

                  <Button
                        color="primary"
                        onClick={getStudentSkills}>
                        View {studentName}'s Skill Map
                  </Button>
                  </Col>
                </Row>
                <Row>
                  {/* ----------------------------------- */}

                 
                    <Col>
                      <Card body>
                        <Table hover>
                          <thead>
                            <tr>
                              <th>Skill Family</th>
                              <th>Skill</th>
                              <th>Progress</th>
                              <th></th>
                              <th>last Update</th>
                              
                              
                            </tr>
                          </thead>

                          <tbody>
                            {studentSkills.map(ts => (
                                !ts.skill[0]?<tr> <td><h3>No Skill Map Yet, Please Create A Skill Map For {studentName}</h3>
                                <Link to={{ pathname: `/create-skill-map/${cohortId}` }}><Button 
                                className="ml-3"
                                 color="info">Create Skill Map</Button></Link></td></tr>:
                                ts.skill.map((s,key)=>(
                              <tr key={key}>
                                  
                                <td>{s.skill_family}</td>
                                <td>{s.name}</td>
                                <td>
                                    <Form onSubmit={(e)=>{e.preventDefault();editProgress(s.id)
                                    const k=key+1;handleIndexClick(k)}}>
                                  <Input 
                                  max='3'
                                  min='0'
                                  type='number'
                                  className="w-50" 
                                  defaultValue={s.pivot.progress} 
                                 disabled={editForm!==key} 
                                  onChange={(e)=>setProgress(e.target.value)}/> 
                                  </Form>
                                  </td>
                                  
                                <td>{s.updated_at}</td>
                               
                              </tr>
                              ))
                            ))}
                          </tbody>
                          
                        </Table>
                      </Card>
                    </Col>
                  
                </Row>
              </Col>
            </Row>
          </CardBody>
          <Button onClick={() => window.location.reload()} color="info">
            {' '}
            Finish{' '}
          </Button>
        </Card>
        
      </Col>
    </Row>
  );
};
export default UserSkills;
