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
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

const Attendance = props => {
  const [day, setDay] = useState(0);
  const [statuses, setStatuses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendancesInputs, setAttendancesInputs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [modal, setModal] = useState(false);
  //const [studentId, setStudentId] = useState();
  const [attendanceId, setAttendanceId] = useState();
  const [attendance, setAttendance] = useState(1);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [disabled, setDisabled] = useState(-1);
  const cohortId = props.match.params.id;

  const handleIndexClick = studentKey => {
    setDisabled(studentKey);
  };
  

  const catchInput = e => {
    e.persist();
    setAttendancesInputs({
      ...attendancesInputs,
      [e.target.name]: e.target.value,
    });

    console.log(attendancesInputs);
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
        cohort_id: cohortId,
      }),
    });

    const result = await response.json();
    console.log(result);
    if (result.success) {
      setAttendanceId(result.data.id);
      setErrors(result);
      getUsersAttendance(result.data.id);
      getAttendanceStatuses()
      //console.log(result);
    } else {
      getUsersAttendance(result.data.id);
      getAttendanceStatuses()
      setErrors(result);
      //console.log(result);
    }
    setModal(!modal);
  };


  const getUsersAttendance = async (id) => {
    const res = await fetch(`http://localhost:8000/api/attendance/${id}`);
    const result = await res.json();
    console.log(result)
    if (result.success) {
      setStudents(result.data);
    } else {
      setErrors(result.errors);
      console.log(result);
    }
  };


  const getAttendanceStatuses = async () => {
    const res = await fetch(`http://localhost:8000/api/attendance-status`);
    const result = await res.json();
    console.log(result)
    if (result.success) {
      setStatuses(result.data);
    } else {
      setErrors(result.errors);
      console.log(result);
    }
  };



  const createUserAttendance = async (studentId) => {

    //console.log(attendanceId + ' ' + studentId + ' ');
    console.log(attendancesInputs);

    const response = await fetch(`http://localhost:8000/api/userAttendance/${studentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...attendancesInputs,
        present_absent: attendance,

      }),
    });
    const result = await response.json();
    //console.log(result);
    if (result.success) {
      setErrors(result);
      //setDisabled(-1);
      setAttendancesInputs([])
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
      // getUsersAttendance();
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
                <Button
                  disabled={!day ? true : false}
                  color="primary"
                  onClick={() => setModal(!modal)}
                >
                  {' '}
                  Start An Attendance Day
                </Button>
              </Col>
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
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>First name</th>
                      <th>Last name</th>

                      <th>Attendance</th>
                      <th>Keys</th>

                      <th>comment</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, studentKey) => (

                      <tr key={studentKey}>
                        <td> {studentKey + 1}</td>
                        <td>{student.user.user_first_name}</td>
                        <td>{student.user.user_last_name}</td>

                        <td>
                          <UncontrolledButtonDropdown className="m-1">
                            <DropdownToggle caret>{disabled == studentKey ? currentStatus : student.attendance_status.status}</DropdownToggle>
                            <DropdownMenu>
                              {statuses.map((status, statusKey) => (
                                <DropdownItem
                                  key={statusKey}
                                  onClick={() => {
                                    setAttendance(status.id);
                                    setCurrentStatus(status.status);
                                    handleIndexClick(studentKey);
                                  }
                                  }>
                                  {status.status}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                          {/* <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="present_absent"
                                name="present_absent"
                                defaultValue={student.present_absent}
                                onChange={e => {
                                  setPresent(e.target.checked ? 1 : 0);
                                  setStudentId(student.id);
                                  handleIndexClick(studentKey);
                                }}
                              />{' '}
                              Present
                            </Label>
                          </FormGroup> */}
                        </td>
                        <td>
                          <FormGroup>
                            <Label>
                              <Input
                                defaultValue={student.attendance_key_amount}
                                type="number"
                                id="attendance_key_amount"
                                name="attendance_key_amount"
                                onChange={e => {
                                  catchInput(e);
                                }}
                              />
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          {' '}

                        </td>
                        <td>
                          <FormGroup>
                            <Label>
                              <Input
                                defaultValue={student.comment}
                                type="text"
                                id="comment"
                                name="comment"
                                onChange={e => {
                                  catchInput(e);


                                }}
                              />
                            </Label>
                          </FormGroup>
                        </td>

                        <td>
                          {' '}
                          <Button
                            onClick={(e) => { e.preventDefault(); createUserAttendance(student.id); }}
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
          <Row>
            <Button className='col-6' onClick={() => window.location.reload()} color="info">
              {' '}
            Finish{' '}
            </Button>

            <Button className='col-6' onClick={() => props.history.goBack()} >Back</Button>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default Attendance;
