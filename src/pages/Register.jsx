import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'', age:'', dob:'', contact:'' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('https://ip-backend-nljd.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setMsg('Registered successfully. Redirecting to login...');
      setTimeout(()=> navigate('/login'), 1000);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Register</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input name="name" value={form.name} onChange={onChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" value={form.email} onChange={onChange} className="form-control" type="email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input name="password" value={form.password} onChange={onChange} className="form-control" type="password" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input name="age" value={form.age} onChange={onChange} className="form-control" type="number" />
          </div>
          <div className="mb-3">
            <label className="form-label">DOB</label>
            <input name="dob" value={form.dob} onChange={onChange} className="form-control" type="date" />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input name="contact" value={form.contact} onChange={onChange} className="form-control" />
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
        {msg && <div className="mt-3 alert alert-info">{msg}</div>}
      </div>
    </div>
  );
}
