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
import { NumberWidget, IconWidget } from 'components/Widget';


const ActivityEvaluationAdmin = props => {
  const [additionalKeys, setAdditionalKeys] = useState([]);
  const [classKeys, setClassKeys] = useState([]);
  const [attendanceKeys, setAttendanceKeys] = useState([]);
  const [assignmentKeys, setAssignmentKeys] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [additionalKeysInputs, setAdditionalKeysInputs] = useState([]);

  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('Student');
  const [studentId, setStudentId] = useState();

  const [createForm, setCreateForm] = useState(false);
  const [createFormClassKeys, setCreateFormClassKeys] = useState(false);
  
  const [modal, setModal] = useState(false);
  const [modalClassKeys, setModalClassKeys] = useState(false);
  const [deleteTargetModel, setDeleteTargetModel] = useState(false);

  const [editId, setEditId] = useState();
  const [errors, setErrors] = useState(false);
  const [disabled, setDisabled] = useState(-1);
  const [disabledClassKeys, setDisabledClassKeys] = useState(-1);
  const [totalAdditional, setTotalAdditional] = useState();
  const [totalTeam, setTotalTeam] = useState();
  const [totalAttendance, setTotalAttendance] = useState();
  const [totalAssignment, setTotalAssignment] = useState();
  const [total, setTotal] = useState(0);


  const cohortId = props.match.params.id;

  //handle click additional Keys table
  const handleIndexClick = additionalKeysRecord => {
    if(disabled!==additionalKeysRecord){
    setDisabled(additionalKeysRecord);}
    else{
      setDisabled(-1)
    }
  };

  //handle click class Keys table
  const handleIndexClickClassKeys = classKeysRecord => {
    if(disabledClassKeys!==classKeysRecord){
    setDisabledClassKeys(classKeysRecord);}
    else{
      setDisabledClassKeys(-1)
    }
  };

  //catch all inputs
  const catchInput = e => {
    e.persist();
    setAdditionalKeysInputs({
      ...additionalKeysInputs,
      [e.target.name]: e.target.value,
    });
    // console.log(additionalKeysInputs);
  };

  //create new additional keys record
  const addAdditionalKeys = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/additional-keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
          user_id:studentId,
        ...additionalKeysInputs,
        
      }),
    });
    const result = await response.json();
    // console.log(result);
    if (result.success) {
      setErrors(result);
      getAdditionalKeys();
      setCreateForm(false)
      document.getElementById('additionalKeys').value=""
      document.getElementById('additionalKeysDescription').value=""
      
      //studentsDropDown
      setStudentName('Students') 
    
    } else {
      setErrors(result.errors);
    }
  };

  //create new class keys record
  const addClassKeys = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/class-keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
          cohort_id:cohortId,
        ...additionalKeysInputs,
        
      }),
    });
    const result = await response.json();
    // console.log(result);
    if (result.success) {
      setErrors(result);
      getClassKeys()
      setCreateFormClassKeys(false)
      document.getElementById('teamName').value=""
      document.getElementById('classKeys').value=""
      document.getElementById('classKeysDescription').value=""
      
    } else {
      setErrors(result.errors);
    }
  };

  //create new cohort target keys record
  const addTargetKeys = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/target-keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
          cohort_id:cohortId,
        target:document.querySelector('#targetInput').value,
        
      }),
    });
    const result = await response.json();
    // console.log(result);
    if (result.success) {
      setErrors(result);
      document.querySelector('#targetInput').hidden=true;
      getTargetKeys();
      
    } else {
      setErrors(result.errors);
    }
  };

  //get cohort students (dropdown select)
  const getCohortStudents = async () => {

    const res = await fetch(`http://localhost:8000/api/user-byCohort/${cohortId}`);
    const result = await res.json();
    console.log(result.data);
    setStudents(result.data);

  };

