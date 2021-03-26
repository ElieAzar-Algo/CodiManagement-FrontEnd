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
  ModalBody, ModalFooter, ModalHeader
  
} from 'reactstrap';

import './codiStyles/CodiDashboard.css';

const StageTasks = props => {
  const [tasks, setTasks] = useState([]);  
  const [createForm, setCreateForm] = useState(false);  
  const [modal, setModal] = useState(false);  
  const [taskInputs, setTaskInputs] = useState([]);
  const [errors, setErrors] = useState(false);


  const stageId = props.match.params.id;

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
                       
                          <Button className="mr-3"
                           color="primary"
                           onClick={()=>setCreateForm(!createForm)}
                          >
                            Create Task
                          </Button>

                          <Button className="mr-3"
                           color="primary"
                           onClick={()=>setCreateForm(!createForm)}
                          >
                            Create Task
                          </Button>
                        

                          <Button 
                          className="mr-3"
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
                    <Button className="mr-3"
                           color="primary"
                           onClick={createTask}
                          >
                            Submit 
                          </Button>
                          </Col>
                    </Row>
                    :
                    <Row>
                      <Col>
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
                                
                                
                              </tr>
                            </thead>

                            <tbody>
                              {tasks && tasks.map((task, taskKey) => (
                                <tr key={taskKey}>
                                  <td> {taskKey + 1}</td>
                                  <td>{task.task_name}</td>
                                  <td><a href={task.task_link} target="_blank">LINK</a></td>
                                  <td>{task.task_type}</td>
                                  <td>{task.key_range}</td>
                                  <td>
                                    {' '}
                                    <Link
                                      to={{
                                        pathname: ``,
                                      }}
                                    >
                                      <Button color="info"> More Info </Button>
                                    </Link>
                                  </td>
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
            </Card>

           
        
        </Col>
      
    </Row>
  );
};
export default StageTasks;
