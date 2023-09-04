import React, { useState } from 'react';
import '../ProfilePage.css';

function ProfilePage() {
  const [userData] = useState({
    username: 'User Name',
    email: 'UserEmail@example.com',
  });

  const [completedTasks, setCompletedTasks] = useState(2);
  const totalTasks = 5;

  const [goals, setGoals] = useState([
    { id: 1, name: 'Goal 1', completed: true },
    { id: 2, name: 'Goal 2', completed: true },
    { id: 3, name: 'Goal 3', completed: false },
    { id: 4, name: 'Goal 4', completed: false },
    { id: 5, name: 'Goal 5', completed: false },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: userData.username,
    email: userData.email,
  });

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const resetProgress = () => {
    setCompletedTasks(0);
  };

  const toggleGoalCompletion = (goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals); // Use setGoals to update the state
  };

  return (
    <div className="profile-container">
      <div className="profile-picture">
        {/* Display user's profile picture */}
        <img src="profile-picture.jpg" alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>{userData.username}'s Profile</h2>
        <p>Email: {userData.email}</p>
        {/* Display other user info fields */}
        {/* Add an edit button to toggle editing */}
        {isEditing ? (
          <form onSubmit={handleUserInfoSubmit}>
            <input
              type="text"
              name="username"
              value={userInfo.username}
              onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            />
            <input
              type="text"
              name="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
            {/* Add other user info fields here */}
            <button type="submit">Save</button>
          </form>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit Info</button>
        )}
      </div>
      <div className="progression">
        {/* Display progression bar */}
        <div className="progress-bar">
          Progress: {Math.floor((completedTasks / totalTasks) * 100)}%
        </div>
        {/* Add reset progress button */}
        <button onClick={resetProgress}>Reset Progress</button>
      </div>
      <div className="completed-tasks">
        {/* Display completed tasks */}
        <p>Completed Tasks: {completedTasks}/{totalTasks}</p>
      </div>
      <div className="goals">
        <h3>Goals and Objectives</h3>
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoalCompletion(goal.id)}
              />
              {goal.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
