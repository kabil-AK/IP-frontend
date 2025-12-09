import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const onChange = e => setForm({...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('https://ip-backend-nljd.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Login</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" onChange={onChange} value={form.email} className="form-control" type="email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input name="password" onChange={onChange} value={form.password} className="form-control" type="password" required />
          </div>
          <button className="btn btn-success ">Login</button>
        </form>
        {msg && <div className="mt-3 alert alert-danger">{msg}</div>}
      </div>
    </div>
  );
}