// get cohort target (up right card)
  const getTargetKeys = async () => {
    const res = await fetch(
      `http://localhost:8000/api/target-keys/${cohortId}`,
    );
    const result = await res.json();
    setTargetKeys(result.data);
    // console.log(result.data);
  };
  
  //get additional keys info (additional keys table)
  const getAdditionalKeys = async () => {
    const res = await fetch(
      `http://localhost:8000/api/additional-keys/${cohortId}`,
    );
    const result = await res.json();
    setAdditionalKeys(result.data);
    setAdditionalKeysInputs([]);
    //console.log(result.data);
    // 
    let t=0;
    for (let i=0; i<result.data.length;i++){
      t+=result.data[i].key
    }
    setTotalAdditional(t);
  };

  //get class keys info (class keys table)
  const getClassKeys = async () => {
    const res = await fetch(
      `http://localhost:8000/api/class-keys/${cohortId}`,
    );
    const result = await res.json();
    setClassKeys( result.data);
    setAdditionalKeysInputs([]);
   
    let t=0;
    for (let i=0; i<result.data.length;i++){
      t+=result.data[i].key
    }
    setTotalTeam(t);
  };

    //get attendance keys info (attendance keys table)
  const getAttendanceKeys = async () => {
    const res = await fetch(
      `http://localhost:8000/api/attendance-keys/${cohortId}`,
    );
    const result = await res.json();
    setAttendanceKeys(result.data);
    //console.log(result.data);
    let t=0;
    for (let i=0; i<result.data.length;i++){
      t+=result.data[i].attendance_key_amount
    }
    setTotalAttendance(t);
  };

      //get assignment keys info (assignment keys table)
  const getAssignmentKeys = async () => {
    const res = await fetch(
      `http://localhost:8000/api/task-keys/${cohortId}`,
    );
    const result = await res.json();
    setAssignmentKeys(result.data);
     console.log(result.data);
     let t=0;
    for (let i=0; i<result.data.length;i++){
      t+=result.data[i].keys
    }
    setTotalAssignment(t);
  };

// edit additional keys info
    const editAdditionalKeys = async e => {
      e.preventDefault();
      const response = await fetch(`http://localhost:8000/api/additional-keys/${editId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          //Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          ...additionalKeysInputs,

        }),
      });
      const result = await response.json();
      // console.log(result);
      if (result.success) {
        setErrors(result);
      setDisabled(-1)
      setEditId();

        // getAdditionalKeys()
      } else {
        setErrors(result.errors);
      }
    };

// edit class keys info
    const editClassKeys = async e => {
      e.preventDefault();
      const response = await fetch(`http://localhost:8000/api/class-keys/${editId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          //Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          ...additionalKeysInputs,

        }),
      });
      const result = await response.json();
      // console.log(result);
      if (result.success) {
        setErrors(result);
      setDisabledClassKeys(-1)
      setEditId();

        // getAdditionalKeys()
      } else {
        setErrors(result.errors);
      }
    };
    
    //deleteCohortTarget
    const deleteCohortTarget = async () => {
      let cohortTargetId=targetKeys.id
      const deleteRequestOptions = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //Authorization: "Bearer " + token,
        },
      };
      const res = await fetch(
        `http://localhost:8000/api/target-keys/${cohortTargetId}`,
        deleteRequestOptions,
      );
      const result = await res.json();

       console.log(result.message);
     
      window.location.reload()

    };


// delete additional keys info
    const deleteAdditionalKeys = async () => {
      // console.log(editId)
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

      // console.log(result.message);
      setModal(!modal);
      // setEditId();
      // getAdditionalKeys();
      window.location.reload()

    };

