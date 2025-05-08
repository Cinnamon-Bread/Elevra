import React, { useState, useEffect } from 'react';
import useAuthContext from '../../Hooks/useAuthContext';

const Leaderboards = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-zinc-100 mb-6">Leaderboard</h1>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-zinc-200 bg-zinc-800 border border-zinc-700">
          <thead className="bg-zinc-700 text-zinc-300 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">XP</th>
              <th className="px-6 py-3">Level</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((u, index) => (
              <tr
                key={u._id}
                className={`border-b border-zinc-700 hover:bg-zinc-700 transition ${
                  user && u._id === user.id ? 'bg-emerald-600 text-white font-semibold' : ''
                }`}
              >
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{u.username}</td>
                <td className="px-6 py-3">{u.xp}</td>
                <td className="px-6 py-3">{u.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboards;

