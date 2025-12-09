import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile(){
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          localStorage.removeItem('token');
          return navigate('/login');
        }
        const data = await res.json();
        setUser(data);
        setForm({ name: data.name || '', age: data.age || '', dob: data.dob ? data.dob.slice(0,10) : '', contact: data.contact || '' });
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    })();
 }, [token, navigate]);

  const onChange = e => setForm({...form, [e.target.name]: e.target.value });

  const save = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      setUser(data.user);
      setEdit(false);
      alert('Profile updated');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h3>Profile</h3>

        {!edit && (
          <div className="card p-3">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age ?? '-'}</p>
            <p><strong>DOB:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : '-'}</p>
            <p><strong>Contact:</strong> {user.contact || '-'}</p>
            <button className="btn btn-primary" onClick={() => setEdit(true)}>Edit</button>
          </div>
        )}

        {edit && (
          <div className="card p-3">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input name="name" value={form.name} onChange={onChange} className="form-control" />
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
            <button className="btn btn-success me-2" onClick={save}>Save</button>
            <br />
            <button className="btn btn-secondary" onClick={() => setEdit(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
