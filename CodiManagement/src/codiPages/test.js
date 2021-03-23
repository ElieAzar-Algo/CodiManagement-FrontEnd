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
  Alert,
  Form,
  Input,
  UncontrolledAlert,
  Label,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import codilogo from 'assets/img/logo/Codi-Logo.png';
import './codiStyles/CodiDashboard.css';
import { MdCheckBox } from 'react-icons/md';

const Attendance = props => {
  const [today, setToday] = useState('');
  const [cohortCode, setCohortCode] = useState('');
  const [students, setStudents] = useState([]);
  const [attendancesInputs, setAttendancesInputs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [modal, setModal] = useState(false);
  const [studentId, setStudentId] = useState();

  const cohortId = props.match.params.id;

  const getAbsenceRequests = async () => {
    const res = await fetch(`http://localhost:8000/api/cohort/${cohortId}`);
    const result = await res.json();

    setStudents(result.data[0].users);
    setCohortCode(result.data[0].cohort_code);
    //console.log(result.data[0].cohort_code)
  };

  const catchInput = e => {
    e.persist();
    setAttendancesInputs({
      ...attendancesInputs,
      [e.target.name]: e.target.value,
    });

    console.log(attendancesInputs);
  };

  const readyAttendance = async () => {
    const nowDate = new Date();
    const date =
      nowDate.getFullYear() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getDate();
    setToday(date);
    setModal(!modal);
  };

  const createAttendance = async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        attendance_date: today,
        admin_id: 1,
      }),
    });
    const result = await response.json();
    //console.log(result);
    if (result.success) {
      setErrors(result);
      console.log(result);
    } else {
      setErrors(result.errors);
      console.log(result);
    }
    setModal(!modal);
    getAbsenceRequests();
  };
  ///http://localhost:8000/api/userAttendance

  const createUserAttendance = async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/userAttendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
      ...attendancesInputs,
        attendance_id: today,
        user_id: studentId,
      }),
    });
    const result = await response.json();
    //console.log(result);
    if (result.success) {
      setErrors(result);
      console.log(result);
    } else {
      setErrors(result.errors);
      console.log(result);
    }
    setModal(!modal);
    getAbsenceRequests();
  };

  // const deleteRequest = async(id)=>{
  //   const res= await fetch(`http://localhost:8000/api/UserAbsenceRequest/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         //Authorization: "Bearer " + token,
  //       }});
  //   const result=await res.json()
  //   setErrors(result)
  //   getAbsenceRequests();
  // }

  useEffect(() => {}, []);

  return (
    <Row>
      {/* <Col>
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
        </Col> */}

      <Col>
        <Card className="mb-3">
          <CardHeader>
            Attendance{' '}
            {errors.message ? (
              <UncontrolledAlert color="success">
                {errors.message}{' '}
              </UncontrolledAlert>
            ) : errors.attendance_date ? (
              <UncontrolledAlert color="danger">
                {errors.attendance_date}{' '}
              </UncontrolledAlert>
            ) : (
              ''
            )}{' '}
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <Button color="primary" onClick={readyAttendance}>
                  {' '}
                  Start Today Attendance
                </Button>
              </Col>
              <Col>
                <Modal isOpen={modal}>
                  <ModalHeader>
                    You are creating a new attendance day
                  </ModalHeader>
                  <ModalBody>the current attendance day is {today}</ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={createAttendance}>
                      Confirm
                    </Button>
                    <Button color="secondary" onClick={() => setModal(!modal)}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>
              </Col>
            </Row>

            <Row>
              <Col>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>First name</th>
                      <th>Last name</th>

                      <th>Attendance</th>
                      <th>Keys</th>
                      <th>excuse</th>
                      <th>comment</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, studentKey) => (
                      <tr key={studentKey}>
                        <td> {studentKey + 1}</td>
                        <td>{student.user_first_name}</td>
                        <td>{student.user_last_name}</td>

                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="present_absent"
                                name="present_absent"
                                onChange={(e)=>{catchInput(e); setStudentId(student.id)}}
                              />{' '}
                              Present
                            </Label>
                          </FormGroup>
                        </td>
                        <td >
                          <FormGroup>
                            <Label>
                              <Input
                                type="number"
                                id="attendance_key_amount"
                                name="attendance_key_amount"
                              />
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          {' '}
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="excuse"
                                name="excuse"
                              />{' '}
                              Exist?
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup >
                            <Label>
                              <Input type="text" id="comment" name="comment" />
                            </Label>
                          </FormGroup>
                        </td>

                        <td>
                          {' '}
                          
                            <Button onClick={} color="info"> Done </Button>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default Attendance;
