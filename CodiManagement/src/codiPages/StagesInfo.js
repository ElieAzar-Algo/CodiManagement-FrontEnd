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
  Label,
} from 'reactstrap';
import codilogo from 'assets/img/logo/Codi-Logo.png';
import './codiStyles/CodiDashboard.css';

const StagesInfo = props => {
  const [stages, setStages] = useState([]);
  const [stageInputs, setStageInputs] = useState([]);
  const [stageId, setStageId] = useState();

  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [prairie, setPrairie] = useState(false);
  //const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState(false);
  const [disabled, setDisabled] = useState(-1);
  const [hidden, setHidden] = useState(false);


  //const branchName=props.match.params.name;
  const cohortId = props.match.params.id;

  const handleIndexClick = stageKey => {
    if (disabled==stageKey){
      setDisabled(-1);
    }else{
    setDisabled(stageKey);}
  };

  const catchInput = e => {
    e.persist();
    setStageInputs({
      ...stageInputs,
      [e.target.name]: e.target.value,
    });
    console.log(stageInputs);
  };

  const getStages = async () => {
    // console.log(branchName,cohortId);
    const res = await fetch(`http://localhost:8000/api/stage/${cohortId}`);
    const result = await res.json();
    console.log(result.data);
    setStages(result.data);
  };

  const createStage = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/stage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...stageInputs,
        cohort_code: cohortId,
        prairie: prairie,
        active_inactive: 0,
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

  const activateStage = async (id, activate_deactivate) => {
    const response = await fetch(`http://localhost:8000/api/stage/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        active_inactive: !activate_deactivate,
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

  const editStage = async (id) => {
   
    const response = await fetch(`http://localhost:8000/api/stage/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...stageInputs,
       

      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      setStageInputs([]);
    getStages();
    
    } else {
      setErrors(result.errors);
    }
  };

  

  useEffect(() => {
    getStages();
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
                      onClick={() => setCreateForm(!createForm)}
                    >
                      Create New Stage
                    </Button>
                  </Col>
                </Row>
                <Row>
                  {/* ----------------------------------- */}

                  {createForm ? (
                    <Col sm={5}>
                      <FormGroup row>
                        <Label for="exampleEmail" sm={5}>
                          Stage Name
                        </Label>
                        <Col sm={7}>
                          <Input
                            type="text"
                            placeholder=""
                            onChange={catchInput}
                            name="stage_name"
                          />
                          {errors.stage_name ? (
                            <Alert color="danger">{errors.stage_name} </Alert>
                          ) : (
                            ''
                          )}
                        </Col>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="prairie"
                            name="prairie"
                            onChange={e => {
                              setPrairie(e.target.checked ? 1 : 0);
                            }}
                          />{' '}
                          {errors.prairie ? (
                            <Alert color="danger">{errors.prairie} </Alert>
                          ) : (
                            ''
                          )}
                          Prairie
                        </Label>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="exampleEmail" sm={5}>
                          Start Date
                        </Label>
                        <Col sm={7}>
                          <Input
                            type="date"
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
                            onChange={catchInput}
                            name="end_date"
                          />
                          {errors.end_date ? (
                            <Alert color="danger">{errors.end_date} </Alert>
                          ) : (
                            ''
                          )}
                          <Button color="primary" onClick={createStage}>
                            Submit
                          </Button>
                        </Col>
                      </FormGroup>
                    </Col>
                  ) :
                  // editForm?(
                  //   <Col sm={5}>
                  //     <FormGroup row>
                  //       <Label for="exampleEmail" sm={5}>
                  //         Stage Name
                  //       </Label>
                  //       <Col sm={7}>
                  //         <Input
                  //           type="text"
                  //           placeholder=""
                  //           onChange={catchInput}
                  //           name="stage_name"
                  //         />
                  //         {errors.stage_name ? (
                  //           <Alert color="danger">{errors.stage_name} </Alert>
                  //         ) : (
                  //           ''
                  //         )}
                  //       </Col>
                  //     </FormGroup>

                  //     <FormGroup check>
                  //       <Label check>
                  //         <Input
                  //           type="checkbox"
                  //           id="prairie"
                  //           name="prairie"
                  //           onChange={e => {
                  //             setPrairie(e.target.checked ? 1 : 0);
                  //           }}
                  //         />{' '}
                  //         {errors.prairie ? (
                  //           <Alert color="danger">{errors.prairie} </Alert>
                  //         ) : (
                  //           ''
                  //         )}
                  //         Prairie
                  //       </Label>
                  //     </FormGroup>

                  //     <FormGroup row>
                  //       <Label for="exampleEmail" sm={5}>
                  //         Start Date
                  //       </Label>
                  //       <Col sm={7}>
                  //         <Input
                  //           type="date"
                  //           onChange={catchInput}
                  //           name="start_date"
                  //         />
                  //         {errors.start_date ? (
                  //           <Alert color="danger">{errors.start_date} </Alert>
                  //         ) : (
                  //           ''
                  //         )}
                  //       </Col>
                  //     </FormGroup>

                  //     <FormGroup row>
                  //       <Label for="exampleEmail" sm={5}>
                  //         End Date
                  //       </Label>
                  //       <Col sm={7}>
                  //         <Input
                  //           type="date"
                  //           onChange={catchInput}
                  //           name="end_date"
                  //         />
                  //         {errors.end_date ? (
                  //           <Alert color="danger">{errors.end_date} </Alert>
                  //         ) : (
                  //           ''
                  //         )}
                  //         <Button className=" mr-3"color="primary" onClick={editStage}>
                  //           Submit
                  //         </Button>
                  //         <Button color="primary" onClick={()=>setEditForm(!editForm)}>
                  //           Back
                  //         </Button>

                  //       </Col>
                  //     </FormGroup>
                      
                  //   </Col>
                  // ) :
                  (
                    <Col>
                      <Card body>
                        <Table responsive hover>
                          <thead>
                            <tr>
                              <th style={{ width: '18%' }}  >Stage Name</th>
                              {/* <th>Prairie</th> */}
                              <th style={{ width: '15%' }} >Start Date</th>
                              <th style={{ width: '15%' }}>End Date</th>
                             
                              <th style={{ width: '15%' }}>Active</th>
                              <th style={{ width: '30%' }}></th>
                              
                            </tr>
                          </thead>

                          <tbody>
                            {stages.map((stage, stageKey) => (
                              <tr key={stageKey}>
                                {/* <td>{stage.stage_name}</td> */}
                                <td>
                                <Input
                                defaultValue={stage.stage_name}
                               disabled={disabled!==stageKey}
                                type="text"
                                id="stage_name"
                                name="stage_name"
                                onChange={e => {
                                  catchInput(e);
                                }}
                              />
                                </td>
                                {/* <td>{stage.prairie}</td> */}
                                <td hidden={disabled==stageKey}>{stage.start_date}</td>
                                <td hidden={disabled!==stageKey}> 
                                 <Input
                                 defaultValue={stage.start_date}
                                 style={{ width: '80%' }}
                                  type="date"
                                  onChange={catchInput}
                                  name="start_date"
                              /></td> 

                                <td hidden={disabled==stageKey}>{stage.end_date}</td>
                                <td hidden={disabled!==stageKey} >
                                <Input
                                 defaultValue={stage.end_date}

                                 style={{ width: '80%' }}
                                  type="date"
                                  onChange={catchInput}
                                  name="end_date"
                              />
                                </td>
                                <td>
                                  {stage.active_inactive
                                    ? 'Active'
                                    : 'Not Active'}
                                </td>
                                <td>
                                  {' '}
                                  <Link
                                    to={{
                                      pathname: `/stage-tasks/${stage.id}/${cohortId}`,
                                    }}
                                  >
                                    <Button 
                                    hidden={hidden}
                                    size='sm'
                                     color="info"> More Info </Button>
                                  </Link>


                                  <Button 
                                    disabled={disabled==-1?!disabled:disabled!==stageKey}
                                    hidden={disabled==stageKey}
                                    className="mr-3 ml-3"
                                    size='sm'
                                    color="primary"
                                    onClick={()=>{handleIndexClick(stageKey);
                                    // setStageId(stage.id);
                                    setHidden(true)
                                    }} >
                                    Edit Stage
                                  </Button>
                              <Button 
                                  hidden={disabled!==stageKey}
                                  size="sm" 
                                  className=" ml-2 mr-2"
                                  color="warning" 
                                  onClick={(e)=>{ 
                                  e.preventDefault();
                                  editStage(stage.id); 
                                  handleIndexClick(-1)
                                  setHidden(false)
                              }}>
                                Submit Changes
                                </Button>

                                  <Button
                                    size='sm'
                                    hidden={hidden}
                                    color="danger"
                                    onClick={() =>
                                      activateStage(
                                        stage.id,
                                        stage.active_inactive,
                                      )
                                    }
                                  >
                                    {stage.active_inactive
                                      ? 'Deactivate'
                                      : 'Activate'}{' '}
                                  </Button>
                                  
                                </td>
                               
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  )}
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
export default StagesInfo;
