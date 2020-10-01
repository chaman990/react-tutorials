import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { apiURL } from '../App';
import {ToastDanger, ToastSuccess} from 'react-toastr-basic';
import axios from 'axios';

class Register extends Component {

	constructor(props){
		super(props)

		this.state = {
			name:'',
			email:'',
			password:'',
			cnfmpassword: ''
		}
	}

	changeHandler(event){
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	submitHandler(event,props){
		event.preventDefault();
		const { name,email,password,cnfmpassword} = this.state;
		if(name === "" && email === "" && password ==="" && cnfmpassword === ""){
			ToastDanger('Please Enter all details');
			return  false;
		}
		if(password !== cnfmpassword){
			ToastDanger('Password are not matching');
			return false;
		}

		axios.post(`${apiURL}Register.php`,{
			name,email,password
		})
		.then((response)=> {
			if(response.data.success){
			ToastSuccess(response.data.message);	
			setTimeout(() => props.history.push('/dashboard'), 1000 );
			}else{
				ToastDanger(response.data.message)
			}
		})
		.catch((error) => {
			ToastDanger(error.message);
		})

	}

	render() {
		return (
			<div className="hold-transition register-page">
			<div className="register-box">
			  <div className="register-logo">
			    <Link to="/"><b>Register</b></Link>
			  </div>

			  <div className="card">
			    <div className="card-body register-card-body">
			      <p className="login-box-msg">Register a new membership</p>

			      <form method="post" onSubmit={(event) => this.submitHandler(event,this.props)}>
			        <div className="input-group mb-3">
			          <input type="text" className="form-control" placeholder="Full name" name="name" value={this.state.name} onChange= {(event) => this.changeHandler(event)}/>
			          <div className="input-group-append">
			            <div className="input-group-text">
			              <span className="fas fa-user"></span>
			            </div>
			          </div>
			        </div>
			        <div className="input-group mb-3">
			          <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange= {(event) => this.changeHandler(event)}/>
			          <div className="input-group-append">
			            <div className="input-group-text">
			              <span className="fas fa-envelope"></span>
			            </div>
			          </div>
			        </div>
			        <div className="input-group mb-3">
			          <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange= {(event) => this.changeHandler(event)}/>
			          <div className="input-group-append">
			            <div className="input-group-text">
			              <span className="fas fa-lock"></span>
			            </div>
			          </div>
			        </div>
			        <div className="input-group mb-3">
			          <input type="password" className="form-control" placeholder="Retype password" name="cnfmpassword" value={this.state.cnfmpassword} onChange= {(event) => this.changeHandler(event)}/>
			          <div className="input-group-append">
			            <div className="input-group-text">
			              <span className="fas fa-lock"></span>
			            </div>
			          </div>
			        </div>
			          
			          <div className="col-4">
			            <button type="submit" className="btn btn-primary btn-block">Register</button>
			          </div>
			      </form>
			      <Link to="/login" className="text-center">Already A Member Login</Link>
			</div>
			</div></div></div>
			

		);
	}
}


export default Register;