//import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  UncontrolledAlert,
} from 'reactstrap';

const ViewAttendanceDay = props => {
  const [attendances, setAttendances] = useState([]);
  const [errors, setErrors] = useState([]);
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState();
  const [attendanceId, setAttendanceId] = useState(0);

  const cohortId = props.match.params.id;

  const getAttendances = async () => {
    const res = await fetch(`http://localhost:8000/api/attendance/${date}`);
    const result = await res.json();
    setAttendances(result.data);
    if (result.data[0]) {
      setAttendanceId(result.data[0].id);
    }
    console.log(result.data);
  };
  const deleteRecord = async () => {
    const deleteRequestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: "Bearer " + token,
      },
    };
    const res = await fetch(
      `http://localhost:8000/api/attendance/${attendanceId}`,
      deleteRequestOptions,
    );
    const result = await res.json();
    console.log(result.message);
    props.history.goBack();
  };

  useEffect(() => {}, []);

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
                  onChange={e => setDate(e.target.value)}
                ></Input>
              </Col>
              <Col sm={4}>
                <Button
                  className="mr-2"
                  color="primary"
                  onClick={getAttendances}
                >
                  {' '}
                  View{' '}
                </Button>
                <Button
                  color="danger"
                  onClick={() => setModal(!modal)}
                  disabled={!attendanceId}
                >
                  Delete Attendance Day
                </Button>
                <Modal
                  isOpen={modal}

                  //   className={props.className}
                >
                  <ModalHeader>You cannot undo this action !</ModalHeader>
                  <ModalBody>Are you sure, you want to delete?</ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={deleteRecord}>
                      Confirm
                    </Button>{' '}
                    <Button color="secondary" onClick={() => setModal(!modal)}>
                      Cancel
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
                      <th>Date</th>
                      <th>Name</th>
                      <th>Attendance</th>
                      <th>Excuse</th>
                      <th>Comments</th>
                      <th>Cohort</th>
                      <th>Mentor</th>
                    </tr>
                  </thead>

                  <tbody>
                    {attendances.map((info, infoKey) =>
                      info.user_attendance.map((user, userKey) =>
                        user.cohort_code == cohortId ? (
                          <tr>
                            <td>{info.attendance_date}</td>
                            <td>
                              {user.user_first_name} {user.user_last_name}
                            </td>

                            <td>
                              {user.pivot.present_absent ? 'Present' : 'Absent'}{' '}
                            </td>
                            <td>{user.pivot.excuse ? 'Yes' : 'No'}</td>

                            <td>
                              {user.pivot.comment
                                ? user.pivot.comment
                                : 'No Comments'}
                            </td>
                            <td>{user.cohort.cohort_code}</td>
                            <td>{info.admin.username}</td>
                            <td></td>
                          </tr>
                        ) : (
                          ''
                        ),
                      ),
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
          <Button onClick={()=>props.history.goBack()} >Back</Button>
        </Card>
      </Col>
    </Row>
  );
};
export default ViewAttendanceDay;
