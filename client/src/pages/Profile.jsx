import React, { useState } from 'react';
import '../ProfilePage.css';

function ProfilePage() {
  const [userData, setUserData] = useState({
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

  const [editedUserInfo, setEditedUserInfo] = useState({
    username: userData.username,
    email: userData.email,
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);

    // Update the userData state with the edited information
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

  // Function to handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
<div className="profile-container">
  <div className="profile-picture">
    {/* Display user's profile picture */}
    <img src={profilePicture ? URL.createObjectURL(profilePicture) : 'profile-picture.jpg'} alt="Profile" />
    {/* Conditional rendering of input field for profile picture upload */}
    {isEditing ? (
      <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
    ) : null}
  </div>
  <div className="profile-info">
    <h2>{userData.username}'s Profile</h2>
    <p>Email: {userData.email}</p>
    {/* Display other user info fields */}
    {isEditing ? (
      <form onSubmit={handleUserInfoSubmit}>
        <input
          type="text"
          name="username"
          value={editedUserInfo.username}
          onChange={(e) => setEditedUserInfo({ ...editedUserInfo, username: e.target.value })}
        />
        <input
          type="text"
          name="email"
          value={editedUserInfo.email}
          onChange={(e) => setEditedUserInfo({ ...editedUserInfo, email: e.target.value })}
        />
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
