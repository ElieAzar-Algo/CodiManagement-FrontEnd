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
  CardText,
  CardImg,
  CardTitle,
  Form,
  Input,
  UncontrolledAlert,
  Label,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import codilogo from 'assets/img/logo/Codi-Logo.png';
import './codiStyles/CodiDashboard.css';
import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const AbsenceRequestInfo = props => {
  const [absence, setAbsence] = useState([]);
  const [errors, setErrors] = useState([]);
  const [absenceInputs, setAbsenceInputs] = useState([]);
  const [infoModal, setInfoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editId, setEditId] = useState(false);

  const userId = props.match.params.id;

  const getAbsenceRequests = async () => {
    const res = await fetch(
      `http://localhost:8000/api/UserAbsenceRequest-user/${userId}`,
    );
    const result = await res.json();

    setAbsence(result.data);
    // console.log(result)
  };

  const catchInput = e => {
    e.persist();
    setAbsenceInputs({
      ...absenceInputs,
      [e.target.name]: e.target.value,
    });

    console.log(absenceInputs);
  };

  const createAbsence = async e => {
    e.preventDefault();

    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    // console.log(date)
    const response = await fetch(
      'http://localhost:8000/api/UserAbsenceRequest',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          //Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          ...absenceInputs,
          user_id: userId,
          absence_approved: 0,
          absence_requested_date: date,
        }),
      },
    );
    const result = await response.json();
    //console.log(result);
    if (result.success) {
      setErrors(result);
      setTimeout(() => {
        window.location.reload();
      }, 1800);
    } else {
      setErrors(result.errors);
    }
  };

  const editRequest = async () => {
    //console.log('hey'+editId);
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    // console.log(date)
    const response = await fetch(
      `http://localhost:8000/api/edit-userAbsenceRequest/${editId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          //Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          ...absenceInputs,
          user_id: userId,
          absence_approved: '0',
          absence_requested_date: date,
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      setTimeout(() => {
        window.location.reload();
      }, 1800);
    } else {
      setErrors(result.errors);
    }
  };

  const deleteRequest = async id => {
    const res = await fetch(
      `http://localhost:8000/api/UserAbsenceRequest/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          //Authorization: "Bearer " + token,
        },
      },
    );
    const result = await res.json();
    setErrors(result);
    getAbsenceRequests();
  };

  useEffect(() => {
    getAbsenceRequests();
  }, []);

  return (
    <>
    <Row>
      {absence == null ? (
        <Col>
          <Card className="flex-row">
            <CardImg
              className="card-img-left"
              src={codilogo}
              style={{ width: 'auto', height: 150 }}
            />
            <CardBody>
              <CardTitle>
                Welcome To Codi Tech Absence Requests Dashboard
              </CardTitle>
              <CardText>
                Please choose an existed user to see more info
              </CardText>
            </CardBody>
          </Card>
        </Col>
      ) : (
        <Col>
          <Card className="mb-3">
            <CardHeader>
              Create New Absence Request{' '}
              {errors.message ? (
                <UncontrolledAlert color="success">
                  {errors.message}{' '}
                </UncontrolledAlert>
              ) : (
                ''
              )}{' '}
            </CardHeader>
            <CardBody>
              {editForm ? (
                <Row style={{ backgroundColor: 'red' }}>
                  <Col>
                    <Form>
                      <FormGroup row>
                        <Col xl={6} l={6} md={12} sm={12}>
                          <Label for="exampleEmail">Absence reason</Label>
                          <Input
                            type="textarea"
                            placeholder=""
                            onChange={catchInput}
                            name="absence_reason"
                            placeholder="EDIT ONLY YOUR REQUEST INFO THAT YOU NEED "
                          />
                          {errors.absence_reason ? (
                            <UncontrolledAlert color="danger">
                              {errors.absence_reason}{' '}
                            </UncontrolledAlert>
                          ) : (
                            ''
                          )}
                        </Col>
                        <Col xl={2} l={2} md={6} sm={6}>
                          <Label for="exampleEmail">Start Date</Label>
                          <Input
                            type="date"
                            placeholder=""
                            onChange={catchInput}
                            name="absence_start_date"
                          />
                          {errors.absence_start_date ? (
                            <UncontrolledAlert color="danger">
                              {errors.absence_start_date}{' '}
                            </UncontrolledAlert>
                          ) : (
                            ''
                          )}
                        </Col>

                        <Col xl={2} l={2} md={6} sm={6}>
                          <Label for="exampleEmail">End Date</Label>
                          <Input
                            type="date"
                            placeholder=""
                            onChange={catchInput}
                            name="absence_end_date"
                          />
                          {errors.absence_end_date ? (
                            <UncontrolledAlert color="danger">
                              {errors.absence_end_date}{' '}
                            </UncontrolledAlert>
                          ) : (
                            ''
                          )}
                        </Col>

                        <Col xl={2} l={2}>
                          <Label for="exampleEmail">Submit request</Label>
                          <Button onClick={editRequest} color="success">
                            Submit Changes
                          </Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    <Form>
                      <FormGroup row>
                        <Col xl={6} l={6} md={12} sm={12}>
                          <Label for="exampleEmail">Absence reason</Label>
                          <Input
                            type="textarea"
                            placeholder=""
                            onChange={catchInput}
                            name="absence_reason"
                            placeholder="CREATE A NEW REQUEST"
                          />
                          {errors.absence_reason ? (
                            <UncontrolledAlert color="danger">
                              {errors.absence_reason}{' '}
                            </UncontrolledAlert>
                          ) : (
                            ''
                          )}
                        </Col>
                        <Col xl={2} l={2} md={6} sm={6}>
                          <Label for="exampleEmail">Start Date</Label>
                          <Input
                            type="date"
                            placeholder=""
                            onChange={catchInput}
                            name="absence_start_date"
                          />
                          {errors.absence_start_date ? (
                            <UncontrolledAlert color="danger">
                              {errors.absence_start_date}{' '}
                            </UncontrolledAlert>
                          ) : (
                            ''
                          )}
                        </Col>

                        <Col xl={2} l={2} md={6} sm={6}>
                          <Label for="exampleEmail">End Date</Label>
                          <Input
                            type="date"
                            placeholder=""
                            onChange={catchInput}
                            name="absence_end_date"
                          />
                          {errors.absence_end_date ? (
                            <UncontrolledAlert color="danger">
                              {errors.absence_end_date}{' '}
                            </UncontrolledAlert>
                          ) : (
                            ''
                          )}
                        </Col>

                        <Col xl={2} l={2}>
                          <Label for="exampleEmail"></Label>
                          <Button onClick={createAbsence} color="success">
                            Submit
                          </Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              )}
              <Row>
                <Col>
                  <Card body>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Absence requested date</th>
                          <th>Absence start date</th>
                          <th>Absence end date</th>
                          <th>Absence approval</th>
                        </tr>
                      </thead>
                      <tbody>
                        {absence.map((abs, key) => (
                          <tr key={key}>
                            <td> {key + 1} </td>
                            <td> {abs.absence_requested_date} </td>
                            <td> {abs.absence_start_date} </td>
                            <td> {abs.absence_end_date} </td>
                            <td>
                              {' '}
                              {abs.absence_approved
                                ? 'Approved'
                                : 'Not Approved'}{' '}
                            </td>
                            <td>
                              {' '}
                              <Button
                              className="mr-3"
                                color="info"
                                onClick={() => setInfoModal(!infoModal)}
                              >
                                Reason
                              </Button>
                              <Modal isOpen={infoModal}>
                                <ModalHeader>Absence Reason</ModalHeader>
                                <ModalBody>
                                  <p>{abs.absence_reason}</p>
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    color="secondary"
                                    onClick={() => setInfoModal(!infoModal)}
                                  >
                                    Close
                                  </Button>
                                </ModalFooter>
                              </Modal>{' '}
                              <Button
                              className="mr-3"
                                color="primary"
                                disabled={abs.absence_approved ? true : false}
                                onClick={() => {
                                  setEditForm(!editForm);
                                  setEditId(abs.id);
                                }}
                              >
                                {' '}
                                Edit{' '}
                              </Button>
                              <Button
                              className="mr-3"
                                color="danger"
                                onClick={() => setDeleteModal(!deleteModal)}
                              >
                                Delete
                              </Button>
                              <Modal isOpen={deleteModal}>
                                <ModalHeader>
                                  You cannot undo this action !
                                </ModalHeader>
                                <ModalBody>
                                  Are you sure, you want to delete?
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    color="primary"
                                    onClick={e => {
                                      e.preventDefault();
                                      setDeleteModal(!deleteModal);
                                      deleteRequest(abs.id);
                                    }}
                                  >
                                    Confirm
                                  </Button>
                                  <Button
                                    color="secondary"
                                    onClick={() => setDeleteModal(!deleteModal)}
                                  >
                                    Cancel
                                  </Button>
                                </ModalFooter>
                              </Modal>{' '}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>
            </CardBody>
            <Button onClick={()=>props.history.goBack()} >Back</Button>
          </Card>
        </Col>
      )}
       
    </Row>
    <Navbar>
      <Nav navbar>
        <NavItem>
         <SourceLink>
         
              <img
                src={codilogo}
                width="120"
                height="60"
                className="pr-2 ml-4"
                alt=""
              />
              Codi Tech Lebanon  About us 
              </SourceLink>
                          

             
        </NavItem>
      </Nav>
      
    </Navbar>
    
      </>
  );
};
export default AbsenceRequestInfo;
