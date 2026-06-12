import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './AuthModal.module.css';

const Signup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register(username, email, password);
      onClose();
    } catch (err) {
      setError(err.username || err.email || err.password || err.message || 'Signup failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className={styles.modalTitle}>Sign Up</h2>
        {error && <div className={styles.errorText}>{typeof error === 'object' ? JSON.stringify(error) : error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username</label>
            <div className={styles.inputWrapper}>
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.formInput}
                placeholder="Username"
              />
              <span className={`material-symbols-outlined ${styles.inputIcon}`}>person</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <div className={styles.inputWrapper}>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
                placeholder="Email Address"
              />
              <span className={`material-symbols-outlined ${styles.inputIcon}`}>mail</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <div className={styles.inputWrapper}>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
                placeholder="Password"
              />
              <span className={`material-symbols-outlined ${styles.inputIcon}`}>lock</span>
            </div>
          </div>
          <button type="submit" disabled={isLoading} className={styles.submitButton}>
            {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </button>
        </form>
        <p className={styles.switchText}>
          Already have an account?
          <button onClick={onSwitchToLogin} className={styles.switchButton}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
