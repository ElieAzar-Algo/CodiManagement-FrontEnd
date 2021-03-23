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

const ViewAttendance = props => {
  
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [errors, setErrors] = useState([]);
  const [modal, setModal] = useState(false);
  const [studentId, setStudentId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [presentDays, setPresentDays] = useState(0);
  const [studentName, setStudentName] = useState("Student");

  const cohortId = props.match.params.id;

  const getStudents = async () => {
    const res = await fetch(`http://localhost:8000/api/cohort/${cohortId}`);
    const result = await res.json();

    setStudents(result.data[0].users);
   // setCohortCode(result.data[0].cohort_code);
    console.log(result.data[0].users)
  };

  const getAttendances = async () => {
    const res = await fetch(`http://localhost:8000/api/attendance/${startDate}/${endDate}/${studentId}`);
    const result = await res.json();
    setAttendances(result.data)
   // console.log(result.data)
    let count=0
    result.data.map((s)=>(
       count= s.user_attendance[0].present_absent+count
    ))
    setPresentDays(count)
}

  

  useEffect(() => {
    getStudents();
  }, []);

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
                <Input type="date" onChange={(e)=>setStartDate(e.target.value)}></Input>
              </Col>

              <Col sm={2}>
                <Input type="date" onChange={(e)=>setEndDate(e.target.value)}></Input>
              </Col>
              <Col sm={4}>
                
                    <UncontrolledButtonDropdown className="m-1">
            <DropdownToggle caret>{studentName}</DropdownToggle>
                <DropdownMenu>
                 {students.map((student,studentKey)=>(
                  <DropdownItem key={studentKey}
                     onClick={()=>{setStudentName(student.user_first_name+' '+student.user_last_name);setStudentId(student.id)}}>
                      {student.user_first_name} {student.user_last_name} 
                      </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <Button color="primary" onClick={getAttendances}>
                  {' '}
                  View
                </Button>
               
              </Col>
              <Col sm={4}>
                  <h5 style={{color:"blue"}}>
                  {studentName} has attended {presentDays} days from {attendances.length} active days
                  </h5>
              </Col>
              <Col>
                <Modal isOpen={modal}>
                  <ModalHeader>
                    You are creating a new attendance day
                  </ModalHeader>
                  <ModalBody>the current attendance day is </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick="">
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
              <Col></Col>
              <Col>
                <Modal isOpen={modal}>
                  <ModalHeader>
                    You are creating a new attendance day
                  </ModalHeader>
                  <ModalBody>the current attendance day is </ModalBody>
                  <ModalFooter>
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
                      <th>Date</th>
                      <th>Attendance</th>
                      <th>Excuse</th>

                      <th>Comments</th>
                      <th>Mentor</th>
                      
                    </tr>
                  </thead>

                  <tbody>
                    {attendances.map((info, infoKey) => (
                      <tr>
                        <td>{info.attendance_date}</td>
                        <td>{info.user_attendance[0].present_absent?'Present':"Absent"} </td>
                        <td>{info.user_attendance[0].excuse?'Yes':"No"}</td>
    
                        <td>{info.user_attendance[0].comment?info.user_attendance[0].comment:"No Comments"}</td>
                        <td>{info.admin.username}</td>


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
export default ViewAttendance;
