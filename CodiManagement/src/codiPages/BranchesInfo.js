//import Page from 'components/Page';
import './codiStyles/CodiDashboard.css';
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
} from 'reactstrap';
import { IconWidget } from 'components/Widget';
import { MdRoom } from 'react-icons/md';

import codilogo from 'assets/img/logo/Codi-Logo.png';

const BranchesInfo = () => {
  const [branches, setBranches] = useState([]);
  const [individualBranch, setIndividualBranch] = useState([]);
  const [individualCohort, setIndividualCohort] = useState([]); //search function not complete
  const [search, setSearch] = useState([]);
  const [cohortInputs, setCohortInputs] = useState([]);
  const [cohortForm, setCohortForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState();
  const [branchId, setBranchId] = useState();
  const [branchName, setBranchName] = useState('Branches');
  const [errors, setErrors] = useState(false);
  const [disabled, setDisabled] = useState(-1);
  const [hidden, setHidden] = useState(false);


  const handleIndexClick = key => {
    if (disabled==key){
      setDisabled(-1);
    }else{
    setDisabled(key);}
  };

  const catchInput = e => {
    e.persist();
    setCohortInputs({
      ...cohortInputs,
      [e.target.name]: e.target.value,
    });
    console.log(cohortInputs);
  };

  const getBranches = async () => {
    const res = await fetch('http://localhost:8000/api/branch');
    const result = await res.json();
    //(value)=>{setBra}
    // console.log(result)
    setBranches(result.data);
    console.log(branches)
  };

  const getIndividualBranchInfo = async id => {
    console.log(id);
    const res = await fetch(`http://localhost:8000/api/branch/${id}`);
    const result = await res.json();
    setIndividualBranch(result.data);
    console.log(result.data);
  };

  const searchForCohort = async e => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/searchCohort/${search}`);
    const result = await res.json();
    setIndividualCohort(result.data);
    console.log(result.data);
  };

  const createCohort = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/cohort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...cohortInputs,
        branch_id: branchId,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
     getIndividualBranchInfo(branchId);
    setErrors(result);
     setCohortForm(false)
     setBranchId();
    } else {
      setErrors(result.errors);
    }
  };
  const editCohort = async (id) => {
    // e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/cohort/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...cohortInputs,
        branch_id: branchId,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
     getIndividualBranchInfo(branchId)
     setCohortInputs([])
    } else {
      setErrors(result.errors);
    }
  };

  const deleteCohort = async id => {
    const deleteRequestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: "Bearer " + token,
      },
    };
    const res = await fetch(
      `http://localhost:8000/api/cohort/${id}`,
      deleteRequestOptions,
    );
    const result = await res.json();

    console.log(result.message);
    getIndividualBranchInfo(branchId);
  };

  useEffect(() => {
    getBranches();
    setIndividualBranch(null);
  }, []);

  return (
    <Row>
      <Col>
        <Row className="ml-1 mr-1">
          {branches.map((branch, key) => (
            <Col
              key={key}
              lg={3}
              md={3}
              sm={6}
              xs={12}
              className="branchesWidgets mb-3"
            >
              <IconWidget
                bgColor="primary"
                icon={MdRoom}
                title={branch.branch_name}
                subtitle="Branch"
                onClick={e => {getIndividualBranchInfo(branch.id);setBranchId(branch.id);}}
              />
            </Col>
          ))}
        </Row>

        <Row style={{marginLeft:"3%"}} hidden={!cohortForm}>
                            <Col>
                              {/* <Row>
                                <Label for="exampleEmail" sm={5}>
                                  Choose Branch
                                </Label>
                                <UncontrolledButtonDropdown className="m-2 ml-3">
                                  <DropdownToggle caret>{branchName}</DropdownToggle>
                                  <DropdownMenu>
                                    {branches.map((branch, branchKey) => (
                                      <DropdownItem
                                        key={branchKey}
                                        onClick={() => {
                                          setBranchId(branch.id);
                                          setBranchName(branch.branch_name);
                                        }}
                                      >
                                        {branch.branch_name}
                                      </DropdownItem>
                                    ))}
                                  </DropdownMenu>
                                </UncontrolledButtonDropdown>
                                {errors.branch_id ? (
                                  <Alert color="danger">{errors.branch_id} </Alert>
                                ) : (
                                    ''
                                  )}
                              </Row> */}
          
                              <FormGroup row>
                                <Label for="exampleEmail" sm={2}>
                                  Cohort Code
                                </Label>
                                <Col sm={4}>
                                  <Input
                                    type="text"
                                    placeholder="example: BB09"
                                    onChange={catchInput}
                                    name="cohort_code"
                                  />
                                  {errors.cohort_code ? (
                                    <Alert color="danger">{errors.cohort_code} </Alert>
                                  ) : (
                                      ''
                                    )}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label for="exampleEmail" sm={2}>
                                  Start Date
                                </Label>
                                <Col sm={4}>
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
                                <Label for="exampleEmail" sm={2}>
                                  End Date
                                </Label>
                                <Col sm={4}>
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
                                  <Button color="primary" onClick={createCohort}>
                                    Submit
                                  </Button>
                                </Col>
                              </FormGroup>
                            </Col>
                          </Row>
        
        <Card className="mb-3">
          <CardHeader>
            <Form
              inline
              className="cr-search-form"
              onSubmit={e => searchForCohort(e)}
            >
             
              {/* <Input
                type="search"
                className="cr-search-form__input"
                placeholder="Search..."
                onChange={e => setSearch(e.target.value)}
              /> */}
            </Form>
          </CardHeader>
          <CardBody>
            <Row>
              
              
                {/* <Row hidden={!editForm}>
                  <Col>
                    <h3>
                      Edit Form{' '}
                      <Button onClick={() => setEditForm(!editForm)}>x</Button>
                    </h3>
                    <Row>
                      <Label for="exampleEmail" sm={5}>
                        Choose Branch
                      </Label>
                      <UncontrolledButtonDropdown className="m-2 ml-3">
                        <DropdownToggle caret>{branchName}</DropdownToggle>
                        <DropdownMenu>
                          {branches.map((branch, branchKey) => (
                            <DropdownItem
                              key={branchKey}
                              onClick={() => {
                                setBranchId(branch.id);
                                setBranchName(branch.branch_name);
                              }}
                            >
                              {branch.branch_name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                      {errors.branch_id ? (
                        <Alert color="danger">{errors.branch_id} </Alert>
                      ) : (
                          ''
                        )}
                    </Row>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={5}>
                        Cohort Code
                      </Label>
                      <Col sm={7}>
                        <Input
                          type="text"
                          placeholder="example: BB09"
                          onChange={catchInput}
                          name="cohort_code"
                        />
                        {errors.cohort_code ? (
                          <Alert color="danger">{errors.cohort_code} </Alert>
                        ) : (
                            ''
                          )}
                      </Col>
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
                        <Button color="primary" onClick={editCohort}>
                          Submit Changes
                        </Button>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row> */}
              
                    <Col >
                      {!individualBranch ? (
                        <Card className="flex-row">
                          <CardImg
                            className="card-img-left"
                            src={codilogo}
                            style={{ width: 'auto', height: 150 }}
                          />
                          <CardBody>
                            <CardTitle>
                              Welcome To Codi Tech Branches Dashboard
                        </CardTitle>
                            <CardText>
                              Please choose a branch to see more info
                        </CardText>
                          </CardBody>
                        </Card>
                      ) : (

                      
                         
                          <Card body>
                             <Button
                                style={{width:'25%'}}
                                color="primary"
                                onClick={() => setCohortForm(!cohortForm)}
                              >
                                Create New Cohort
                              </Button>
                            <Table responsive hover>
                           
                              <thead>
                              
                                <tr>
                                  {/* <th>#</th> */}
                                  <th style={{ width: '15%' }}>Cohort</th>
                                  <th style={{ width: '15%' }}>Start date</th>
                                  <th style={{ width: '15%' }}>End date</th>
                                  <th style={{ width: '15%' }}>Students Number</th>
                                  <th style={{ width: '15%' }}>Mentors Number</th>
                                  <th style={{ width: '25%' }}></th>
                                </tr>
                              </thead>
                              <tbody>
                                {individualBranch.map((branch, key) =>
                                  branch.cohorts.map((cohort, cohortKey) => (
                                    <tr key={cohortKey}>
                                      {/* <th scope="row">{cohortKey + 1}</th> */}
                                      {/* <td>{cohort.cohort_code}</td> */}
                                     <td> <Input
                                      defaultValue={cohort.cohort_code}
                                      disabled={disabled!==cohortKey}
                                      type="text"
                                      id="cohort_code"
                                      name="cohort_code"
                                      onChange={e => {
                                        catchInput(e);
                                      }}
                                    /></td>
                                      {/* <td>{cohort.start_date} </td> */}
                                      <td hidden={disabled==cohortKey}>{cohort.start_date}</td>
                                    <td style={{ width: '15%' }} hidden={disabled!==cohortKey}> 
                                    <Input
                                    defaultValue={cohort.start_date}
                                    style={{ width: '80%' }}
                                      type="date"
                                      onChange={catchInput}
                                      name="start_date"
                                  /></td> 

                                      {/* <td>{cohort.end_date}</td> */}
                                      <td hidden={disabled==cohortKey}>{cohort.end_date}</td>
                                    <td style={{ width: '15%' }} hidden={disabled!==cohortKey}> 
                                    <Input
                                    defaultValue={cohort.end_date}
                                    style={{ width: '80%' }}
                                      type="date"
                                      onChange={catchInput}
                                      name="end_date"
                                  /></td> 
                                      <td>{cohort.users.length} Students</td>
                                      <td>{branch.admins.length} Mentors</td>

                                      <td>
                                        <Link
                                          to={{
                                            pathname: `/cohort-info/${branch.branch_name}/${cohort.id}`,
                                            state: {
                                              branch: branch.id,
                                            },
                                          }}
                                        >
                                          <Button size='sm' hidden={hidden} color="info"> More Info </Button>
                                        </Link>

                                        <Button 
                                          disabled={disabled==-1?!disabled:disabled!==cohortKey}
                                          hidden={disabled==cohortKey}
                                          className="ml-2 mr-2"
                                          size='sm'
                                          color="primary"
                                          onClick={()=>{handleIndexClick(cohortKey);
                                          setBranchId(branch.id);
                                          
                                          setHidden(true)
                                          }} >
                                          Edit
                                        </Button>
                                        <Button
                                        hidden={disabled!==cohortKey}
                                        size="sm" 
                                        className=" "
                                        color="warning" 
                                        onClick={(e)=>{ 
                                        e.preventDefault();
                                        editCohort(cohort.id); 
                                        handleIndexClick(-1)
                                        setHidden(false)
                                    }}>
                                      Submit Changes
                                      </Button>
                                        {/* <Button
                                          className="ml-3 mr-3"
                                          onClick={e => {
                                            setEditForm(!editForm);
                                            setEditId(cohort.id);
                                          }}
                                          color="primary"
                                        >
                                          {' '}
                                    Edit{' '}
                                        </Button> */}
                                        <Button
                                        hidden={hidden}
                                        size='sm'
                                          onClick={() => setModal(!modal)}
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
                                            {cohort.cohort_code}? This could cause a
                                      loss of all the cohort's students
                                    </ModalBody>
                                          <ModalFooter>
                                            <Button
                                              color="primary"
                                              onClick={() => deleteCohort(cohort.id)}
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
                                  )),
                                )}

                              </tbody>
                            </Table>
                          </Card>
                        )}
                    </Col>
                  
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default BranchesInfo;