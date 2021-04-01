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

const TodayAbsenceRequests = props => {
  const [absence, setAbsence] = useState([]);
  const [errors, setErrors] = useState([]);
  const [today, setToday] = useState();
  const [infoModal, setInfoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  

  

  const getAbsenceRequests = async () => {
    var today = new Date();
        var date =
          today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
          setToday(date)
    const res = await fetch(
      `http://localhost:8000/api/UserAbsenceRequest/${date}`,
    );
    const result = await res.json();

    setAbsence(result.data);
    console.log(result)
  };

//   const catchInput = e => {
//     e.persist();
//     setAbsenceInputs({
//       ...absenceInputs,
//       [e.target.name]: e.target.value,
//     });

//     console.log(absenceInputs);
//   };

//   const createAbsence = async e => {
//     e.preventDefault();

//     var today = new Date();
//     var date =
//       today.getFullYear() +
//       '-' +
//       (today.getMonth() + 1) +
//       '-' +
//       today.getDate();
//     // console.log(date)
//     const response = await fetch(
//       'http://localhost:8000/api/UserAbsenceRequest',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//           //Authorization: "Bearer " + token,
//         },
//         body: JSON.stringify({
//           ...absenceInputs,
//           user_id: userId,
//           absence_approved: 0,
//           absence_requested_date: date,
//         }),
//       },
//     );
//     const result = await response.json();
//     //console.log(result);
//     if (result.success) {
//       setErrors(result);
//       setTimeout(() => {
//         window.location.reload();
//       }, 1800);
//     } else {
//       setErrors(result.errors);
//     }
//   };

  const editRequest = async (id ,approved) => {
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
      `http://localhost:8000/api/edit-userAbsenceRequest/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          //Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            absence_approved:!approved,
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.success) {
      setErrors(result);
      getAbsenceRequests()
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
              TODAY ABSENCE REQUESTS {today}
            </CardHeader>
            <CardBody>
              
              <Row>
                <Col>
                  <Card body>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Student</th>
                          
                          <th>Absence start date</th>
                          <th>Absence end date</th>
                          <th>Absence approval</th>
                        </tr>
                      </thead>
                      <tbody>
                        {absence.map((abs, key) => (
                          <tr key={key}>
                            <td> {key + 1} </td>
                            <td> {abs.user.user_first_name} {abs.user.user_last_name}</td>
                            
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
                                color="primary"
                                className="mr-3"
                                onClick={() => {
                                 editRequest(abs.id,abs.absence_approved)
                                  
                                }}
                              >
                              Approved
                              </Button>
                              <Button
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
    
    
      </>
  );
};
export default TodayAbsenceRequests;
