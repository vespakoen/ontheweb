import React from 'react'
import { connect } from 'react-redux';
import { actions } from '../redux/login'

const Login = (props) => {
  return (
    <div>
      <h1>Login</h1>
      <a href="#" onClick={() => props.guestLogin()}>Guest login</a>
    </div>
  )
}

export default connect(
  state => state,
  actions
)(Login)