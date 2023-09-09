import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../ProfilePage.css';
import Auth from '../utils/auth';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client'; // Import gql
import { GET_USER_DATA } from '../utils/queries';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function ProfilePage() {
  console.log(Auth.getUser());
  const {data} = Auth.getUser();
  const username = data?.username
  const email = data?.email
  // Initialize state variables
  const [userData, setUserData] = useState({
    username: username,
    email: email,
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

  const [editingGoalId, setEditingGoalId] = useState(null);

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
    <div className="profile-page-container">
      
        <Link to="/" className="homepage-button">
          Homepage
        </Link>
     
      <div>
        <button onClick={Auth.logout} className="logout-button">
          Logout
        </button>
      </div>
  
      <div className="profile-container">
        <div className="profile-info">
          <h2>{userData.username}'s Profile</h2>
          <p>Email: {userData.email}</p>
        </div>
        <div className="progression">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${Math.floor((completedTasks / totalTasks) * 100)}%`,
              }}
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
                <li key={goal.id} className="goal-item">
                  {editingGoalId === goal.id ? (
                    <>
                      <input
                        type="text"
                        value={goal.name}
                        onChange={(e) =>
                          handleGoalEdit(goal.id, e.target.value)
                        }
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
                        onClick={() => startEditingGoal(goal.id)} className="goal-name">
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
