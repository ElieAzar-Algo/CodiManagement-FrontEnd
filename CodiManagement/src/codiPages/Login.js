// import logo200Image from 'assets/img/logo/logo_200.png';
import bg from '../assets/img/bg/background_1920-7.png';
import codilogo from 'assets/img/logo/codi-logo.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import UncontrolledAlert from 'reactstrap/lib/UncontrolledAlert';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state={
        password:'',
        email:'',
        errors:'',
        auth:0,
        userID:0
    }


login=async(e)=>{

    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
      email:this.state.email,
      password:this.state.password
      }),
    });
    const result = await response.json();
    //console.log(result);
    if (result.access_token) {
        localStorage.setItem('userToken',result.access_token)

        localStorage.setItem('userID',result.user)
        this.setState({userID:result.user})
        this.setState({auth:result.status})
       
      console.log(result)
      
    } else {
       this.setState({errors:result.error});;
    }
}
handleInput =(e)=>{
    this.setState({email:e.target.value})
   // console.log(this.state.email)
}
handlePassword =(e)=>{
    this.setState({password:e.target.value})
   // console.log(this.state.password)
}

  render() {

    if(this.state.auth===200){
        return(
            <Redirect to={{pathname:`/user-profile/${this.state.userID}`}}  />
        )
    }
    return (
        <div style={{position:"relative",}}>
           
            <div style={{backgroundImage:"url("+bg+")",backgroundRepeat:"no-repeat",width:'30vw',margin:"100px 33% 100px auto ",border:'solid 1px black',padding:"50px 50px"}}>
          {this.state.errors&&  <UncontrolledAlert color="warning">{this.state.errors} </UncontrolledAlert>}
      <Form  onSubmit={this.handleSubmit}>
        
          <div className="text-center pb-4">
            <img
              src={codilogo}
              className="rounded"
              style={{ width: 150, height: 100, cursor: 'pointer' }}
              alt="logo"
             
            />
          </div>
        
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input name='email' onChange={this.handleInput} placeholder="email" />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input
          type='password'
          name='email' onChange={this.handlePassword}
           placeholder='password' />
        </FormGroup>
       
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.login}>
              LOGIN
        
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
           <Link to='/signup'><a>
                Signup
              </a></Link>   
        
          </h6>
        </div>

    
      </Form>
      </div>
      </div>
    );
  }
}



export default Login;
