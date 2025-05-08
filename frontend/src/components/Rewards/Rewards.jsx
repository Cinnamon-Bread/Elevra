
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthContext from '../../Hooks/useAuthContext'

const Rewards = ({ userId }) => {
  const { user } = useAuthContext()
  const [rewards, setRewards] = useState({ unlocked: [], locked: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!user) return

    const fetchRewards = async () => {
      try {
        const res = await axios.get(`/api/rewards/all/${user._id}`);
        setRewards(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [user]);

  if (loading) return <div className="text-center text-lg">Loading rewards...</div>;

  const renderProgress = (xpRequired) => {
    const progress = Math.min((user.xp / xpRequired) * 100, 100)
    return (
      <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🎁 Your Rewards</h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">Unlocked Rewards</h2>
        {rewards.unlocked.length === 0 && <p className="text-gray-500">No rewards unlocked yet!</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.unlocked.map((reward) => (
            <div key={reward._id} className="p-4 border border-green-300 rounded-xl shadow bg-green-50">
              <h3 className="text-xl text-zinc-800 font-bold">{reward.title}</h3>
              <p className="text-sm text-gray-700">{reward.description}</p>
              {renderProgress(reward.xpRequired)}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-red-700">Locked Rewards</h2>
        {rewards.locked.length === 0 && <p className="text-zinc-800">All rewards unlocked — you're amazing! 🔥</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.locked.map((reward) => (
            <div key={reward._id} className="p-4 border border-gray-300 rounded-xl shadow bg-gray-50 opacity-70">
              <h3 className="text-xl  text-zinc-800 font-bold">{reward.title}</h3>
              <p className="text-sm text-zinc-800">{reward.description}</p>
              {renderProgress(reward.xpRequired)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Rewards;
