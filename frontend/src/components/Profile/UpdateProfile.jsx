import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../Hooks/useAuthContext';

const UpdateProfile = () => {
  const { user, dispatch } = useAuthContext();
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/me', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setUsername(data.username || '');
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length > 20) {
      setMessage('Username must be 20 characters or fewer.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    if (profilePic) formData.append('profilePic', profilePic);

    try {
      const res = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: 'UPDATE_USER', payload: {...data.user, token: data.token}})
        localStorage.setItem('user', JSON.stringify({ ...data.user, token: data.token }))
        setMessage('Profile updated!')
        setTimeout(() => navigate('/'), 1500); // Redirect after update
      } else {
        setMessage(data.error || 'Failed to update');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-zinc-800 shadow-lg rounded">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={username}
            maxLength={20}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default UpdateProfile;
