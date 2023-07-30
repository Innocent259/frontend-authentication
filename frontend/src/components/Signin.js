import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {  
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/signin', formData, {withCredentials: true})
      let success = response.data.success
      if(success) {
        navigate('/')
      }
    }
    catch(err) {
      console.log(err)
    }
    // console.log('Login form data submitted:', formData);
    // setFormData({
    //   email: '',
    //   password: '',
    // });
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit} className="signin">
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
