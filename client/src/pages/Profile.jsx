import React, { useState } from 'react';

function Profile() {
  // Sample user data (replace with actual user data from your app)
  const userData = {
    username: 'Joe Momma',
    email: 'JoeMomma@example.com',
    password: 'JoeDaddy'
  };

  // Sample completion data and goals (replace with actual data)
  const completedTasks = 5; // Number of completed tasks
  const totalTasks = 10; // Total number of tasks for the level
  const goals = [
    { id: 1, name: 'Goal 1', completed: true },
    { id: 2, name: 'Goal 2', completed: false },
    // Add more goals here
  ];

  // State for editing user info
  const [isEditing, setIsEditing] = useState(false);

  // State for user info form fields (if needed)
  const [userInfo, setUserInfo] = useState({
    username: userData.username,
    email: userData.email,
    // Add other user info fields here
  });

  // Function to handle user info form submission
  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update user info in your backend
    // Update userInfo state accordingly
    setIsEditing(false);
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
        <button>Reset Progress</button>
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
              <input type="checkbox" checked={goal.completed} readOnly />
              {goal.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
