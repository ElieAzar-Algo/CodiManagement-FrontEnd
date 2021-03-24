import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input,
  UncontrolledAlert,
  Label,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

const Attendance = props => {
  const [day, setDay] = useState(0);
  const [cohortCode, setCohortCode] = useState('');
  const [students, setStudents] = useState([]);
  const [attendancesInputs, setAttendancesInputs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [modal, setModal] = useState(false);
  const [studentId, setStudentId] = useState();
  const [attendanceId, setAttendanceId] = useState();
  const [present, setPresent] = useState();
  const [excuse, setExcuse] = useState(0);
  const [disabled, setDisabled] = useState(-1);
  const cohortId = props.match.params.id;

  const handleIndexClick = studentKey => {
    setDisabled(studentKey);
  };
  const createAttendance = async e => {
    e.preventDefault();
    //console.log(day)
    const response = await fetch('http://localhost:8000/api/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        attendance_date: day,
        admin_id: 1,
      }),
    });
    const result = await response.json();
    //console.log(result);
    if (result.success) {
      setAttendanceId(result.data.id);
      setErrors(result);
      getCohortUsers();
      console.log(result);
    } else {
      setErrors(result.errors);
      console.log(result);
    }
    setModal(!modal);
  };

  const getCohortUsers = async () => {
    const res = await fetch(`http://localhost:8000/api/cohort/${cohortId}`);
    const result = await res.json();

    setStudents(result.data[0].users);
    setCohortCode(result.data[0].cohort_code);
  };

  const catchInput = e => {
    e.persist();
    setAttendancesInputs({
      ...attendancesInputs,
      [e.target.name]: e.target.value,
    });

    console.log(attendancesInputs);
  };

  const createUserAttendance = async e => {
    e.preventDefault();
    console.log(attendanceId + ' ' + studentId + ' ');
    console.log(attendancesInputs);

    const response = await fetch('http://localhost:8000/api/userAttendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...attendancesInputs,
        attendance_id: attendanceId,
        user_id: studentId,
        present_absent: present,
        excuse: excuse,
      }),
    });
    const result = await response.json();
    //console.log(result);
    if (result.success) {
      setErrors(result);
      setDisabled(-1)
      console.log(result);
    } else {
      setErrors(result.errors);
      console.log(result);
    }
  };

  const searchAttendance = async () => {
    const res = await fetch(`http://localhost:8000/api/attendance/${day}`);
    const result = await res.json();
    console.log(result);
    if (result.data[0]) {
      // console.log(result);
      setErrors(result);
      setAttendanceId(result.data[0].id);
      getCohortUsers();
    } else {
      setErrors({ attendance_date: 'This day is not exist, please create it' });
      // console.log(result);
    }
  };

  const backk = () => {
    window.history.back();
  };

  return (
    <Row>
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
              <Col sm={2}>
                <Input
                  type="date"
                  onChange={e => setDay(e.target.value)}
                ></Input>
                <Button disabled={!day?true:false} color="primary" onClick={() => setModal(!modal)}>
                  {' '}
                  Start An Attendance Day
                </Button>
              </Col>
              <Col sm={2}>
                <Input
                  type="date"
                  onChange={e => setDay(e.target.value)}
                ></Input>
                <Button color="primary" onClick={searchAttendance}>
                  {' '}
                  Get Existing Attendance Day
                </Button>
              </Col>
              {/* <Col sm={2}>
              <Button color="danger" onClick={}>
                  {' '}
                  go back
                </Button>
              </Col> */}
              <Col>
                <Modal isOpen={modal}>
                  <ModalHeader>
                    You are creating a new attendance day
                  </ModalHeader>
                  <ModalBody>the current attendance day is {day}</ModalBody>
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
                          
                                onChange={e => {
                                  setPresent(e.target.checked? 1 : 0);
                                  setStudentId(student.id);
                                  handleIndexClick(studentKey);
                                }}
                              />{' '}
                              Present
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup>
                            <Label>
                              <Input
                                type="number"
                                id="attendance_key_amount"
                                name="attendance_key_amount"
                                onChange={e => {
                                  catchInput(e);
                                  setStudentId(student.id);
                                }}
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
                                onChange={e => {
                                  setExcuse(e.target.value == 'on' ? 1 : 0);
                                  setStudentId(student.id);
                                }}
                              />{' '}
                              Exist?
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup>
                            <Label>
                              <Input
                                type="text"
                                id="comment"
                                name="comment"
                                onChange={e => {
                                  catchInput(e);
                                  setStudentId(student.id);
                                }}
                              />
                            </Label>
                          </FormGroup>
                        </td>

                        <td>
                          {' '}
                          <Button
                            onClick={createUserAttendance}
                            disabled={disabled !== studentKey}
                            color="primary"
                          >
                            {' '}
                            Done{' '}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
          <Button onClick={()=>window.location.reload()} color="info">
            {' '}
            Finish{' '}
          </Button>
        </Card>
      </Col>
    </Row>
  );
};
export default Attendance;
