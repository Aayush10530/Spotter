import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const success = await login(username, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest dark:bg-[#121212] p-4">
            <div className="max-w-md w-full bg-white dark:bg-[#1C1C1E] rounded-xl shadow-xl border border-outline-variant dark:border-gray-800 p-8">
                <div className="flex flex-col items-center mb-8">
                    <span className="material-symbols-outlined text-[48px] text-primary mb-2">local_shipping</span>
                    <h2 className="text-2xl font-bold text-on-surface dark:text-white">SpotterAI ELD</h2>
                    <p className="text-sm text-on-surface-variant dark:text-gray-400 mt-1">Sign in to your account</p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6 text-center border border-red-200 dark:border-red-900/50">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-on-surface-variant dark:text-gray-400 uppercase tracking-wider mb-1">Username</label>
                        <input 
                            type="text" 
                            className="w-full bg-surface-container-lowest dark:bg-[#2C2C2E] border border-outline-variant dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-on-surface dark:text-white focus:outline-none focus:border-primary"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-on-surface-variant dark:text-gray-400 uppercase tracking-wider mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-surface-container-lowest dark:bg-[#2C2C2E] border border-outline-variant dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-on-surface dark:text-white focus:outline-none focus:border-primary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors mt-2">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