// delete class keys info
    const deleteClassKeys = async () => {
      // console.log(editId)
      const deleteRequestOptions = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          //Authorization: "Bearer " + token,
        },
      };
      const res = await fetch(
        `http://localhost:8000/api/class-keys/${editId}`,
        deleteRequestOptions,
      );
      const result = await res.json();

      // console.log(result.message);
      setModalClassKeys(!modalClassKeys);
      // setEditId();
      // getClassKeys();
      window.location.reload();
    };

    // const sumFunction =async ()=>{
    //   let t=0;
    //   for (let i=0; i<classKeys.length;i++){
    //     t+=classKeys[i].key
    //   }
    //   setTotalArray([...totalArray,t]);
    // }

  useEffect(() => {
  
    getAdditionalKeys();
    getAttendanceKeys();
    getAssignmentKeys();
    getClassKeys();
    getTargetKeys();
    
    
  }, []);

  return (
    <Row>
      <Col>
        <Card className="mb-3">
          <CardHeader>
          
            <h5> <strong>Activity Evaluation</strong></h5>
            <Row >
              <FormGroup>
            <Button
              className="ml-3"
              color="primary"
              onClick={() => {
                setCreateForm(!createForm);
                setCreateFormClassKeys(false); 
                getCohortStudents()}}
            >
              Add Individual Keys
            </Button>
            </FormGroup>
                <FormGroup>
            <Button
              className="ml-3"
              color="primary"
              onClick={() => {
                setCreateFormClassKeys(!createFormClassKeys);
                setCreateForm(false);
              }}
            >
              Add Team Keys
            </Button>
            </FormGroup>
            <Form style={{width:"20%", margin:"0"}}method="POST" onSubmit={addTargetKeys}>
            <Button
              className="ml-3"
              color="primary"
              onClick={() => {
               document.querySelector('#targetInput').hidden=!document.querySelector('#targetInput').hidden
              }}
            >
              Create Cohort Target
            </Button>
            <Input    style={{marginLeft:"4%"}}
                      id="targetInput"
                      type="number"
                      placeholder="Cohort Target"
                      name="target"
                      hidden
                    />
                    {errors.cohort_id ? (
                      <UncontrolledAlert color="danger">
                        {errors.cohort_id}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                    </Form>
                   

             <Col  lg={4} md={6} sm={6} xs={12} className="float-right" style={{marginLeft:"12%"}}>
             <FormGroup>
                    {/* <Button
                              className="mr-2"
                              size="sm"

                              // onClick={e => {
                              //   handleIndexClick(key);
                              //   handleIndexClickClassKeys(-2);
                              //   setEditId(adKeys.id);
                              // }}
                              color="primary"
                            >
                              {' '}
                              Edit{' '}
                            </Button> */}
                            <Button
                              onClick={()=>setDeleteTargetModel(!deleteTargetModel)}
                              color="danger"
                              size="sm"
                            >
                              {' '}
                              Delete Cohort Target{' '}
                            </Button>
                            <Modal
                            
                             isOpen={deleteTargetModel}

                              //   className={props.className}
                            >
                              <ModalHeader>
                                You cannot undo this action !
                              </ModalHeader>
                              <ModalBody>
                                Are you sure, you want to delete Cohort's Target?
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="primary"
                                 onClick={deleteCohortTarget}
                                >
                                  Confirm
                                </Button>{' '}
                                <Button
                                  color="secondary"
                                  onClick={()=>setDeleteTargetModel(!deleteTargetModel)}
                                >
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>
                    </FormGroup>
            <NumberWidget
            
            
              title="Cohort Target"
              subtitle={`${(totalAdditional+totalTeam+totalAttendance+totalAssignment)} Keys Achieved `}
              number={targetKeys? `${targetKeys.target} keys`:"0"}
              color='primary'
              progress={{
                value: targetKeys?(((totalAdditional+totalTeam+totalAttendance+totalAssignment)/targetKeys.target)*100).toFixed(2):"0",
                label:targetKeys?'Remain'+((totalAdditional+totalTeam+totalAttendance+totalAssignment)-targetKeys.target):"0",
              }}
            />
            
          </Col>
                    </Row>  
          </CardHeader>
          <CardBody>
            <Row hidden={!createForm}>
              
              <Col sm={4}>
                <FormGroup row>
                  <Label for="key" sm={3}>
                    Keys
                  </Label>
                  <Col sm={9}>
                    <Input
                    id="additionalKeys"
                      type="number"
                      placeholder="Key amount"
                      onChange={catchInput}
                      name="key"
                    />
                    {errors.key ? (
                      <UncontrolledAlert color="danger">
                        {errors.key}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
                </Col>


                <Col sm={8} style={{marginBottom:'2%'}}>
                <FormGroup row>
                  <Label for="description" sm={2}>
                    Description
                  </Label>
                  <Col sm={9}>
                    <Input
                     id="additionalKeysDescription"
                      placeholder="Description"
                      type="text"
                      onChange={catchInput}
                      name="description"
                    />
                    {errors.description ? (
                      <UncontrolledAlert color="danger">
                        {errors.description}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
                </Col>
            
                 
                      <Col sm={4} style={{marginBottom:'2%'}}>
                      <UncontrolledButtonDropdown addonType="append">
                      <DropdownToggle id="studentsDropDown" caret> {studentName} </DropdownToggle>
                      <DropdownMenu>
                        {students.map((student, key) => (
                          <DropdownItem
                            key={key}
                            onClick={() => { setStudentId(student.id); setStudentName(student.user_first_name) }}>
                            {student.user_first_name} {student.user_last_name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    {errors.user_id ? (
                      <UncontrolledAlert color="danger">
                        {errors.user_id}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                      </Col>
                      <Col sm={4}>
                <Button color="primary" onClick={addAdditionalKeys}>
                      Submit
                    </Button>
                    </Col>
                
                </Row>
    {/* -------------------------------add keys for a team or class------------------------------------ */}
                <Row hidden={!createFormClassKeys}>
              
                <Col sm={6}>
                <FormGroup row>
                  <Label for="team" sm={3}>
                    Team Name
                  </Label>
                  <Col sm={9}>
                    <Input
                    id="teamName"
                      type="text"
                      placeholder="Team Name or Class"
                      onChange={catchInput}
                      name="team"
                    />
                    {errors.team ? (
                      <UncontrolledAlert color="danger">
                        {errors.team}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
                </Col>

              <Col sm={6}>
                <FormGroup row>
                  <Label for="key" sm={2}>
                    Keys
                  </Label>
                  <Col sm={10}>
                    <Input
                      id="classKeys"
                      type="number"
                      placeholder="Key amount"
                      onChange={catchInput}
                      name="key"
                    />
                    {errors.key ? (
                      <UncontrolledAlert color="danger">
                        {errors.key}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
                </Col>


                <Col sm={10} style={{marginBottom:'2%'}}>
                <FormGroup row>
                  <Label for="description" sm={2}>
                    Description
                  </Label>
                  <Col sm={10}>
                    <Input
                     id="classKeysDescription"
                      placeholder="Description"
                      type="text"
                      onChange={catchInput}
                      name="description"
                    />
                    {errors.description ? (
                      <UncontrolledAlert color="danger">
                        {errors.description}{' '}
                      </UncontrolledAlert>
                    ) : (
                      ''
                    )}
                  </Col>
                </FormGroup>
                </Col>
                      <Col sm={2}>
                <Button color="primary" onClick={addClassKeys}>
                      Submit
                    </Button>
                    </Col>
                
                </Row>
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
                  <h5 style={{fontWeight:'600'}}>Attendance's Keys</h5>
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
                  <h5 style={{fontWeight:'600'}}>Task's Keys</h5>
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

            {/* -----------------------------------CLASS KEYS TABLE------------------------------------ */}
            <Row>
              <Col>
                <Card body>
                  <h5 style={{fontWeight:'600'}}>Class/Team Keys</h5>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th style={{width:"12%"}}>Date</th>
                        <th style={{width:"20%"}}>Class/Team</th>
                        <th style={{width:"13%"}}>Keys</th>
                        <th style={{width:"40%"}}>Description</th>
                      </tr>
                    </thead>
                    <tbody>

                      { classKeys.map((adKeys, key) => (
                        <tr key={key}>
                      <td>{moment(adKeys.created_at).format("YYYY/MM/DD")}</td>
                          <td>{adKeys.team}</td>
                          <td>
                          <Input
                                defaultValue={adKeys.key}
                                type="number"
                                id="key"
                                name="key"
                                onChange={e => {
                                  catchInput(e);
                                }}
                                disabled={disabledClassKeys!==key}
                              /></td>
                          <td style={{fontSize:'small'}}>
                          <Input
                                defaultValue={adKeys.description}
                                type="text"
                                id="description"
                                name="description"
                                onChange={e => {
                                  catchInput(e);
                                }}
                                disabled={disabledClassKeys!==key}
                              />
                              <Button
                              className="mr-2"
                              size="sm"
                              onClick={editClassKeys}
                              color="primary"
                              hidden={disabledClassKeys!==key}
                            >Submit Changes</Button>
                            </td>
                          <td>
                            <Button
                              className="mr-2"
                              size="sm"

                              onClick={e => {
                                handleIndexClickClassKeys(key);
                                handleIndexClick(-2);
                                setEditId(adKeys.id);
                                

                              }}
                              color="primary"
                            >
                              {' '}
                              Edit{' '}
                            </Button>
                            <Button
                              onClick={() => {
                                setModalClassKeys(!modalClassKeys);
                                setEditId(adKeys.id);
                                // console.log(adKeys.id)
                              }}
                              color="danger"
                              size="sm"
                            >
                              {' '}
                              Del{' '}
                            </Button>
                            <Modal
                              isOpen={modalClassKeys}

                              //   className={props.className}
                            >
                              <ModalHeader>
                                You cannot undo this action !
                              </ModalHeader>
                              <ModalBody>
                                Are you sure, you want to delete{' '}
                                {adKeys.team}'s keys? 
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="primary"
                                  onClick={() => deleteClassKeys()}
                                >
                                  Confirm
                                </Button>{' '}
                                <Button
                                  color="secondary"
                                  onClick={() => setModalClassKeys(!modalClassKeys)}
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
  {/* -----------------------------------ADDITIONAL KEYS TABLE------------------------------------ */}
            <Row>
              <Col>
                <Card body>
                  <h5 style={{fontWeight:'600'}}>Individual Additional Keys</h5>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th style={{width:"12%"}}>Date</th>
                        <th style={{width:"20%"}}>Name</th>
                        <th style={{width:"13%"}}>Keys</th>
                        <th style={{width:"40%"}}>Description</th>
                      </tr>
                    </thead>
                    <tbody>

                      { additionalKeys.map((adKeys, key) => (
                        <tr key={key}>
                      <td>{moment(adKeys.created_at).format("YYYY/MM/DD")}</td>
                          <td>{adKeys.user.user_first_name +" "+ adKeys.user.user_last_name}</td>
                          <td>
                          <Input
                                defaultValue={adKeys.key}
                                type="number"
                                id="key"
                                name="key"
                                onChange={e => {
                                  catchInput(e);
                                }}
                                disabled={disabled!==key}
                              /></td>
                          <td style={{fontSize:'small'}}>
                          <Input
                                defaultValue={adKeys.description}
                                type="text"
                                id="description"
                                name="description"
                                onChange={e => {
                                  catchInput(e);
                                }}
                                disabled={disabled!==key}
                              />
                              <Button
                              className="mr-2"
                              size="sm"

                              onClick={
                                editAdditionalKeys
                              }
                              color="primary"
                              hidden={disabled!==key}
                            >Submit Changes</Button>
                            </td>
                          <td>
                            <Button
                              className="mr-2"
                              size="sm"

                              onClick={e => {
                                handleIndexClick(key);
                                handleIndexClickClassKeys(-2);
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
