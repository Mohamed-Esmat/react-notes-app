import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  ////////////useNavigate////////////////
  const navigate = useNavigate();

  /////////useState///////////////
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);

  ////////getUser///////////
  function getUser({ target }) {
    setUser({ ...user, [target.name]: target.value });
  }
  console.log(user);

  /////////////sendData to backend///////////////////////////
  async function sendData(e) {
    e.preventDefault();
    setWaiting(true);
    let { data } = await axios.post(
      'https://route-egypt-api.herokuapp.com/signin',
      user
    );
    console.log(data);
    if (data.message === 'success') {
      localStorage.setItem('token', data.token); //token best to be to the top of the navigate(However it does'nt even mater)
      navigate('/home');
    } else {
      setWaiting(false);
      setError(`${data.message}`);
    }
    // e.target.submit()
  }
  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
          <form onSubmit={sendData} method="POST">
            <div className="form-group">
              <input
                onChange={getUser}
                placeholder="Enter email"
                name="email"
                type="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                onChange={getUser}
                placeholder="confirm Password"
                name="password"
                type="password"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-info w-100">
              {waiting ? 'Waiting....' : 'SignIn'}
            </button>
            {error && (
              <div className="alert alert-danger text-center mt-4">{error}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
