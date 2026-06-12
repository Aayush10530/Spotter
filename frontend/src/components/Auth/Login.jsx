import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './AuthModal.module.css';

const Login = ({ isOpen, onClose, onSwitchToSignup }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(username, password);
      onClose();
    } catch (err) {
      setError(err.detail || err.message || 'Login failed.');
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
        <h2 className={styles.modalTitle}>Login</h2>
        {error && <div className={styles.errorText}>{error}</div>}
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
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
        <p className={styles.switchText}>
          Don't have an account?
          <button onClick={onSwitchToSignup} className={styles.switchButton}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
