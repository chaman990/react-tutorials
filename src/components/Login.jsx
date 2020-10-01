import React,{Component} from 'react';
import { Link } from "react-router-dom";
import { apiURL } from '../App';
import {ToastDanger, ToastSuccess} from 'react-toastr-basic';
import axios from 'axios';



class Login extends Component{
	
	constructor(props){
		super(props)

		this.state = {
			email:'',
			password:''
		}
	}

	changeHandler(event){
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	submitHandler(event,props){
		event.preventDefault();
		const { email, password} = this.state;
		if(email === "" && password === ""){
			ToastDanger('Please enter Email and password');
			return false;
		}


	axios.post( `${apiURL}Login.php`, {
	    email,password
	  })
	  .then(function (response) {
	    if(response.data.success){
	    	ToastSuccess('Success .  Please wait redirecting');
	    	setTimeout(() => props.history.push('/dashboard'), 1000 );
	    }else{
	    	ToastDanger('Email or password is wrong');
	    }
	  })
	  .catch(function (error) {
	    ToastDanger('Something Went Wrong');
	    console.log(error.message)
	  });

	}

	render(){
	return (
		<div className="hold-transition login-page">
			<div className="login-box">
			  <div className="login-logo">
			    <Link to="/"><b>Login</b></Link>
			  </div>
			  <div className="card">
			    <div className="card-body login-card-body">
			      <p className="login-box-msg">Sign in to start your session</p>

			      <form onSubmit={(event)=> this.submitHandler(event,this.props)} method="post">
			        <div className="input-group mb-3">
			          <input type="email" onChange={(event)=> this.changeHandler(event)} name="email" className="form-control" placeholder="Email" />
			          <div className="input-group-append">
			            <div className="input-group-text">
			              <span className="fas fa-envelope"></span>
			            </div>
			          </div>
			        </div>
			        <div className="input-group mb-3">
			          <input type="password" onChange={(event)=> this.changeHandler(event)}  name="password" className="form-control" placeholder="Password" />
			          <div className="input-group-append">
			            <div className="input-group-text">
			              <span className="fas fa-lock"></span>
			            </div>
			          </div>
			        </div>
			        <div className="row">
			          <div className="col-4">
			            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
			          </div>
			        </div>
			      </form>
			      	<br />
			      <p className="mb-0">
				        <Link to="register" className="text-center">Register Here</Link>
				   </p>
			    </div>
			  </div>
			</div>
		</div>
	);
	}
}

export default Login;