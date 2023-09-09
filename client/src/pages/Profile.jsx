import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../ProfilePage.css';
// import Auth from '../utils/auth';

function ProfilePage() {
  // Initialize state variables
  const [userData, setUserData] = useState({
    username: 'User Name',
    email: 'UserEmail@example.com',
  });
  const [completedTasks, setCompletedTasks] = useState(2);
  const totalTasks = 5;
  const [goals, setGoals] = useState([
    { id: 1, name: 'Write your goals here' },
    { id: 2, name: 'Write your goals here' },
    { id: 3, name: 'Write your goals here' },
    { id: 4, name: 'Write your goals here' },
    { id: 5, name: 'Write your goals here' },
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({
    username: userData.username,
    email: userData.email,
  });
  const [editingGoalId, setEditingGoalId] = useState(null); 

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setUserData({
      username: editedUserInfo.username,
      email: editedUserInfo.email,
    });
  };

  const resetProgress = () => {
    setCompletedTasks(0);
  };

  const toggleGoalCompletion = (goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
  };

  // Start editing a goal
  const startEditingGoal = (goalId) => {
    setEditingGoalId(goalId);
  };

  // Handler for editing a goal's name
  const handleGoalEdit = (goalId, newName) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, name: newName } : goal
    );
    setGoals(updatedGoals);
  };

  // Handler for saving changes made to a goal
  const saveGoalEdit = () => {
    setEditingGoalId(null); // Exit editing mode by resetting the currently edited goal ID
  };

  return (
    <div>
      <div className="top-left-buttons">
        <Link to="/" className="homepage-button">
          Homepage
        </Link>
      </div>

      {/* <div>
        <button onClick={Auth.logout}>Logout</button>
      </div> */}

      <div className="profile-container">
        <div className="profile-info">
          <h2>{userData.username}'s Profile</h2>
          <p>Email: {userData.email}</p>
          {isEditing ? (
            <form onSubmit={handleUserInfoSubmit}>
              <input
                type="text"
                name="username"
                value={editedUserInfo.username}
                onChange={(e) =>
                  setEditedUserInfo({ ...editedUserInfo, username: e.target.value })
                }
              />
              <input
                type="text"
                name="email"
                value={editedUserInfo.email}
                onChange={(e) =>
                  setEditedUserInfo({ ...editedUserInfo, email: e.target.value })
                }
              />
              <button type="submit" className="button">
                Save
              </button>
            </form>
          ) : (
            <button onClick={() => setIsEditing(true)} className="button">
              Edit Info
            </button>
          )}
        </div>
        <div className="progression">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${Math.floor((completedTasks / totalTasks) * 100)}%` }}
            >
              <span className="progress-text">
                {Math.floor((completedTasks / totalTasks) * 100)}%
              </span>
            </div>
          </div>
          <button onClick={resetProgress} className="button">
            Reset Progress
          </button>
        </div>


        <div className="goals-container">
          <div className="fixed-goals-box">
            <h3>Goals and Objectives</h3>
            <ul style={{ listStyleType: 'none' }}>
              {goals.map((goal) => (
                <li key={goal.id} style={{ marginBottom: '20px' }}> 
                  {editingGoalId === goal.id ? (
                    <>
                      <input
                        type="text"
                        value={goal.name}
                        onChange={(e) => handleGoalEdit(goal.id, e.target.value)}
                      />
                      <button onClick={saveGoalEdit} className="button">
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => toggleGoalCompletion(goal.id)}
                        className="checkbox" 
                      />
                      <span
                        onClick={() => startEditingGoal(goal.id)}
                        style={{ cursor: 'pointer', marginLeft: '25px' }} 
                      >
                        {goal.name}
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
