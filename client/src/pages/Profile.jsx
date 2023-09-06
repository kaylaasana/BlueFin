import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../ProfilePage.css';

// using useState initializing 'userData' with default values for 'username' and 'email'
function ProfilePage() {
  const [userData, setUserData] = useState({
    username: 'User Name',
    email: 'UserEmail@example.com',
  });

  // State for the number of completed tasks and its setter function
  // Constant representing the total number of tasks
  const [completedTasks, setCompletedTasks] = useState(2);
  const totalTasks = 5;

  // Array of goal objects, each with an ID, name
  const [goals, setGoals] = useState([
    { id: 1, name: 'Goal 1'},
    { id: 2, name: 'Goal 2'},
    { id: 3, name: 'Goal 3'},
    { id: 4, name: 'Goal 4'},
    { id: 5, name: 'Goal 5'},
  ]);

  // array of booleans indicating if each goal is in an editable state
  // setEditableGoals function is used to update this state.
  const [editableGoals, setEditableGoals] = useState(goals.map(() => false)); 

  // tracking whether the user is in an editing mode
  // setIsEditing function is used to toggle this state
  const [isEditing, setIsEditing] = useState(false);

  // Storing edited user information, based on userData
  // setEditedUserInfo function is used to update this state.
  const [editedUserInfo, setEditedUserInfo] = useState({
    username: userData.username,
    email: userData.email,
  });

  // state for the users profile picture, set to null initially
  const [profilePicture, setProfilePicture] = useState(null);

  // Handler for submitting the user info
  const handleUserInfoSubmit = (e) => {
    e.preventDefault();

    // Turn off editing mode
    setIsEditing(false);

    // Updating the user data state with the edited user information
    setUserData({
      username: editedUserInfo.username,
      email: editedUserInfo.email,
    });
  };

  // Handler for resetting the progress by setting completed tasks to 0
  // Update the state variable completedTasks to 0
  const resetProgress = () => {
    setCompletedTasks(0);
  };

  // toggling the completion status of a goal
  const toggleGoalCompletion = (goalId) => {
    // Map through the goals array and update the completed status of the goal with the given ID
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );
    // Update the state variable goals with the updated array
    setGoals(updatedGoals);
  };

  // toggling the edit mode of a goal
  const toggleGoalEdit = (goalId) => {
    // Create a copy of the editableGoals array
    const updatedEditableGoals = [...editableGoals];
    // Toggle the edit mode for the goal with the given ID
    updatedEditableGoals[goalId - 1] = !updatedEditableGoals[goalId - 1];
    // Update the state variable editableGoals with the updated array
    setEditableGoals(updatedEditableGoals);
  };

  // Handler for editing a goal's name
  const handleGoalEdit = (goalId, newName) => {
    // Map through the goals array and update the name of the goal with the given ID
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, name: newName } : goal
    );
    // Update the state variable goals with the updated array
    setGoals(updatedGoals);
  };

  // saving changes made to a goal
  const saveGoalEdit = (goalId) => {
    // Calling the toggleGoalEdit function to exit edit mode
    toggleGoalEdit(goalId);
  };

  // Layout of the page below with links
  return (
    <div>
      {/* Top left corner buttons */}
      <div className="top-left-buttons">
        <Link to="/" className="homepage-button">
          Homepage
        </Link>
      </div>

      <div className="profile-container">
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
  <div className="progress-bar-container">
    <div className="progress-bar" style={{ width: `${Math.floor((completedTasks / totalTasks) * 100)}%` }}>
      <span className="progress-text">{Math.floor((completedTasks / totalTasks) * 100)}%</span>
    </div>
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
