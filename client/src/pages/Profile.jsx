import React, { useState } from 'react';
// using 'useState' hook to define 'userData' and initialize it with an object containing the users information.
// the setuserData function is used to update that information when needed, such as when the user edits their profile.
function Profile() {
  const [userData, setUserData] = useState({
    username: 'Joe Momma',
    email: 'JoeMomma@example.com',
    password: 'JoeDaddy'
  });

  // useState hook to define a state variable completedTasks and its associated setter function setCompletedTasks
  // nitializes completedTasks with the value 5, representing the number of tasks the user has completed
  // shouldnt this be retireved from the back end progress to display the completed tasks?? 
  const [completedTasks, setCompletedTasks] = useState(5); 
  const [totalTasks, setTotalTasks] = useState(10); 
  const goals = [
    { id: 1, name: 'Goal 1', completed: true },
    { id: 2, name: 'Goal 2', completed: false },
  ];

  // Using 'useState' hook to manage the editing state of the user information
  // 'isEditing' is a Boolean that determines if the user is currently editing their profile info or not
  // Here, we are initializing it with 'false'
  const [isEditing, setIsEditing] = useState(false);

  // Using 'useState' hook to manage the state of the user's information fields when in editing mode.
  // 'userInfo' is an object that holds the user's information (username, email, etc.)
  // We initialize it with the values from 'userData' when the user edits their information.
  const [userInfo, setUserInfo] = useState({
    username: userData.username,
    email: userData.email,
    // Add more properties here
  });

  // Function to handle user info form submission
  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update user info in your backend
    // Update userInfo state accordingly
    setUserData(userInfo); // Update userData with new values
    setIsEditing(false);
  };

  // Function to reset progress
  const resetProgress = () => {
    // Implement logic to reset progress on the backend
    // After resetting, update the completedTasks and totalTasks accordingly
    setCompletedTasks(0); // Reset completed tasks to 0
    setTotalTasks(10); // Reset total tasks to the initial value
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
