import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function Register(props) {
  let navigate = useNavigate();

  const [error, setError] = useState('');
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [waiting, setWaiting]=useState(false);
  
   function getUser({ target }) {
     setUser({...user,[target.name]:target.value});
    
  }
console.log(user);


  async function sendData(e) {
    setWaiting(true);
    e.preventDefault();
    let { data } = await axios.post(
      `https://route-egypt-api.herokuapp.com/signup`,
      user
    );
    if (data.message === 'success') {
      navigate('/home');
      // setWaiting(false);
      // props.history.replace('/login');
    } else {
      setError(`${data.message}`);
      setWaiting(false);
    }
    console.log(data);
  }
  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
          <form onSubmit={sendData}>
            <div className="form-group">
              <input
                onChange={getUser}
                placeholder="Enter your name"
                name="first_name"
                type="text"
                className=" form-control"
              />
            </div>
            <div className="form-group">
              <input
                onChange={getUser}
                placeholder="Enter your name"
                name="last_name"
                type="text"
                className=" form-control"
              />
            </div>
            <div className="form-group">
              <input
                onChange={getUser}
                placeholder="Enter email"
                type="email"
                name="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                onChange={getUser}
                placeholder="Enter you password"
                type="password"
                name="password"
                className="form-control"
              />
            </div>
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}
            <button type="submit" className="btn btn-info w-100">
              {waiting?'Waiting....':'SignUp'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
