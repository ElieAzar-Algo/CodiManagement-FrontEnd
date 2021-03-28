import React,{useEffect,useState}from 'react';
//import {Link} from 'react-router-dom';
import {Row,Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Modal,
  Alert,ModalBody, ModalFooter, ModalHeader,UncontrolledButtonDropdown,Table,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,} from 'reactstrap';
import { UserCard } from '../components/Card';
import user1Image from '../assets/img/users/100_1.jpg';
import EditUser from './EditUser';




const UserProfile = (props) => {
    const [user, setUser] = useState({});
    const [modal, setModal] = useState(false);
    const [editUser, setEditUser] = useState(true);

    const [assignmentForm, setAssignmentForm] = useState(false);
    const [progress, setProgress] = useState(1);

    const [taskInputs, setTaskInputs] = useState([]);
    const [taskId, setTaskId] = useState();
    const [taskName, setTaskName] = useState('Tasks');
    const [yourTasks, setYourTasks] = useState([]);
    
    const [admins, setAdmins] = useState([]);
    const [adminId, setAdminId] = useState();
    const [adminName, setAdminName] = useState('Mentors');
  const [errors, setErrors] = useState(false);


    

    const userId=props.match.params.id;

    const catchInput = e => {
      e.persist();
      setTaskInputs({
        ...taskInputs,
        [e.target.name]: e.target.value,
      });
      console.log(taskInputs);
    };

   const  getUser =async ()=>{
       const res =await  fetch(`http://localhost:8000/api/user/${userId}`);
       const result=await res.json()
       console.log(result.data[0])
      setUser(result.data[0])
     }

      const  getAdmins =async ()=>{
      const res =await  fetch(`http://localhost:8000/api/admin`);
      const result=await res.json()
      console.log(result.data)
      setAdmins(result.data)
      }

      const  getStudentTasks =async ()=>{
        const res =await  fetch(`http://localhost:8000/api/user-task-individually/${userId}`);
        const result=await res.json()
        console.log(result.data)
        setYourTasks(result.data)
        }

      
     const deleteUser=async()=>{


        const deleteRequestOptions = {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              //Authorization: "Bearer " + token,
            },};
        const res =await  fetch(`http://localhost:8000/api/user/${userId}`,deleteRequestOptions);
        const result=await res.json()
        toggle();
        console.log(result.message)
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
          user_id:userId,
          admin_id:adminId,
          progress:progress,
          keys:null
        }),
      });
      const result = await response.json();
      console.log(result);
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

     useEffect(()=>{
        getUser();
        getAdmins();
        getStudentTasks();
      },[])
    return(
        <>
        
        <Row>
        <Col xl={12} lg={12} md={12} md={5}>
          <UserCard
          
            avatar={user1Image}
            title={user.user_first_name+" "+user.user_last_name}
            subtitle={user.active_inactive==1?'Active':'Alumni'}
            text={props.match.params.name+ " Student"}
            style={{
              height: 300,
            
            }}
          />
        </Col>
        </Row>
            <Row className="m-2">
            <Col sm={6}>
                
            <Button className="mr-4" onClick={()=>setEditUser(!editUser)} color="primary">Edit Profile</Button>
            <Button className="mr-4" onClick={()=>{setAssignmentForm(!assignmentForm)}} color="primary">Current Tasks</Button>
                
            <Button color="danger" onClick={toggle}>Delete Profile</Button>
                <Modal
                  isOpen={modal}
                  toggle={toggle}
                //   className={props.className}
                >
                  <ModalHeader toggle={toggle}>You cannot undo this action !</ModalHeader>
                  <ModalBody>
                     Are you sure, you want to delete {user.user_first_name}'s profile?
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
          
          
           

            
            <Row className='m-2'hidden={!assignmentForm}>
              <Col>
              <Row>
              <Col >
                        {' '}
                        <Card body>
                    
                          <Table hover>
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
                              {user.stage && user.stage[0].task.map((t, taskKey) => (
                                <tr key={taskKey}>
                                  <td> {taskKey + 1}</td>
                                  <td>{t.task_name}</td>
                                  <td><a href={t.task_link} target="_blank">LINK</a></td>
                                  <td>{t.task_type}</td>
                                  <td>{t.key_range}</td>
                                  <td>{t.is_teamwork?'Teamwork':'Solo'}</td>
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
                <Col sm={4}>
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
                        {user.stage && user.stage[0].task.map((t, key) => (
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
                        
                          <DropdownItem onClick={() => setProgress(1)}>1</DropdownItem>
                          <DropdownItem onClick={() => setProgress(2)}>2</DropdownItem>
                          <DropdownItem onClick={() => setProgress(3)}>3</DropdownItem>
                    
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    {errors.progress ? (
                      <Alert color="danger">{errors.progress} </Alert>
                    ) : (
                      ''
                    )}
                     </Col>
                    </FormGroup>
            <Button className="mr-4" onClick={createTaskAssignment} color="primary">Submit</Button>
                    
                </Col>
                <Col className="mt-2" sm={8}>
                      <Card body>
                        <Table hover>
                          <thead>
                            <tr>
                              
                              <th>Task Name</th>
                              <th>Assignment Link</th>
                              <th>Keys</th>
                              <th>Progress</th>
                              <th>Mentor</th>
                              
                            </tr>
                          </thead>

                          <tbody>
                            {yourTasks.map((ts, tsKey) => (
                              <tr key={tsKey}>
                                <td>{ts.task.task_name}</td>
                                <td> <a href={ts.assignment_link} target="_blank">LINK</a></td>
                                <td>{ts.keys}/{ts.task.key_range}</td>
                                <td>{ts.progress}</td>
                                <td>{ts.admin.username}</td>
                              
                               
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                </Row>
                </Col>
                
            </Row>
            <div hidden={!editUser||assignmentForm}>
        <Row className="m-2">
          
        <Col  xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Student Info</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Email : 
                  </Label>
                  <Col sm={7}>
                    <Input
                      plaintext
                      value={user.email}
                      readOnly
                    
                      
                      
                    />
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


        <Col  xl={6} lg={12} md={12}>
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
                    <Input
                     plaintext
                     value={user.user_gender}
                     readOnly
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    City : 
                  </Label>
                  <Col sm={8}>
                    <Input
                     plaintext
                     value={user.user_city}
                     readOnly
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Address : 
                  </Label>
                  <Col sm={8}>
                    <Input
                      plaintext
                      value={user.user_address}
                      readOnly
                    />
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
           <EditUser  userInfo={user}/>
           </div>
        
        </>
    )
}
export default UserProfile;

