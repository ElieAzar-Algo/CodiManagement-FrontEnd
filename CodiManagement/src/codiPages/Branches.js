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
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledAlert
} from 'reactstrap';

const BranchesInfo = () => {
  const [branches, setBranches] = useState([]);
  const [branchInputs, setBranchInputs] = useState([]);

  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState();
  const [errors, setErrors] = useState(false);

  const catchInput = e => {
    e.persist();
    setBranchInputs({
      ...branchInputs,
      [e.target.name]: e.target.value,
    });
    console.log(branchInputs);
  };

  const getBranches = async () => {
    const res = await fetch('http://localhost:8000/api/branch');
    const result = await res.json();
    setBranches(result.data);
    //console.log(students)
  };

  

  const createBranch = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/branch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...branchInputs,
        
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
  const editBranch = async e => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/branch/${editId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...branchInputs,
        
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

  const deleteBranch = async id => {
    const deleteRequestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: "Bearer " + token,
      },
    };
    const res = await fetch(
      `http://localhost:8000/api/branch/${id}`,
      deleteRequestOptions,
    );
    const result = await res.json();

    console.log(result.message);
    setModal(!modal);
    getBranches();

  };

  useEffect(() => {
    getBranches();
    
  }, []);

  return (
    <Row>
      <Col>
        
        <Card className="mb-3">
          <CardHeader>
            Branches 
            <Button
                className="ml-3"
                color="primary"
                onClick={() => setCreateForm(!createForm)}
              >
                Create New Branch
              </Button>
          </CardHeader>
          <CardBody>
          
                <Row hidden={!createForm}>
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
                          <UncontrolledAlert color="danger">{errors.branch_name} </UncontrolledAlert>
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
                          <UncontrolledAlert color="danger">{errors.branch_country} </UncontrolledAlert>
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
                          <UncontrolledAlert color="danger">{errors.branch_location} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                        <Button color="primary" onClick={createBranch}>
                          Submit
                        </Button>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>

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
                          <UncontrolledAlert color="danger">{errors.branch_name} </UncontrolledAlert>
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
                          <UncontrolledAlert color="danger">{errors.branch_country} </UncontrolledAlert>
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
                          <UncontrolledAlert color="danger">{errors.branch_location} </UncontrolledAlert>
                        ) : (
                          ''
                        )}
                        <Button color="primary" onClick={editBranch}>
                          Submit
                        </Button>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>


              
            <Row>
                <Col>
                    <Card body>
                      <Table hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Location</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          {branches.map((branch, key) =>
                           
                              <tr key={key}>
                                <th scope="row">{key + 1}</th>
                                <td>{branch.branch_name}</td>
                                <td>{branch.branch_country} </td>
                                <td>{branch.branch_location}</td>
                                <td>
                                <Button
                                className="mr-4"
                                    onClick={e => {
                                      setEditForm(!editForm);
                                       setEditId(branch.id);
                                    }}
                                    color="primary"
                                  >
                                    {' '}
                                    Edit{' '}
                                  </Button>
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
                                      {branch.branch_name}? This could cause a
                                      loss of all the cohort's students
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button
                                        color="primary"
                                        onClick={() => deleteBranch(branch.id)}
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
                            
                          )}

                        </tbody>
                      </Table>
                    </Card>
                  
                </Col>
              
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default BranchesInfo;
