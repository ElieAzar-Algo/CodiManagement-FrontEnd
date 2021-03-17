import React,{useEffect,useState}from 'react';
import {Link} from 'react-router-dom';
import {Row,Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Modal,
    ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import { UserCard } from '../components/Card';
import user1Image from '../assets/img/users/100_1.jpg';




const UserProfile = (props) => {
    const [user, setUser] = useState({});
    const [modal, setModal] = useState(false);

    const userId=props.match.params.id;

   const  getUser =async ()=>{
        //const cohortCode=props.match.params.name;
       
       const res =await  fetch(`http://localhost:8000/api/user/${userId}`);
       const result=await res.json()
       //console.log(result.data[0])
      setUser(result.data[0])
     }

     const deleteUser=async()=>{

        const deleteRequestOptions = {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              //Authorization: "Bearer " + token,
            },};
        const res =await  fetch(`http://localhost:8000/api/user/${userId}`,deleteRequestOptions);
        const result=await res.json()
        toggle();
        console.log(result.message)
        props.history.goBack()

     }

     const history=()=>{
        
        toggle();
     }

     const toggle = () => {
          setModal(!modal)
      };


     
     useEffect(()=>{
    
        getUser();
      
      },[])
    return(
        <>
        <Row>
        <Col xl={12} lg={12} md={12} md={5}>
          <UserCard
          
            avatar={user1Image}
            title={user.user_first_name+" "+user.user_last_name}
            subtitle={user.active_inactive==1?'Active':'Alumni'}
            text={props.match.params.name+ " Student"}
            style={{
              height: 300,
            
            }}
          />
        </Col>
        </Row>
            <Row className="m-3">
            <Col xl={3} lg={3} md={6}>
                <Link to="">
            <Button color="success">success</Button></Link>
                </Col>

                {/* //------------------------------//---------------------// */}
                <Col xl={3} lg={3} md={6}>
            <Button color="danger" onClick={toggle}>Delete Profile</Button>
                <Modal
                  isOpen={modal}
                  toggle={toggle}
                //   className={props.className}
                >
                  <ModalHeader toggle={toggle}>You cannot undo this action !</ModalHeader>
                  <ModalBody>
                     Are you sure, you want to delete {user.user_first_name}'s profile?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={deleteUser}>
                      Confirm
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                </Col>
            </Row>
        <Row className="m-2">
        <Col  xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Student Info</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Email : 
                  </Label>
                  <Col sm={7}>
                    <Input
                      plaintext
                      value={user.email}
                      readOnly
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Phone Number : 
                  </Label>
                  <Col sm={7}>
                    <Input
                       plaintext
                       value={user.user_phone_number}
                       readOnly
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Emergency Number : 
                  </Label>
                  <Col sm={7}>
                    <Input
                     plaintext
                     value={user.user_emergency_number}
                     readOnly
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Date Of Birth : 
                  </Label>
                  <Col sm={7}>
                    <Input
                       plaintext
                       value={user.user_birth_date}
                       readOnly
                    />
                  </Col>
                </FormGroup>


                <FormGroup row>
                  <Label for="exampleEmail" sm={5}>
                    Discord ID : 
                  </Label>
                  <Col sm={7}>
                    <Input
                       plaintext
                       value={user.user_discord_id}
                       readOnly
                    />
                  </Col>
                </FormGroup>
                
              </Form>
            </CardBody>
          </Card>
        </Col>


        <Col  xl={6} lg={12} md={12}>
          <Card>
          <CardHeader>Additional info</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Nationality : 
                  </Label>
                  <Col sm={8}>
                    <Input
                       plaintext
                       value={user.user_nationality}
                       readOnly
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Gender : 
                  </Label>
                  <Col sm={8}>
                    <Input
                     plaintext
                     value={user.user_gender}
                     readOnly
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    City : 
                  </Label>
                  <Col sm={8}>
                    <Input
                     plaintext
                     value={user.user_city}
                     readOnly
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Address : 
                  </Label>
                  <Col sm={8}>
                    <Input
                      plaintext
                      value={user.user_address}
                      readOnly
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>
                    Security Level : 
                  </Label>
                  <Col sm={8}>
                    <Input
                     plaintext
                     value={user.user_security_level}
                     readOnly
                    />
                  </Col>
                </FormGroup>
                
              </Form>
            </CardBody>
          </Card>
        </Col>
        </Row>
        </>
    )
}
export default UserProfile;

