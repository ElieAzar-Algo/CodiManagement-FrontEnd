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
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';

const Skills = props => {
  const [skills, setSkills] = useState([]);
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState();
  const [skillFamily, setSkillFamily] = useState();
  const [skillName, setSkillName] = useState();

  const [modal, setModal] = useState();
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

  

  const editSkill= async () => {
    const response = await fetch(`http://localhost:8000/api/skill/${editId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        skill_family:skillFamily,
        name:skillName
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      getSkills()
      setEditForm(!editForm)
     
    } else {
      setErrors(result.errors);
    }
  };

  const createSkill= async () => {
    const response = await fetch(`http://localhost:8000/api/skill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        skill_family:skillFamily,
        name:skillName
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      getSkills()
      
     
    } else {
      setErrors(result.errors);
    }
  };

  const deleteSkill= async (id) => {
    const response = await fetch(`http://localhost:8000/api/skill/${id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      }
     
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
    getSkills();
  }, []);

  return (
    <Row>
      <Col>
        <Card className="mb-3">
          <CardHeader>
              Skills List
             
          </CardHeader>
          <Row className='ml-3 mt-2'>
                  <Col sm={6}>
                  <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Skill Family
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          onChange={(e)=>setSkillFamily(e.target.value)}
                         
                        />
                        
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Skill Name :
                      </Label>
                      <Col sm={7}>
                        <Input
                         type="text"
                         onChange={(e)=>setSkillName(e.target.value)}
                        />
                       
                      </Col>
                    </FormGroup>
              <Button color='primary' onClick={createSkill} >Create New Skill</Button>
              </Col>
              </Row>
          <CardBody>
            <Row>
              <Col>
                <Row hidden={!editForm}>
                  <Col sm={6}>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Skill Family
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          onChange={(e)=>setSkillFamily(e.target.value)}
                         
                        />
                        
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Skill Name :
                      </Label>
                      <Col sm={7}>
                        <Input
                         type="text"
                         onChange={(e)=>setSkillName(e.target.value)}
                        />
                       
                      </Col>
                    </FormGroup>
                    <Button onClick={editSkill}>Submit Changes</Button>
                  </Col>
                </Row>
                <Row>
                  {/* ----------------------------------- */}

                  <Col>
                    <Card body>
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>Skill Family</th>
                            <th>Skill</th>
                          </tr>
                        </thead>

                        <tbody>
                          {skills.map((skill, key) => (
                            <tr key={key}>
                              <td>{skill.skill_family}</td>
                              <td>{skill.name}</td>

                              <td>
                                <Button
                                  className="ml-3 mr-3"
                                  onClick={e => {
                                    setEditForm(!editForm);
                                    setEditId(skill.id);
                                  }}
                                  color="primary"
                                >
                                  {' '}
                                  Edit{' '}
                                </Button>
                                <Button
                                  onClick={() => setModal(!modal)}
                                  color="danger"
                                >
                                  {' '}
                                  Delete{' '}
                                </Button>
                                <Modal isOpen={modal}>
                                  <ModalHeader>
                                    You cannot undo this action !
                                  </ModalHeader>
                                  <ModalBody>
                                    Are you sure, you want to delete{' '}
                                    {skill.skill_name}?
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button
                                      color="primary"
                                      onClick={() => deleteSkill(skill.id)}
                                    >
                                      Confirm
                                    </Button>{' '}
                                    <Button
                                      color="secondary"
                                      onClick={() => setModal(!modal)}
                                    >
                                      Cancel
                                    </Button>
                                  </ModalFooter>
                                </Modal>
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
          <Row>
            <Button
              className="col-6"
              onClick={() => window.location.reload()}
              color="info"
            >
              {' '}
              Finish{' '}
            </Button>

            <Button className="col-6" onClick={() => props.history.goBack()}>
              Back
            </Button>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default Skills;
