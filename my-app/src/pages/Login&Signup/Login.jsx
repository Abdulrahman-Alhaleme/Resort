import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {






  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setNameError('');
    setEmailError('');
    setPasswordError('');

    // Validate name, email, and password
    let isValid = true;
    // if (name.trim() === '') {
    //   setNameError('Name is required');
    //   isValid = false;
    // }
    // if (email.trim() === '') {
    //   setEmailError('Email is required');
    //   isValid = false;
    // } else if (!isValidEmail(email)) {
    //   setEmailError('Please enter a valid email address');
    //   isValid = false;
    // }
    // if (password.trim() === '') {
    //   setPasswordError('Password is required');
    //   isValid = false;
    // } else if (!isValidPassword(password)) {
    //   setPasswordError(
    //     'Password must contain at least one special character, one number, one capital letter, and be at least 8 characters long'
    //   );
    //   isValid = false;
    // }

    if (isValid) {
      try {
        const res = await axios.post('/Login', { email, password });
        // setUser(res.data);
        console.log(res.data)
      } catch (error) {
        console.log('error');
      }
    }
  };

  const isValidEmail = (email) => {
    // Simple email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Password validation regex pattern
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    try {
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className='container'>
      {user ? (
        <div className='home'>
          <span>
            Welcome to the <b>{user.isAdmin ? 'admin' : 'user'}</b> dashboard <b>{user.name}</b>
          </span>
          <span>Delete user:</span>
          <button className='deletebutton' onClick={() => handleDelete(1)}>
            Delete tamara
          </button>
          <button className='deletebutton' onClick={() => handleDelete(2)}>
            Delete sara
          </button>
          {error && <span className='error'>You are not allowed to delete this user!</span>}
          {success && <span className='success'>User has been deleted successfully...</span>}
        </div>
      ) : (
        <section className='relative flex flex-wrap lg:h-screen lg:items-center'>
          <div className='w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24'>
            <div className='mx-auto max-w-lg text-center'>
              <h1 className='text-2xl font-bold sm:text-3xl'>Get started today!</h1>

              <p className='mt-4 text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque ipsa culpa
                autem, at itaque nostrum!
              </p>
            </div>

            <form onSubmit={handleSubmit} className='mx-auto mb-0 mt-8 max-w-md space-y-4'>
              {/* <div>
                <label htmlFor='name' className='sr-only'>
                  Name
                </label>
                <input
                  type='text'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {nameError && <span className='error'>{nameError}</span>}
              </div> */}

              <div>
                <label htmlFor='email' className='sr-only'>
                  Email
                </label>
                <input
                  type='email'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && <span className='error'>{emailError}</span>}
              </div>

              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  type='password'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)
                  setError("")}}
                  required
                />
                {passwordError && <span className='error'>{passwordError}</span>}
              </div>

              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                  No account?
                  <Link to="/signup" className='underline' href=''>
                    Sign up
                  </Link>
                </p>
                
                <button
                  type='submit'
                  className='inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'
                  >
                  Sign up
                </button>
                    
              </div>
            </form>
          </div>

          <div className='relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2'>
            <img
              alt='Welcome'
              src='https://images.unsplash.com/photo-1596178067639-5c6e68aea6dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
              className='absolute inset-0 h-full w-full object-cover'
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default Login;