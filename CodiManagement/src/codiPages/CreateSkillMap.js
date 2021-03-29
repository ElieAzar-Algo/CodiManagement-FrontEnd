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

const createSKillMap = props => {
  const [skills, setSkills] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState('Student');

  const [progress, setProgress] = useState(0);
  const [editForm, setEditForm] = useState(0);
  const [errors, setErrors] = useState(false);
  
  const cohortId = props.match.params.id;

  const handleIndexClick = sKey => {
    setEditForm(sKey);
  };


  const getSkills = async () => {
    
    const res = await fetch(`http://localhost:8000/api/skill`);
    const result = await res.json();
    console.log(result.data);
    setSkills(result.data);
  };

  const getCohortStudents = async () => {
    
    const res = await fetch(`http://localhost:8000/api/user-byCohort/${cohortId}`);
    const result = await res.json();
    console.log(result.data);
    setStudents(result.data);
  };

  const addProgress= async (skillId) => {
    const response = await fetch(`http://localhost:8000/api/skill-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
          user_id:studentId,
          skill_id:skillId,
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
    getSkills();
  }, []);

  return (
    <Row>
      <Col>
        <Card className="mb-3">
          <CardHeader>Skill Map
          {errors.message ? (
              <UncontrolledAlert color="success">
                {errors.message}{' '}
              </UncontrolledAlert>
            ) : errors.user_id ? (
              <UncontrolledAlert color="danger">
                {errors.user_id}{' '}
              </UncontrolledAlert>
            ) : (
              ''
            )}{' '}
          </CardHeader>
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

                 
                  </Col>
                </Row>
                <Row>
                  {/* ----------------------------------- */}

                 
                    <Col>
                      <Card body>
                        <Table hidden={errors.user_id?true:false} hover>
                          <thead>
                            <tr>
                              <th>Skill Family</th>
                              <th>Skill</th>
                              <th>Progress</th>
                              <th></th>
                              
                              
                              
                            </tr>
                          </thead>

                          <tbody>
                            {skills.map((skill,key) => (
                                
                              <tr key={key}>
                                  
                                <td>{skill.skill_family}</td>
                                <td>{skill.name}</td>
                                <td>
                                    <Form onSubmit={(e)=>{e.preventDefault();addProgress(skill.id)
                                    const k=key+1;handleIndexClick(k)}}>
                                  <Input 
                                  max='3'
                                  min='0'
                                  type='number'
                                  className="w-50" 
                                  defaultValue={progress} 
                                 disabled={editForm!==key} 
                                  onChange={(e)=>setProgress(e.target.value)}/> 
                                  </Form>
                                  </td>
                                  
                               
                              </tr>
                              
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
export default createSKillMap;
