import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  const [editableGoals, setEditableGoals] = useState(goals.map(() => false)); // New editableGoals state

  const [isEditing, setIsEditing] = useState(false);

  const [editedUserInfo, setEditedUserInfo] = useState({
    username: userData.username,
    email: userData.email,
  });

  const [profilePicture, setProfilePicture] = useState(null);

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

  const toggleGoalEdit = (goalId) => {
    const updatedEditableGoals = [...editableGoals];
    updatedEditableGoals[goalId - 1] = !updatedEditableGoals[goalId - 1];
    setEditableGoals(updatedEditableGoals);
  };

  const handleGoalEdit = (goalId, newName) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, name: newName } : goal
    );
    setGoals(updatedGoals);
  };

  const saveGoalEdit = (goalId) => {
    toggleGoalEdit(goalId);
    // You can add code here to save the updated goals to a backend or local storage if needed
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div>
      {/* Top left corner buttons */}
      <div className="top-left-buttons">
        <Link to="/" className="homepage-button">
          Homepage
        </Link>
      </div>

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
        <div className="goals">
    <h3>Goals and Objectives</h3>
    <ul style={{ listStyleType: 'none' }}> {/* Add inline style to remove bullet points */}
     {goals.map((goal) => (
        <li key={goal.id}>
          {editableGoals[goal.id - 1] ? (
             <>
             <input
                type="text"
                 value={goal.name}
                 onChange={(e) => handleGoalEdit(goal.id, e.target.value)}
             />
             <button onClick={() => saveGoalEdit(goal.id)}>Save</button>
             </>
         ) : (
              <>
              <input
               type="checkbox"
                checked={goal.completed}
               onChange={() => toggleGoalCompletion(goal.id)}
              />
             {goal.name}
             <button onClick={() => toggleGoalEdit(goal.id)}>Edit</button>
            </>
            )}
         </li>
        ))}
    </ul>
    </div>
    </div>
</div>
  );
}

export default ProfilePage;
