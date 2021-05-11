import React, { useEffect, useState } from 'react';
//import {Link} from 'react-router-dom';
import {
  Row, Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Modal,
  Alert, ModalBody, ModalFooter, ModalHeader, UncontrolledButtonDropdown, Table,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import { UserCard } from '../components/Card';
import user1Image from '../assets/img/users/100_1.jpg';
import EditUser from './EditUser';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'reactstrap';
import codilogo from 'assets/img/logo/codi-logo.svg';


import SourceLink from 'components/SourceLink';




const UserProfile = (props) => {
  const [user, setUser] = useState({});
  const [cohortId, setCohortId] = useState();
  const [stages, setStages] = useState([]);

  const [modal, setModal] = useState(false);
  const [editUser, setEditUser] = useState(true);

  const [assignmentForm, setAssignmentForm] = useState(false);
  const [progress, setProgress] = useState(1);
  const [updatedProgress, setUpdatedProgress] = useState();

  const [taskInputs, setTaskInputs] = useState([]);
  const [taskId, setTaskId] = useState();
  const [taskName, setTaskName] = useState('Tasks');
  const [yourTasks, setYourTasks] = useState([]);

  const [admins, setAdmins] = useState([]);
  const [adminId, setAdminId] = useState();
  const [adminName, setAdminName] = useState('Mentors');

  const [studentSkills, setStudentSkills] = useState([]);
  const [skillForm, setSkillForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [errors, setErrors] = useState(false);

  const userId = props.match.params.id;

  const handleIndexClick = tsKey => {
    setEditForm(tsKey);
  };

  const catchInput = e => {
    e.persist();
    setTaskInputs({
      ...taskInputs,
      [e.target.name]: e.target.value,
    });
    // console.log(taskInputs);
  };

  const getUser = async () => {
    const res = await fetch(`http://localhost:8000/api/user/${userId}`);
    const result = await res.json()
    console.log(result.data[0])
    setUser(result.data[0])
    setCohortId(result.data[0].cohort_code)
  }

  const getAdmins = async () => {
    const res = await fetch(`http://localhost:8000/api/admin`);
    const result = await res.json()
    // console.log(result.data)
    setAdmins(result.data)
  }

  const getStudentTasks = async () => {
    const res = await fetch(`http://localhost:8000/api/user-task-individually/${userId}`);
    const result = await res.json()
    // console.log(result.data)
    setYourTasks(result.data)
  }

  const getCohortStages = async () => {

    const res = await fetch(`http://localhost:8000/api/stage/${cohortId}`);
    const result = await res.json();
    console.log(result.data);
    setStages(result.data);

  };


  const deleteUser = async () => {


    const deleteRequestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: "Bearer " + token,
      },
    };
    const res = await fetch(`http://localhost:8000/api/user/${userId}`, deleteRequestOptions);
    const result = await res.json()
    toggle();
    // console.log(result.message)
    props.history.goBack()

  }
  const createTaskAssignment = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/user-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...taskInputs,
        task_id: taskId,
        user_id: userId,
        admin_id: adminId,
        progress: progress,
        keys: null
      }),
    });
    const result = await response.json();
    // console.log(result);
    if (result.success) {
      setErrors(result);
      window.location.reload();

    } else {
      setErrors(result.errors);
    }
  };

  const toggle = () => {
    setModal(!modal)
  };

  function groupByKey(array, key) {
    return array
      .reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
      }, {})
  }

  const getStudentSkills = async () => {

    const res = await fetch(`http://localhost:8000/api/user-skills-stage/${userId}`);
    const result = await res.json();
    // console.log(result.data);
    const grouped = Object.values(groupByKey(result.data, 'skill_id'));
    // console.log(grouped);
    const sortedGroups = grouped.map(group => {
      const sorted = group.sort(function (a, b) {
        var keyA = a.stage_id,
          keyB = b.stage_id;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      })
      return sorted
    });
    // console.log(sortedGroups);
    if (!sortedGroups.length == 0) {
      setStudentSkills(sortedGroups);
      getCohortStages()
    }
    else {
      setStudentSkills(-1)
      setStages([])
    }

  };
  // const getStudentSkills = async () => {

  //   const res = await fetch(`http://localhost:8000/api/user-skills/${userId}`);
  //   const result = await res.json();
    //console.log(result.data);
  //   setStudentSkills(result.data);
  // };

  const editProgress = async (id) => {
    const response = await fetch(`http://localhost:8000/api/user-task/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        progress: updatedProgress,
      }),
    });
    const result = await response.json();
    // console.log(result);
    if (result.success) {
      setErrors(result);
      window.location.reload();
    } else {
      setErrors(result.errors);
    }
  };

  useEffect(() => {
    getUser();
    getAdmins();
    getStudentTasks();
  }, [])
  return (
    <>
      <Row>
        <Col xl={12} lg={12} md={12} md={5}>
          <UserCard
            avatar={user1Image}
            title={user.user_first_name + ' ' + user.user_last_name}
            subtitle={user.active_inactive == 1 ? 'Active' : 'Alumni'}
            //text={props.match.params.name+ " Student"}
            style={{
              height: 300,
            }}
          />
        </Col>
      </Row>
      <Row className="m-2">
        <Col sm={12}>
          <Button
            className="mr-4"
            onClick={() => setEditUser(!editUser)}
            color="primary"
          >
            Edit Profile
            </Button>
          <Button
            className="mr-4"
            onClick={() => {
              setAssignmentForm(!assignmentForm);
            }}
            color="primary"
          >
            Current Tasks
            </Button>
          <Button
            className="mr-4"
            onClick={() => {
              setSkillForm(!skillForm);
              getStudentSkills();
            }}
            color="primary"
          >
            My Skill Map
            </Button>
          <Link to={{ pathname: `/user-absence-requests/${userId}` }}>
            <Button className="mr-4" color="primary">
              Absence Request
              </Button>
          </Link>

          <Button color="danger" onClick={toggle}>
            Delete Profile
            </Button>
          <Modal
            isOpen={modal}
            toggle={toggle}
          //   className={props.className}
          >
            <ModalHeader toggle={toggle}>
              You cannot undo this action !
              </ModalHeader>
            <ModalBody>
              Are you sure, you want to delete {user.user_first_name}'s
                profile?
              </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={deleteUser}>
                Confirm
                </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancel
                </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>

      <Row className="m-2" hidden={!skillForm}>
        <Col>
          <Card body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Skill Family</th>
                  <th>Skill</th>
                  {stages.map((st, stageKey) => (
                    <th key={stageKey}>{st.stage_name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>


                {studentSkills.map(group => <tr>
                  <td>{group[0].skill.skill_family}</td>
                  <td>{group[0].skill.name}</td>
                  {stages.map(stage => {
                    const skill = group.find(skill => skill.stage.id === stage.id);
                    return skill ?
                      <td>
                        <Form
                        >
                          <Input
                            max='3'
                            min='0'
                            type='number'
                            className="w-50"
                            defaultValue={skill.progress}
                            disabled={true}
                          />
                        </Form>
                      </td> : <td>
                        <Form>
                          <Input
                            max='3'
                            min='0'
                            type='number'
                            className="w-50"
                            defaultValue=""
                            disabled={true}
                          />
                        </Form>
                      </td>
                  }

                  )}

                </tr>)}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      <Row className="m-2" hidden={!assignmentForm}>
        <Col>
          <Row>
            <Col>
              {' '}
              <Card body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Task Name</th>
                      <th>Link</th>
                      <th>Type</th>
                      <th>Key Range</th>
                      <th>Team/Solo</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {user.stage &&
                      user.stage[0].task.map((t, taskKey) => (
                        <tr key={taskKey}>
                          <td> {taskKey + 1}</td>
                          <td>{t.task_name}</td>
                          <td>
                            <a href={t.task_link} target="_blank">
                              LINK
                              </a>
                          </td>
                          <td>{t.task_type}</td>
                          <td>{t.key_range}</td>
                          <td>{t.is_teamwork ? 'Teamwork' : 'Solo'}</td>
                          <td>{t.start_date}</td>
                          <td>{t.end_date}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card>{' '}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={3}>
              <h3>Assignment Form</h3>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Assignment Link
                  </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    placeholder="https://github.com/adam-azar/example-app"
                    onChange={catchInput}
                    name="assignment_link"
                  />
                  {errors.assignment_link ? (
                    <Alert color="danger">{errors.assignment_link} </Alert>
                  ) : (
                      ''
                    )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Tasks
                  </Label>
                <Col sm={9}>
                  <UncontrolledButtonDropdown addonType="append">
                    <DropdownToggle caret> {taskName} </DropdownToggle>
                    <DropdownMenu>
                      {user.stage &&
                        user.stage[0].task.map((t, key) => (
                          <DropdownItem
                            key={key}
                            onClick={() => {
                              setTaskId(t.id);
                              setTaskName(t.task_name);
                            }}
                          >
                            {t.task_name}
                          </DropdownItem>
                        ))}
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  {errors.task_id ? (
                    <Alert color="danger">{errors.task_id} </Alert>
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
                    <Alert color="danger">{errors.admin_id} </Alert>
                  ) : (
                      ''
                    )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Progress
                  </Label>
                <Col sm={9}>
                  <UncontrolledButtonDropdown addonType="append">
                    <DropdownToggle caret> {progress} </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setProgress(1)}>
                        1
                        </DropdownItem>
                      <DropdownItem onClick={() => setProgress(2)}>
                        2
                        </DropdownItem>
                      <DropdownItem onClick={() => setProgress(3)}>
                        3
                        </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  {errors.progress ? (
                    <Alert color="danger">{errors.progress} </Alert>
                  ) : (
                      ''
                    )}
                </Col>
              </FormGroup>
              <Button
                className="mr-4"
                onClick={createTaskAssignment}
                color="primary"
              >
                Submit
                </Button>
            </Col>
            <Col className="mt-2" sm={9}>
              <Card body>
                <h4>To Do List</h4>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Task Name</th>
                      <th>Assignment Link</th>
                      <th>Keys</th>
                      <th>Progress</th>
                      <th>Reviewed</th>
                      <th>Mentor</th>
                    </tr>
                  </thead>

                  <tbody>
                    {yourTasks.map((ts, tsKey) => (
                      ts.progress == 1 ?
                        <tr key={tsKey}>
                          <td>{ts.task.task_name}</td>
                          <td>
                            {' '}
                            <a href={ts.assignment_link} target="_blank">
                              LINK
                            </a>
                          </td>
                          <td>
                            {ts.keys}/{ts.task.key_range}
                          </td>
                          <td>
                            <Input className="w-50"
                              defaultValue={ts.progress}
                              disabled={editForm !== tsKey}
                              onChange={(e) => setUpdatedProgress(e.target.value)} />

                            <Button
                              hidden={editForm !== tsKey}
                              className="mr-3"
                              color="primary"
                              onClick={() => editProgress(ts.id)}
                            >
                              Submit
                                  </Button>
                          </td>
                          <td>{ts.reviewed ? "Reviewed" : "Pending"}</td>
                          <td>{ts.admin.username}</td>
                          <td>
                            <Button className="mr-3"
                              color="primary"
                              onClick={() =>
                                handleIndexClick(tsKey)
                              }>
                              Progress
                          </Button>
                          </td>
                        </tr> : ''
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="mt-2" >
              <Card body>
                <h4>Under Process</h4>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Task Name</th>
                      <th>Assignment Link</th>
                      <th>Keys</th>
                      <th>Progress</th>
                      <th>Reviewed</th>
                      <th>Mentor</th>
                    </tr>
                  </thead>

                  <tbody>
                    {yourTasks.map((ts, tsKey) => (
                      ts.progress == 2 ?
                        <tr key={tsKey}>
                          <td>{ts.task.task_name}</td>
                          <td>
                            {' '}
                            <a href={ts.assignment_link} target="_blank">
                              LINK
                            </a>
                          </td>
                          <td>
                            {ts.keys}/{ts.task.key_range}
                          </td>
                          <td>
                            <Input className="w-50"
                              defaultValue={ts.progress}
                              disabled={editForm !== tsKey}
                              onChange={(e) => setUpdatedProgress(e.target.value)} />

                            <Button
                              hidden={editForm !== tsKey}
                              className="mr-3"
                              color="primary"
                              onClick={() => editProgress(ts.id)}
                            >
                              Submit
                                  </Button>
                          </td>
                          <td>{ts.reviewed ? "Reviewed" : "Pending"}</td>
                          <td>{ts.admin.username}</td>
                          <td>
                            <Button className="mr-3"
                              color="primary"
                              onClick={() =>
                                handleIndexClick(tsKey)
                              }>
                              Progress
                          </Button>
                          </td>
                        </tr> : ''
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="mt-2">
              <Card body>
                <h4>Done</h4>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Task Name</th>
                      <th>Assignment Link</th>
                      <th>Keys</th>
                      <th>Progress</th>
                      <th>Reviewed</th>
                      <th>Mentor</th>
                    </tr>
                  </thead>

                  <tbody>
                    {yourTasks.map((ts, tsKey) => (
                      ts.progress == 3 ?
                        <tr key={tsKey}>
                          <td>{ts.task.task_name}</td>
                          <td>
                            {' '}
                            <a href={ts.assignment_link} target="_blank">
                              LINK
                            </a>
                          </td>
                          <td>
                            {ts.keys}/{ts.task.key_range}
                          </td>
                          <td>
                            <Input className="w-50"
                              defaultValue={ts.progress}
                              disabled={editForm !== tsKey}
                              onChange={(e) => setUpdatedProgress(e.target.value)} />

                            <Button
                              hidden={editForm !== tsKey}
                              className="mr-3"
                              color="primary"
                              onClick={() => editProgress(ts.id)}
                            >
                              Submit
                                  </Button>
                          </td>
                          <td>{ts.reviewed ? "Reviewed" : "Pending"}</td>
                          <td>{ts.admin.username}</td>
                          <td>
                            <Button className="mr-3"
                              color="primary"
                              onClick={() =>
                                handleIndexClick(tsKey)
                              }>
                              Progress
                          </Button>
                          </td>
                        </tr> : ''
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <div hidden={!editUser || assignmentForm || skillForm}>
        <Row className="m-2">
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Student Info</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={5}>
                      Email :
                      </Label>
                    <Col sm={7}>
                      <Input plaintext value={user.email} readOnly />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={5}>
                      Phone Number :
                      </Label>
                    <Col sm={7}>
                      <Input
                        plaintext
                        value={user.user_phone_number}
                        readOnly
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={5}>
                      Emergency Number :
                      </Label>
                    <Col sm={7}>
                      <Input
                        plaintext
                        value={user.user_emergency_number}
                        readOnly
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={5}>
                      Date Of Birth :
                      </Label>
                    <Col sm={7}>
                      <Input
                        plaintext
                        value={user.user_birth_date}
                        readOnly
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={5}>
                      Discord ID :
                      </Label>
                    <Col sm={7}>
                      <Input
                        plaintext
                        value={user.user_discord_id}
                        readOnly
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Additional info</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={4}>
                      Nationality :
                      </Label>
                    <Col sm={8}>
                      <Input
                        plaintext
                        value={user.user_nationality}
                        readOnly
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={4}>
                      Gender :
                      </Label>
                    <Col sm={8}>
                      <Input plaintext value={user.user_gender} readOnly />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={4}>
                      City :
                      </Label>
                    <Col sm={8}>
                      <Input plaintext value={user.user_city} readOnly />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={4}>
                      Address :
                      </Label>
                    <Col sm={8}>
                      <Input plaintext value={user.user_address} readOnly />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={4}>
                      Security Level :
                      </Label>
                    <Col sm={8}>
                      <Input
                        plaintext
                        value={user.user_security_level}
                        readOnly
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <div hidden={editUser}>
        <EditUser userInfo={user} />
      </div>
      <Navbar>
        <Nav navbar>
          <NavItem>
            <SourceLink>
              <img
                src={codilogo}
                width="120"
                height="60"
                className="pr-2 ml-4"
                alt=""
              />
                Codi Tech Lebanon About us
              </SourceLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
}
export default UserProfile;

