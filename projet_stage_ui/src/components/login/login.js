import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import loginImg from '../assets/login.jpg'
import { withRouter } from '../../common/with-router';
import Navbar from "../navbar/example";


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
 

    class Login extends Component {
        constructor(props) {
          super(props);
          this.handleLogin = this.handleLogin.bind(this);
          this.onChangeUsername = this.onChangeUsername.bind(this);
          this.onChangePassword = this.onChangePassword.bind(this);
      
          this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
          };
        }
      
        onChangeUsername(e) {
          this.setState({
            username: e.target.value
          });
        }
      
        onChangePassword(e) {
          this.setState({
            password: e.target.value
          });
        }
      
        handleLogin(e) {
          e.preventDefault();
      
          this.setState({
            message: "",
            loading: true
          });
      
          this.form.validateAll();
      
          if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password)
            .then(
              () => {
                const _currentUser = AuthService.getCurrentUser();
                if(_currentUser.roles[0] === 'ROLE_USER'){
                  this.props.router.navigate("/ticketListC");
                  window.location.reload();
                }else if(_currentUser.roles[0] === 'ROLE_ADMIN'){
                  this.props.router.navigate("/homee");
                  window.location.reload();
                }else if(_currentUser.roles[0] === 'ROLE_DEV'){
                  this.props.router.navigate("/ticketListD");
                  window.location.reload();
                }else{
                  this.props.router.navigate("/");
                  window.location.reload();
                }
              },
              error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                this.setState({
                  loading: false,
                  message: resMessage
                });
              }
            );
          } else {
            this.setState({
              loading: false
            });
          }
        }

render() {
  return (
    <>
    <div>
    <Navbar/> 
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='bg-gray-100 flex flex-col justify-center'>
            <Form className='max-w-[400px] w-full mx-auto bg-white p-4' 
                onSubmit={this.handleLogin}
                ref={c => {
                this.form = c;
                }}
            >
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <Input className='border p-2' type="text" 
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                    />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <Input className='border p-2' type="password" 
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required]}
                    />
                </div>
                <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'
                    disabled={this.state.loading}
                    >{this.state.loading && (
                  <span></span>
                )}
                <span>Login</span>
                </button>

                {this.state.message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {this.state.message}
                    </div>
                </div>
                )}
                <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                    this.checkBtn = c;
                }}
                />
                <div className='flex justify-between'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                </div>
            </Form>
        </div>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="" />
        </div>
    </div>
    </div>
    </>
  )
}
}
export default withRouter(Login);