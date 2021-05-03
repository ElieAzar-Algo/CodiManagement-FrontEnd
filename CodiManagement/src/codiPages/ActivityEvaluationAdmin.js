//import Page from 'components/Page';
import './codiStyles/CodiDashboard.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  CardText,
  CardImg,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Alert,
  UncontrolledAlert,
} from 'reactstrap';

const ActivityEvaluationAdmin = props => {
  const [additionalKeys, setAdditionalKeys] = useState([]);
  const [attendanceKeys, setAttendanceKeys] = useState([]);
  const [assignmentKeys, setAssignmentKeys] = useState([]);
  const [branchInputs, setBranchInputs] = useState([]);

  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState();
  const [errors, setErrors] = useState(false);

  const cohortId = props.match.params.id;

  const getAdditionalKeys = async () => {
    const res = await fetch(
      `http://localhost:8000/api/additional-keys/${cohortId}`,
    );
    const result = await res.json();
    setAdditionalKeys(result.data);
    console.log(result.data);
  };

  //attendance-keys/
  const getAttendanceKeys = async () => {
    const res = await fetch(
      `http://localhost:8000/api/attendance-keys/${cohortId}`,
    );
    const result = await res.json();
    setAttendanceKeys(result.data);
    console.log(result.data);
  };

  //task keys
  const getAssignmentKeys = async () => {
    const res = await fetch(
      `http://localhost:8000/api/task-keys/${cohortId}`,
    );
    const result = await res.json();
    setAssignmentKeys(result.data);
    console.log(result.data);
  };

  //   const editBranch = async e => {
  //     e.preventDefault();
  //     const response = await fetch(`http://localhost:8000/api/branch/${editId}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         //Authorization: "Bearer " + token,
  //       },
  //       body: JSON.stringify({
  //         ...branchInputs,

  //       }),
  //     });
  //     const result = await response.json();
  //     console.log(result);
  //     if (result.success) {
  //       setErrors(result);
  //       window.location.reload();
  //     } else {
  //       setErrors(result.errors);
  //     }
  //   };

    const deleteAdditionalKeys = async () => {
      console.log(editId)
      const deleteRequestOptions = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //Authorization: "Bearer " + token,
        },
      };
      const res = await fetch(
        `http://localhost:8000/api/additional-keys/${editId}`,
        deleteRequestOptions,
      );
      const result = await res.json();

      console.log(result.message);
      setModal(!modal);
      setEditId();
      getAdditionalKeys();

    };

  useEffect(() => {
    getAdditionalKeys();
    getAttendanceKeys();
    getAssignmentKeys();
  }, []);
