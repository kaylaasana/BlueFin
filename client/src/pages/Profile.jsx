import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../ProfilePage.css';
import Auth from '../utils/auth';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import {
  GET_USER_DATA,
  GET_USER_GOALS,
  UPDATE_USER_GOALS,
  UPDATE_GOAL_COMPLETION,
} from '../utils/queries';

import { ADD_GOAL_TO_USER } from '../utils/mutation';

function ProfilePage() {
  // Get user data from authentication (assuming Auth.getUser() returns user data)
  const { data } = Auth.getUser();
  const username = data?.username;
  const email = data?.email;
  const id = data?._id;

  // Define GraphQL queries using useQuery hook
  const { data: userDataQuery } = useQuery(GET_USER_DATA);
  const { data: userGoalsData } = useQuery(GET_USER_GOALS, {
    variables: {
      userId: id,
    }
  });

  const [addGoal, {error}] = useMutation(ADD_GOAL_TO_USER)

  // Initialize Apollo Client
  // const client = useApolloClient();

  // State for user data
  const [userData, setUserData] = useState({
    username: username,
    email: email,
  });

  // State for user goals
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [editingGoalId, setEditingGoalId] = useState(null);

  // Update goals state when userGoalsData changes
  useEffect(() => {
    if (userGoalsData) {
      setGoals(userGoalsData.GetUserGoals);
      console.log(userGoalsData.GetUserGoals);
    }
  }, [userGoalsData]);

  // Update goals state when userDataQuery changes
  useEffect(() => {
    if (userDataQuery && userDataQuery.user) {
      const user = userDataQuery.user;
      setGoals(user.goals || []);
    }
  }, [userDataQuery]);

  // Define GraphQL mutation for updating user goals
  const [updateUserGoals] = useMutation(UPDATE_USER_GOALS);

  // Toggle completion of a goal
  const toggleGoalCompletion = (goalId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
    saveGoalsToServer(updatedGoals);
  };

  // Start editing a goal
  const startEditingGoal = (goalId) => {
    setEditingGoalId(goalId);
  };

  // Handle editing a goal
  const handleGoalEdit = (goalId, newName) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, name: newName } : goal
    );
    setGoals(updatedGoals);
  };

  // Save edited goal
  const saveGoalEdit = () => {
    setEditingGoalId(null);
    saveGoalsToServer(goals);
  };

  // Handle adding a new goal
  const handleAddGoal = async () => {
    if (!data || !data.username || !data._id) {
      console.error('User data is not available or incomplete:', data);
      return;
    }

    if (newGoal.trim() !== '') {
      const newGoalItem = {
        name: newGoal,
        completed: false,
      };

      const updatedGoals = [...goals, newGoalItem];
      setGoals(updatedGoals);
      await saveGoalsToServer(newGoal);

      setNewGoal('');
    }
  };

  // Save goals to the server
  const saveGoalsToServer = async (newGoal) => {
    if (data?._id) {
      try{
        await addGoal({
          variables: {
            userId: data._id,
            goal: newGoal,
          }
        })
      }catch(error){ 
        console.log(error);
      }
    } else {
      console.error('User data is not available or incomplete');
    }
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
                      <span onClick={() => startEditingGoal(goal.id)} className="goal-name">
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
