import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';
import styles from './Signup.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, error } = useSignup();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(user);
    if (success) {
      // console.log(success);
      navigate("/login",{replace:true});
      alert('successfully signed up');
      setUser({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <section className={styles.sectionForm}>
      <div className={styles.signupContent}>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <input
              name="username"
              className={styles.input}
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={handleInput}
              required
            />
            <FaUser className={styles.icon} />
          </div>
          <div className={styles.inputBox}>
            <input
              name="email"
              className={styles.input}
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={handleInput}
              required
            />
            <MdEmail className={styles.icon} />
          </div>
          <div className={styles.inputBox}>
            <input
              name="password"
              className={styles.input}
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInput}
              required
            />
            <FaLock className={styles.icon} />
          </div>
          <button type="submit" className={styles.signupButton}>Signup</button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </section>
  );
};

export default Signup;