var myDate=new Date();
  return (
    <Row>
      <Col>
        <Card className="mb-3">
          {/* <CardHeader>
            Mentors
            <Button
              className="ml-3"
              color="primary"
              onClick={() => setCreateForm(!createForm)}
            >
              Create New Mentor
            </Button>
          </CardHeader> */}
          <CardBody>
            {/* <Row hidden={!createForm}>
              <Col sm={6}>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Branch Name
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="text"
                      placeholder=""
                      onChange={catchInput}
                      name="branch_name"
                    />
                    {errors.branch_name ? (
                      <UncontrolledAlert color="danger">
                        {errors.branch_name}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Branch Country
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="text"
                      onChange={catchInput}
                      name="branch_country"
                    />
                    {errors.branch_country ? (
                      <UncontrolledAlert color="danger">
                        {errors.branch_country}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Branch Location
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="text"
                      onChange={catchInput}
                      name="branch_location"
                    />
                    {errors.branch_location ? (
                      <UncontrolledAlert color="danger">
                        {errors.branch_location}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                    <Button color="primary" onClick={createBranch}>
                      Submit
                    </Button>
                  </Col>
                </FormGroup>
              </Col>
            </Row> */}
{/* 
            <Row hidden={!editForm}>
              <Col sm={6}>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Branch Name
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="text"
                      placeholder=""
                      onChange={catchInput}
                      name="branch_name"
                    />
                    {errors.branch_name ? (
                      <UncontrolledAlert color="danger">
                        {errors.branch_name}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Branch Country
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="text"
                      onChange={catchInput}
                      name="branch_country"
                    />
                    {errors.branch_country ? (
                      <UncontrolledAlert color="danger">
                        {errors.branch_country}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Branch Location
                  </Label>
                  <Col sm={7}>
                    <Input
                      type="text"
                      onChange={catchInput}
                      name="branch_location"
                    />
                    {errors.branch_location ? (
                      <UncontrolledAlert color="danger">
                        {errors.branch_location}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                    <Button color="primary" onClick={editBranch}>
                      Submit
                    </Button>
                  </Col>
                </FormGroup>
              </Col>
            </Row> */}

            <Row>
              <Col>
                <Card body>
                  <h3>Attendance's Keys</h3>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th style={{width:"12%"}}>Date</th>
                        <th style={{width:"15%"}}>Name</th>
                        <th style={{width:"10%"}}>Description</th>
                        <th style={{width:"10%"}}>Keys</th>
                        <th style={{width:"38%"}}>comment</th>
                      </tr>
                    </thead>
                    <tbody>

                      { attendanceKeys.map((atKeys, key) => (
                      
                        
                        <tr key={key}>
                          
                      <td>{atKeys.attendance_day.attendance_date}</td>
                          <td>{atKeys.user.user_first_name} {atKeys.user.user_last_name}</td>
                          <td><p>{atKeys.attendance_status?atKeys.attendance_status.status:""}</p></td>
                          <td>{atKeys.attendance_key_amount}</td>
                          <td>{atKeys.comment}</td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
  {/* -----------------------------------TASKS KEYS TABLE------------------------------------ */}

            <Row>
              <Col>
                <Card body>
                  <h3>Task's Keys</h3>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th style={{width:"15%"}}>Date</th>
                        <th style={{width:"17%"}}>Name</th>
                        <th style={{width:"25%"}}>Description</th>
                        <th style={{width:"13%"}}>Keys</th>
                        <th style={{width:"15%"}}>Done As</th>
                      </tr>
                    </thead>
                    <tbody>

                      { assignmentKeys.map((atKeys, key) => (
                      
                        
                        <tr key={key}>
                          
                          <td>{moment(atKeys.updated_at).format("YYYY/MM/DD")}</td>
                          <td>{atKeys.user.user_first_name + " "+ atKeys.user.user_last_name}</td>
                          <td><p>{atKeys.task.task_name}</p></td>
                          <td>{atKeys.keys}</td>
                          <td>{atKeys.task.is_teamwork?'Teamwork':'Individual'}</td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
  {/* -----------------------------------ADDITIONAL KEYS TABLE------------------------------------ */}
            <Row>
              <Col>
                <Card body>
                  <h3>Additional Keys</h3>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th style={{width:"12%"}}>Date</th>
                        <th style={{width:"15%"}}>Name</th>
                        <th style={{width:"13%"}}>Keys</th>
                        <th style={{width:"45%"}}>Description</th>
                      </tr>
                    </thead>
                    <tbody>

                      { additionalKeys.map((adKeys, key) => (
                      
                        
                        <tr key={key}>
                          
                      <td>{moment(adKeys.created_at).format("YYYY/MM/DD")}</td>
                          <td>{adKeys.user.user_first_name?adKeys.user.user_first_name + " "+ adKeys.user.user_last_name:'CLASS'}</td>
                          <td>{adKeys.key}</td>
                          <td><p style={{fontSize:'small'}}>{adKeys.description}</p></td>
                          <td>
                            <Button
                              className="mr-2"
                              size="sm"

                              onClick={e => {
                                setEditForm(!editForm);
                                setEditId(adKeys.id);
                              }}
                              color="primary"
                            >
                              {' '}
                              Edit{' '}
                            </Button>
                            <Button
                              onClick={() => {
                                setModal(!modal);
                                setEditId(adKeys.id);
                              }}
                              color="danger"
                              size="sm"
                            >
                              {' '}
                              Del{' '}
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
                                {adKeys.user.user_first_name}'s keys? 
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="primary"
                                  onClick={() => deleteAdditionalKeys()}
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
          </CardBody>
          <Button onClick={() => props.history.goBack()}>Back</Button>
        </Card>
      </Col>
    </Row>
  );
};
export default ActivityEvaluationAdmin;
