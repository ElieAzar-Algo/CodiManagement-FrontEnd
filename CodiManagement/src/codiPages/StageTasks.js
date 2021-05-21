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
  FormGroup,
  Alert,
  Label,Modal,
  ModalBody, ModalFooter, ModalHeader,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  
} from 'reactstrap';

import './codiStyles/CodiDashboard.css';

const StageTasks = props => {
  const [tasks, setTasks] = useState([]);  
  const [teamwork, setTeamwork] = useState(0);  
  const [createForm, setCreateForm] = useState(false);  
  const [editForm, setEditForm] = useState(false);  
  const [modal, setModal] = useState(false);  
  const [taskInputs, setTaskInputs] = useState([]);

  const [errors, setErrors] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [disabled, setDisabled] = useState(-1);
  const [hidden, setHidden] = useState(false);


  const stageId = props.match.params.id;
  const cohortId = props.match.params.cohortId;
  const branchId = props.location.state.branch;


  const handleIndexClick = key => {
    if (disabled==key){
      setDisabled(-1);
    }else{
    setDisabled(key);}
  };

  const catchInput = e => {
    e.persist();
    setTaskInputs({
      ...taskInputs,
      [e.target.name]: e.target.value,
    });
    console.log(taskInputs);
  };

  const getTasks = async () => 
  {
    const res = await fetch(`http://localhost:8000/api/stage-tasks/${stageId}`);
    const result = await res.json();
    console.log(result.data.task);
    setTasks(result.data.task);
  };

  const createTask = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...taskInputs,
        stage_id: stageId,
        is_teamwork:teamwork,
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
  const deleteRecord = async () => {
    const deleteRequestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: "Bearer " + token,
      },
    };
    const res = await fetch(
      `http://localhost:8000/api/stage/${stageId}`,
      deleteRequestOptions,
    );
    const result = await res.json();
    console.log(result.message);
    props.history.goBack();
  };

  const deleteTask=async()=>
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
      `http://localhost:8000/api/task/${deleteId}`,
      deleteRequestOptions,
    );
    const result = await res.json();

    console.log(result.message);
    setModal(!modal);
    getTasks();
  }


  const editTask = async (id) => {
    
    const response = await fetch(`http://localhost:8000/api/task/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...taskInputs,
        is_teamwork:teamwork,

      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      getTasks();
    } else {
      setErrors(result.errors);
    }
  };

  
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Row>
      
        <Col>
          
            <Card className="mb-3">
              <CardHeader>
                Stage's Tasks{' '}
               
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Row className="mb-2">
                      <Col>
                       
                          <Button 
                          size='sm'
                          className="mr-2"
                           color="primary"
                           onClick={()=>setCreateForm(!createForm)}
                          >
                            Create Task
                          </Button>

                          <Link to={{
                              pathname: `/teams/${stageId}/${cohortId}`,
                              state:{
                                branch:branchId
                              }
                              
                                    }}>  <Button 
                          className="mr-2"
                           color="primary"
                           size='sm'
                           >
                            Teams
                          </Button>
                          </Link>

                          <Link to={{ pathname: `/activity-evaluation-admin/${cohortId}/stage/${stageId}` }}>
                            <Button  size='sm' className="mr-2" color="primary">
                              Activity Evaluation
                          </Button>
                          </Link>

                          <Button 
                          size='sm'
                          className="mr-2"
                           color="danger"
                           onClick={()=>setModal(!modal)}>
                            Delete Stage
                          </Button>
                          <Modal
                  isOpen={modal}
                  
                //   className={props.className}
                >
                  <ModalHeader >You cannot undo this action !</ModalHeader>
                  <ModalBody>
                     Are you sure, you want to delete this stage?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={deleteRecord}>
                      Confirm
                    </Button>{' '}
                    <Button color="secondary" onClick={()=>setModal(!modal)}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                       
               
                  
                      </Col>
                    </Row>
                    {createForm?
                    <Row>
                      <Col sm={6}>
                         <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Task Name
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          placeholder=""
                          onChange={catchInput}
                          name="task_name"
                        />
                        {errors.task_name ? (
                          <Alert color="danger">{errors.task_name} </Alert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Task Link
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          placeholder=""
                          onChange={catchInput}
                          name="task_link"
                        />
                        {errors.task_link ? (
                          <Alert color="danger">{errors.task_link} </Alert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Task Type
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          placeholder=""
                          onChange={catchInput}
                          name="task_type"
                        />
                        {errors.task_type ? (
                          <Alert color="danger">{errors.task_type} </Alert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Key Range
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="number"
                          placeholder=""
                          onChange={catchInput}
                          name="key_range"
                        />
                        {errors.key_range ? (
                          <Alert color="danger">{errors.key_range} </Alert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <UncontrolledButtonDropdown addonType="append">
                      <DropdownToggle caret>{teamwork?'Teamwork':'solo'} </DropdownToggle>
                      <DropdownMenu>
                       
                          <DropdownItem onClick={()=>setTeamwork(1)}> Teamwork</DropdownItem>
                          <DropdownItem onClick={()=>setTeamwork(0)}> solo</DropdownItem>
                      
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    {errors.is_teamwork ? (
                      <Alert color="danger">{errors.is_teamwork} </Alert>
                    ) : (
                      ''
                    )}


                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Start Date
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="date"
                          placeholder=""
                          onChange={catchInput}
                          name="start_date"
                        />
                        {errors.start_date ? (
                          <Alert color="danger">{errors.start_date} </Alert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        End Date
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="date"
                          placeholder=""
                          onChange={catchInput}
                          name="end_date"
                        />
                        {errors.end_date ? (
                          <Alert color="danger">{errors.end_date} </Alert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>
                    <Button className="mr-3"
                           color="primary"
                           onClick={createTask}
                          >
                            Submit 
                          </Button>
                          </Col>
                    </Row>
                    :editForm?(
                    <Row>
                      <Col sm={6}>
                         <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Task Name
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          placeholder=""
                          onChange={catchInput}
                          name="task_name"
                        />
                       
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Task Link
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          placeholder=""
                          onChange={catchInput}
                          name="task_link"
                        />
                       
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Task Type
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          placeholder=""
                          onChange={catchInput}
                          name="task_type"
                        />
                       
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Key Range
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="number"
                          placeholder=""
                          onChange={catchInput}
                          name="key_range"
                        />
                        
                      </Col>
                    </FormGroup>

                    <UncontrolledButtonDropdown addonType="append">
                      <DropdownToggle caret>{teamwork?'Teamwork':'solo'} </DropdownToggle>
                      <DropdownMenu>
                       
                          <DropdownItem onClick={()=>setTeamwork(1)}> Teamwork</DropdownItem>
                          <DropdownItem onClick={()=>setTeamwork(0)}> solo</DropdownItem>
                      
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                   

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Start Date
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="date"
                          placeholder=""
                          onChange={catchInput}
                          name="start_date"
                        />
                        {errors.start_date ? (
                          <Alert color="danger">{errors.start_date} </Alert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        End Date
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="date"
                          placeholder=""
                          onChange={catchInput}
                          name="end_date"
                        />
                        {errors.end_date ? (
                          <Alert color="danger">{errors.end_date} </Alert>
                        ) : (
                          ''
                        )}
                      </Col>
                    </FormGroup>
                    <Button className="mr-3"
                           color="primary"
                           onClick={editTask}
                          >
                            Submit 
                          </Button> 

                          <Button className="mr-3"
                           color="primary"
                           onClick={()=>setEditForm(!editForm)}
                          >
                            Back 
                          </Button>
                          </Col>
                    </Row>
                    ):
                    <Row>
                      <Col>
                        {' '}
                        <Card body>
                    
                          <Table responsive hover>
                            <thead>
                              <tr>
                             
                                <th  style={{fontSize:"small", width: '20%' }}>Task Name</th>
                                <th style={{fontSize:"small", width: '7%' }}>Link</th>
                                <th style={{fontSize:"small", width: '15%' }}>Type</th>
                                <th style={{ fontSize:"small", width: '8%' }}>Key Range</th>
                                <th style={{ fontSize:"small", width: '8%' }}>Team/Solo</th>
                                <th style={{fontSize:"small",  width: '8%' }}>Start Date</th>
                                <th style={{fontSize:"small",  width: '8%' }}>End Date</th>
                                <th style={{fontSize:"small",  width: '30%' }}></th>
                                {/* <th style={{ width: '15%' }}></th> */}
                                
                                
                              </tr>
                            </thead>

                            <tbody>
                              {tasks && tasks.map((task, taskKey) => (
                                <tr key={taskKey}>
                                 
                                  {/* <td>{task.task_name}</td> */}
                                  <td> <Input
                                   style={{fontSize:"small"}}
                                defaultValue={task.task_name}
                                disabled={disabled!==taskKey}
                                type="text"
                                id="task_name"
                                name="task_name"
                                onChange={e => {
                                  catchInput(e);
                                }}
                              /></td>
                                  <td >
                                    <a  hidden={disabled==taskKey} href={task.task_link} target="_blank">LINK</a>
                                    <Input
                                     style={{fontSize:"small"}}
                                      defaultValue={task.task_link}
                                      hidden={disabled!==taskKey}
                                      type="text"
                                      id="task_link"
                                      name="task_link"
                                      onChange={e => {
                                        catchInput(e);
                                      }}
                                    />
                                    </td>
                                  
                                  {/* <td>{task.task_type}</td> */}
                                  <td>
                                  <Input
                                   style={{fontSize:"small"}}
                                      defaultValue={task.task_type}
                                      disabled={disabled!==taskKey}
                                      type="text"
                                      id="task_type"
                                      name="task_type"
                                      onChange={e => {
                                        catchInput(e);
                                      }}
                                    />
                                  </td>
                                  {/* <td>{task.key_range}</td> */}
                                  <td>
                                  <Input
                                   style={{fontSize:"small"}}
                                      defaultValue={task.key_range}
                                      disabled={disabled!==taskKey}
                                      type="text"
                                      id="key_range"
                                      name="key_range"
                                      onChange={e => {
                                        catchInput(e);
                                      }}
                                    />
                                  </td>
                                  <td disabled={disabled==taskKey}>{task.is_teamwork?'Teamwork':'Solo'}</td>
                                  {/* <td>
                                  <Input
                                      defaultValue={task.is_teamwork?'Teamwork':'Solo'}
                                      disabled={disabled!==taskKey}
                                      type="text"
                                      id="is_teamwork"
                                      name="is_teamwork"
                                      onChange={e => {
                                        catchInput(e);
                                      }}
                                    />
                                  </td> */}
                                  <td  hidden={disabled!==taskKey}>
                                  
                                  <UncontrolledButtonDropdown addonType="append">
                                    <DropdownToggle caret>{teamwork?'Teamwork':'solo'} </DropdownToggle>
                                    <DropdownMenu>
                                    
                                        <DropdownItem onClick={()=>setTeamwork(1)}> Teamwork</DropdownItem>
                                        <DropdownItem onClick={()=>setTeamwork(0)}> Solo</DropdownItem>
                                    
                                    </DropdownMenu>
                                  </UncontrolledButtonDropdown>
                                  </td>
                                  {/* <td>{task.start_date}</td> */}
                                    <td style={{fontSize:"small"}} hidden={disabled==taskKey}>{task.start_date}</td>
                                    <td style={{ width: '70%' }} hidden={disabled!==taskKey}> 
                                    <Input
                                    style={{fontSize:"small"}}
                                    defaultValue={task.start_date}
                                    style={{ width: '80%' }}
                                      type="date"
                                      onChange={catchInput}
                                      name="start_date"
                                  /></td> 

                                  {/* <td>{task.end_date}</td> */}

                                  <td  style={{fontSize:"small"}} hidden={disabled==taskKey}>{task.end_date}</td>
                                    <td style={{ width: '70%' }} hidden={disabled!==taskKey}> 
                                    <Input
                                    style={{fontSize:"small"}}
                                    defaultValue={task.end_date}
                                    style={{ width: '80%' }}
                                      type="date"
                                      onChange={catchInput}
                                      name="end_date"
                                  /></td> 


                                 {task.is_teamwork?
                                  <td>
  
                                    <Link
                                      to={{
                                         pathname: ``,
                                      }}
                                    >
                                      <Button hidden={hidden} size='sm' color="info"> More Info </Button>
                                    </Link>
                                    <Button 
                                    disabled={disabled==-1?!disabled:disabled!==taskKey}
                                    hidden={disabled==taskKey}
                                    className="ml-2"
                                    size='sm'
                                    color="primary"
                                    onClick={()=>{handleIndexClick(taskKey);
                                    // setStageId(stage.id);
                                    
                                    setHidden(true)
                                    }} >
                                    Edit
                                  </Button>
                                  <Button 
                                   
                                    hidden={hidden}
                                    className="ml-2"
                                    size='sm'
                                    color="danger"
                                    onClick={() => {setModal(!modal);setDeleteId(task.id)}}

                                   >
                                    Delete
                                  </Button>
                                  </td>
                                  :
                                  <td>
  
                                    <Link
                                      to={{
                                         pathname: `/solo-task-info/${task.id}`,
                                      }}
                                    >
                                      <Button 
                                      hidden={hidden}
                                      size='sm'
                                      color="info"> More Info </Button>
                                    </Link>
                                    <Button 
                                    disabled={disabled==-1?!disabled:disabled!==taskKey}
                                    hidden={disabled==taskKey}
                                    className="ml-2"
                                    size='sm'
                                    color="primary"
                                    onClick={()=>{handleIndexClick(taskKey);
                                    // setStageId(stage.id);
                                    
                                    setHidden(true)
                                    }} >
                                    Edit
                                  </Button>
                                  <Button 
                                   
                                    hidden={hidden}
                                    className="ml-2"
                                    size='sm'
                                    color="danger"
                                    onClick={() => {setModal(!modal);setDeleteId(task.id)}}

                                   >
                                    Delete
                                  </Button>
                                  </td>
                                  }

                                    <td  hidden={disabled!==taskKey}>
                                    
                              <Button 
                                 
                                  size="sm" 
                                  className=" "
                                  color="warning" 
                                  onClick={(e)=>{ 
                                  e.preventDefault();
                                  editTask(task.id); 
                                  handleIndexClick(-1)
                                  setHidden(false)
                              }}>
                                Submit Changes
                                </Button>
                                    </td>


                                  {/* <td><Button className="mr-3"
                                  color="primary"
                                  onClick={()=>{setEditForm(!editForm);setTaskId(task.id)}}
                                  >
                                    Edit Task
                                  </Button>
                                 </td> */}
                                </tr>
                              ))}

                            </tbody>
                          </Table>
                        </Card>{' '}
                      </Col>
                    </Row>}
                  </Col>
                </Row>
              </CardBody>
              <Button onClick={()=>props.history.goBack()} >Back</Button>
            </Card>

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
                                        onClick={() => deleteTask()}
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
        
        </Col>
      
    </Row>
  );
};
export default StageTasks;
