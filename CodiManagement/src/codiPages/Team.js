//import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import user1Image from '../assets/img/users/100_1.jpg';
import HorizontalAvatarList from '../components/HorizontalAvatarList';


import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input,
  FormGroup,
  Alert,
  Label,
  CardDeck,
  UncontrolledAlert
} from 'reactstrap';
import UncontrolledButtonDropdown from 'reactstrap/lib/UncontrolledButtonDropdown';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';


const StagesInfo = props => {
  const [teams, setTeams] = useState([]);
  const [teamInputs, setTeamInputs] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [teamId, setTeamId] = useState();
  const [modal, setModal] = useState(false);

  const [admins, setAdmins] = useState([]);
  const [adminId, setAdminId] = useState();
  const [adminName, setAdminName] = useState('Mentors');

  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState('Student');

  const [createForm, setCreateForm] = useState(false);
  const [assignForm, setAssignForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [prairie, setPrairie] = useState(false);
  //const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState(false);

  //const branchName=props.match.params.name;
  const stageId = props.match.params.id;
  const cohortId = props.match.params.cohortId;

  const catchInput = e => {
    e.persist();
    setTeamInputs({
      ...teamInputs,
      [e.target.name]: e.target.value,
    });
    console.log(teamInputs);
  };

  //get all teams 
  const getTeams = async () => {
    // console.log(branchName,cohortId);
    const res = await fetch(`http://localhost:8000/api/team/${stageId}`);
    const result = await res.json();
    console.log(result.data);
    setTeams(result.data);
  };

  const getAdmins = async () => {
    const res = await fetch(`http://localhost:8000/api/admin`);
    const result = await res.json()
    console.log(result.data)
    setAdmins(result.data)
  }

  const getCohortStudents = async () => {

    const res = await fetch(`http://localhost:8000/api/user-byCohort/${cohortId}`);
    const result = await res.json();
    // console.log(result.data);
    setStudents(result.data);

  };

  const createTeam = async e => {

    //console.log(cohortId)
    e.preventDefault();
      const response = await fetch('http://localhost:8000/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          //Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          ...teamInputs,
        stage_id:stageId,
        admin_id:adminId,
        
        }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setErrors(result);
        setAdminName('Mentors');
        document.getElementById('TeamName').value="";
        document.getElementById('max_members').value="";
        getTeams(); 
      } else {
        setErrors(result.errors);
      }
  };

  
  const assignStudent=async (userId)=>
  {
    
      const response = await fetch('http://localhost:8000/api/team-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          //Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ 
        team_id:teamId,
        user_id:userId,
        isScrumMaster:0
        }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setErrors(result);
        setStudentName('Students');
       
        getTeams();
      } else {
        setErrors(result.errors);
      }
  }

  const activateStage = async (id, activate_deactivate) => {
    // const response = await fetch(`http://localhost:8000/api/stage/${id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //     //Authorization: "Bearer " + token,
    //   },
    //   body: JSON.stringify({
    //     active_inactive: !activate_deactivate,
    //   }),
    // });
    // const result = await response.json();
    // console.log(result);
    // if (result.success) {
    //   setErrors(result);
    //   window.location.reload();
    // } else {
    //   setErrors(result.errors);
    // }
  }

  const editStage = async e => {
    // e.preventDefault();
    // const response = await fetch(`http://localhost:8000/api/stage/${stageId}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //     //Authorization: "Bearer " + token,
    //   },
    //   body: JSON.stringify({
    //     ...stageInputs,
    //     cohort_code: cohortId,
    //     prairie: prairie,
    //     active_inactive: 0,

    //   }),
    // });
    // const result = await response.json();
    // console.log(result);
    // if (result.success) {
    //   setErrors(result);
      
    //     window.location.reload();
    
    // } else {
    //   setErrors(result.errors);
    // }
  };
  
  const deleteTeam=async()=>
  {
   
    
    const deleteRequestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: "Bearer " + token,
      },
    };
    const res = await fetch(
      `http://localhost:8000/api/team/${deleteId}`,
      deleteRequestOptions,
    );
    const result = await res.json();

    console.log(result.message);
    setModal(!modal);
    getTeams();
  }

  

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <Row>
      <Col>
        <Card className="mb-3">
          <CardHeader>Stages Info </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <Row className="mb-2">
                  <Col>
                    <Button
                      className="mr-3"
                      color="primary"
                      onClick={() => {setCreateForm(!createForm);getAdmins();}}
                    >
                      Create New Team
                    </Button>
                  </Col>
                </Row>
                <Row hidden={!createForm}>
                    <Col sm={5}>
                      <FormGroup row>
                        <Label for="TeamName" sm={5}>
                          Team Name
                        </Label>
                        <Col sm={7}>
                          <Input
                           id="TeamName"
                            type="text"
                            placeholder=""
                            onChange={catchInput}
                            name="name"
                          />
                          {errors.name ? (
                      <UncontrolledAlert color="danger">
                        {errors.name}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="max_members" sm={5}>
                          Max Members
                        </Label>
                        <Col sm={7}>
                          <Input
                          id="max_members"
                            type="number"
                            placeholder=""
                            onChange={catchInput}
                            name="max_members"
                          />
                          {errors.max_members ? (
                      <UncontrolledAlert color="danger">
                        {errors.max_members}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                        </Col>
                      </FormGroup>


                      <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Mentors
                  </Label>
                <Col sm={9}>
                  <UncontrolledButtonDropdown addonType="append">
                    <DropdownToggle caret> {adminName} </DropdownToggle>
                    <DropdownMenu>
                      {admins.map((admin, adminKey) => (
                        <DropdownItem
                          key={adminKey}
                          onClick={() => {
                            
                            setAdminId(admin.id);
                            setAdminName(admin.username);
                          }}
                        >
                          {admin.username}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  {errors.admin_id ? (
                      <UncontrolledAlert color="danger">
                        {errors.admin_id}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                </Col>
              </FormGroup>
                     <Button color="primary" onClick={createTeam}>
                          Submit
                        </Button>
                    </Col>
                    <Col sm={7}>
                    </Col>
                </Row>

                <Row hidden={!assignForm}>
                  <Col sm={5}>
                  <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Students
                  </Label>
                <Col sm={9}>
                  <UncontrolledButtonDropdown addonType="append">
                    <DropdownToggle caret> {studentName} </DropdownToggle>
                    <DropdownMenu>
                      {students.map((student, Key) => (
                        <DropdownItem
                          key={Key}
                          onClick={(e) => {
                            e.preventDefault();
                            assignStudent(student.id);
                            setStudentName(student.username);
                          }}
                        >
                          {student.user_first_name+" "+student.user_last_name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  {errors.user_id ? (
                    <Alert color="danger">{errors.user_id} </Alert>
                  ) : (
                      ''
                    )}
                </Col>
              </FormGroup>
                  </Col>
                </Row>

                  <Row>
                    <Col>
                      <Card body>
                        <Table responsive hover>
                          <thead>
                            <tr>
                              <th style={{ width: '10%' }}>Team Name</th>
                              <th style={{ width: '8%' }}>Team of ...</th>
                              <th style={{ width: '10%' }}>Mentor</th>
                              <th style={{ width: '10%' }}>Scrum Master</th>
                              <th style={{ width: '20%' }}>Members</th>
                              <th style={{ width: '10%' }}></th>
                            </tr>
                          </thead>

                          <tbody>
                            {teams.map((team, teamKey) => (
                              <tr key={teamKey}>
                                <td>{team.name}</td>
                                <td>{team.team_users.length}</td>
                                <td> {team.admin.username} </td>
                               

                                { team.team_users.length>0?
                                team.team_users.map((master, key) =>
                                  master.pivot.isScrumMaster ? (
                                   
                                    <td key={key}>
                                      {master.user_first_name +
                                        ' ' +
                                        master.user_last_name}
                                    </td>
                                )
                                  : 
                                 "  "
                                ):
                                <td>No Scrum Master</td>
                              }
                                 
                                <td onClick="">
                                {team.team_users.length>0?
                                  <HorizontalAvatarList
                                  
                                    avatars={team.team_users}
                                    avatarProps={{ size: 50 }}
                                  />:
                                  <Button
                                    onClick={()=>{getCohortStudents();setAssignForm(!assignForm);setTeamId(team.id)}}
                                    color="primary"
                                  >
                                    {' '}
                                    Assign members{' '}
                                  </Button>
                                }
                                </td>
                                
                                <td>
                                <Button
                                    onClick={() => {setModal(!modal);setDeleteId(team.id)}}
                                    color="danger"
                                  >
                                    {' '}
                                    Delete{' '}
                                  </Button>
                                  <Modal
                                    isOpen={modal}

                                    //   className={props.className}
                                  >
                                    <ModalHeader>
                                      You cannot undo this action !
                                    </ModalHeader>
                                    <ModalBody>
                                      Are you sure, you want to delete{' '}
                                       
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button
                                        color="primary"
                                        onClick={() => deleteTeam(team.id)}
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
          <Button onClick={() => props.history.goBack()}>Back</Button>
        </Card>
      </Col>
    </Row>
  );
};
export default StagesInfo;
