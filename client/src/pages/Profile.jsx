import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../ProfilePage.css';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client'; 
import { GET_USER_DATA, GET_USER_GOALS, UPDATE_USER_GOALS, UPDATE_GOAL_COMPLETION } from '../utils/queries';

function ProfilePage() {
  const { data } = Auth.getUser();
  const username = data?.username;
  const email = data?.email;

  const { data: userDataQuery } = useQuery(GET_USER_DATA);
  const { data: userGoalsData } = useQuery(GET_USER_GOALS);

  // Initialize state variables for user data and goals
  const [userData, setUserData] = useState({
    username: username,
    email: email,
  });

  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [editingGoalId, setEditingGoalId] = useState(null);

  useEffect(() => {
    if (userGoalsData) {
      setGoals(userGoalsData.user.goals); // Corrected to access the correct property
    }
  }, [userGoalsData]);

  const [updateUserGoals] = useMutation(UPDATE_USER_GOALS);
  const [updateGoalCompletion] = useMutation(UPDATE_GOAL_COMPLETION); // Added mutation

  const toggleGoalCompletion = (goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
    saveGoalsToServer(updatedGoals);
  };

  const startEditingGoal = (goalId) => {
    setEditingGoalId(goalId);
  };

  const handleGoalEdit = (goalId, newName) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, name: newName } : goal
    );
    setGoals(updatedGoals);
  };

  const saveGoalEdit = () => {
    setEditingGoalId(null);
    saveGoalsToServer(goals);
  };

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      const newGoalItem = {
        id: goals.length + 1,
        name: newGoal,
        completed: false,
      };

      const updatedGoals = [...goals, newGoalItem];
      setGoals(updatedGoals);
      saveGoalsToServer(updatedGoals);

      setNewGoal('');
    }
  };

  const saveGoalsToServer = (newGoals) => {
    updateUserGoals({
      variables: {
        goals: newGoals,
      },
    })
      .then((result) => {
        console.log('Goals updated successfully');
      })
      .catch((error) => {
        console.error('Error updating goals:', error);
      });
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
              <li>
                <input
                  type="text"
                  placeholder="Add a new goal"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                />
                <button onClick={handleAddGoal} className="button">
                  Add
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
