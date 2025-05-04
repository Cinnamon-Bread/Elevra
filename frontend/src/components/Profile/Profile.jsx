import React, { useContext, useEffect, useState } from 'react';
import  useAuthContext  from '../../Hooks/useAuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [rewards, setRewards] = useState([]);
  const { user } = useAuthContext();
  console.log("User from context:", user);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchCompletedHabits = async () => {
    if (!user || !user._id) return;

    try {
      const response = await fetch(`/api/habits/completed/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await response.json();

      if (response.ok) {
        setCompletedHabits(data);
      } else {
        console.error("Failed to fetch habits:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchRewards = async () => {
    try {
      const response = await fetch('/api/rewards');
      const data = await response.json();
      setRewards(data);
    } catch (error) {
      console.error("Error fetching rewards:", error);
    }
  };

  useEffect(() => {
    fetchCompletedHabits();
    fetchRewards();
  }, [user]);

  const xpForNextLevel = user ? 100 * user.level : 100;

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-neutral-800 text-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-emerald-400 text-center">Your Profile</h2>

      <div className="bg-neutral-900 p-4 rounded-lg mb-6">
        <p className="text-lg mb-2"><strong>Email:</strong> {user?.email}</p>
        <p className="text-lg mb-2"><strong>Level:</strong> {user?.level}</p>
        <p className="text-lg mb-2"><strong>XP:</strong> {user?.xp} / {xpForNextLevel}</p>

        {/* XP Progress Bar */}
        <div className="w-full bg-neutral-700 rounded-full h-4 mt-2">
          <div
            className="bg-amber-400 h-4 rounded-full transition-all duration-300"
            style={{ width: `${(user?.xp / xpForNextLevel) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-amber-300">Completed Habits</h3>
        {completedHabits.length > 0 ? (
          <ul className="space-y-2">
            {completedHabits.map((habit) => (
              <li key={habit._id} className="bg-neutral-900 p-3 rounded-lg flex justify-between items-center">
                <span>{habit.title}</span>
                <span className="text-amber-300 font-medium">{habit.xp} XP</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-400">No habits completed yet.</p>
        )}
        <ul className="mt-4">
          {rewards.map(reward => (
            <li key={reward._id} className="border-b py-2">
              <h3 className="font-semibold">{reward.title}</h3>
              <p>{reward.description}</p>
              {user.xp >= reward.xpRequired ? (
                <button className="text-blue-500 mt-2">Claim Reward</button>
              ) : (
                <span className="text-gray-500">Requires {reward.xpRequired} XP</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      

      <div className="text-center">
        <Link
          to="/update-profile"
          className="bg-amber-400 hover:bg-amber-300 text-black px-6 py-2 rounded-full font-semibold transition"
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;

