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
  Modal,
  ModalBody, ModalFooter, ModalHeader,
  
} from 'reactstrap';

const SoloTaskInfo = props => {
  const [taskStudents, setTaskStudents] = useState([]);
  const [modal, setModal] = useState(false);
  const [studentTaskId, setStudentTaskId] = useState();

  const [keys, setKeys] = useState();
  const [editForm, setEditForm] = useState(false);
  
  const [errors, setErrors] = useState(false);

  //const branchName=props.match.params.name;
  const taskId = props.match.params.id;

  const handleIndexClick = tsKey => {
    setEditForm(tsKey);
  };


  const getTaskStudents = async () => {
    
    const res = await fetch(`http://localhost:8000/api/user-task/${taskId}`);
    const result = await res.json();
    console.log(result.data);
    setTaskStudents(result.data);
  };

  const deleteTask=async(id)=>{
    const deleteRequestOptions = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //Authorization: "Bearer " + token,
        },};
    const res =await  fetch(`http://localhost:8000/api/user-task/${id}`,deleteRequestOptions);
    const result=await res.json()
    
    console.log(result.message)
    setModal(!modal)
    getTaskStudents();

 }

  const editKeys = async () => {
    const response = await fetch(`http://localhost:8000/api/user-task/${studentTaskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        keys:keys,
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

  

  useEffect(() => {
    getTaskStudents();
  }, []);

  return (
    <Row>
      <Col>
        <Card className="mb-3">
          <CardHeader>Solo Task Students</CardHeader>
          <CardBody>
            <Row>
              <Col>
                <Row className="mb-2">
                  <Col>
                    
                  </Col>
                </Row>
                <Row>
                  {/* ----------------------------------- */}

                 
                    <Col>
                      <Card body>
                        <Table responsive hover>
                          <thead>
                            <tr>
                              <th>Student</th>
                              <th>Assignment Link</th>
                              <th>Keys</th>
                              <th>Progress</th>
                              <th>Mentor</th>
                              
                            </tr>
                          </thead>

                          <tbody>
                            {taskStudents.map((ts, tsKey) => (
                              <tr key={tsKey}>
                                <td>{ts.user.user_first_name} {ts.user.user_last_name}</td>
                                <td> <a href={ts.assignment_link} target="_blank">LINK</a></td>
                                <td>
                                  <Input className="w-50" 
                                  defaultValue={ts.keys} 
                                  disabled={editForm!==tsKey} 
                                  onChange={(e)=>setKeys(e.target.value)}/> 

                                  <Button 
                                  hidden={editForm!==tsKey}
                                  className="mr-3"
                                  color="primary"
                                  onClick={editKeys}
                                  >
                                    Set Keys
                                  </Button>
                                  </td>
                                <td>{ts.progress}</td>
                                <td>{ts.admin.username}</td>
                                <td><Button className="mr-3"
                                  color="primary"
                                  onClick={()=>{handleIndexClick(tsKey);
                                    ;setStudentTaskId(ts.id)}}
                                  >
                                    Keys 
                                  </Button>

                                  <Button
                                  color="danger"
                                  onClick={()=>setModal(!modal)}>
                                    Delete 
                                  </Button>

                                  <Modal isOpen={modal}>
                                    <ModalHeader>You cannot undo this action !</ModalHeader>
                                    <ModalBody>
                                      Are you sure, you want to delete {ts.user.user_first_name}'s task ?
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button color="primary" onClick={()=>deleteTask(ts.id)}>
                                        Confirm
                                      </Button>{' '}
                                      <Button color="secondary" onClick={()=>setModal(!modal)}>
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
          <Button onClick={()=>props.history.goBack()} >Back</Button>
        </Card>
        
      </Col>
    </Row>
  );
};
export default SoloTaskInfo;
