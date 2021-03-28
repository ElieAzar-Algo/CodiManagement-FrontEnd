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
import {  MdRoom } from 'react-icons/md';

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
    setBranches(result.data);
    //console.log(students)
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
      setErrors(result);
      window.location.reload();
    } else {
      setErrors(result.errors);
    }
  };
  const editCohort = async e => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/cohort/${editId}`, {
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
      window.location.reload();
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
    getIndividualBranchInfo();
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
                onClick={e => getIndividualBranchInfo(branch.id)}
              />
            </Col>
          ))}
        </Row>
        <Card className="mb-3">
          <CardHeader>
            <Form
              inline
              className="cr-search-form"
              onSubmit={e => searchForCohort(e)}
            >
              <Button
                color="primary"
                onClick={() => setCohortForm(!cohortForm)}
              >
                Create New Cohort
              </Button>
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
              {cohortForm ? (
                <Row>
                  <Col>
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
                        <Button color="primary" onClick={createCohort}>
                          Submit
                        </Button>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              ) : editForm ? (
                <Row>
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
                </Row>
              ) : (
                <Col>
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
                      <Table hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Cohort</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Students Number</th>
                            <th>Admins Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          {individualBranch.map((branch, key) =>
                            branch.cohorts.map((cohort, cohortKey) => (
                              <tr key={key}>
                                <th scope="row">{cohortKey + 1}</th>
                                <td>{cohort.cohort_code}</td>
                                <td>{cohort.start_date} </td>
                                <td>{cohort.end_date}</td>
                                <td>{cohort.users.length}</td>
                                <td>{branch.admins.length}</td>
                                <td>
                                  {' '}
                                  <Link
                                    to={{
                                      pathname: `/cohort-info/${branch.branch_name}/${cohort.id}`,
                                      state: {
                                        branch_name: 'batata',
                                        new_id: '',
                                      },
                                    }}
                                  >
                                    <Button color="info"> More Info </Button>
                                  </Link>
                                </td>
                                <td>
                                  <Button
                                    onClick={e => {
                                      setEditForm(!editForm);
                                      setEditId(cohort.id);
                                    }}
                                    color="primary"
                                  >
                                    {' '}
                                    Edit{' '}
                                  </Button>
                                </td>
                                <td>
                                  <Button
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
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default BranchesInfo;
