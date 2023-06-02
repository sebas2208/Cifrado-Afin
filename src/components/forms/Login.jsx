import React, { useEffect, useState } from "react"
import axios from "axios"
import './login.css'
import { useNavigate, Link } from "react-router-dom"


function Login({ handleLogin }) {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://3.88.33.238/", {
        email,
        password,
      });

      if (response.data === 'exist') {
        handleLogin();
        history('/header', { state: { id: email } });
      } else if (response.data === 'notexist') {
        alert('User has not signed up');
      }
    } catch (error) {
      alert('Wrong details');
      console.log(error);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form action="POST">
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="submit" onClick={submit} />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Signup Page</Link>
    </div>
  )
}

export default Login;