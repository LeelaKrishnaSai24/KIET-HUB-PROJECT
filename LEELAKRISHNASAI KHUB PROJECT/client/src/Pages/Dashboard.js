import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TodoList from '../components/Todo/TodoList';
import { logoutUser } from '../Services/api';
import { clearUser } from '../Store/userSlice';
import styled from 'styled-components';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user); // get user email from redux store
  const dispatch = useDispatch(); // dispatch actions using useDispatch hook
  const navigate = useNavigate(); // navigate to different routes using useNavigate hook

  useEffect(() => {
    // If there is no user data in the redux store, redirect to the login page
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Call the logoutUser function from the API module to send the logout request
      await logoutUser(); // not in use yet
      // Clear user data in the redux store
      dispatch(clearUser());
      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <DashboardWrapper>
      <ContentWrapper>
        <TodoListWrapper>
          <TodoListTitle>Enter Your Notes Here</TodoListTitle>
          <TodoList /> {/* display the TodoList component */}
        </TodoListWrapper>
        <LogoutButtonWrapper>
          <LogoutButton className="btn btn-sm btn-danger" type="button" onClick={handleLogout}>
            Logout
          </LogoutButton>
        </LogoutButtonWrapper>
      </ContentWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: black; /* Black background */
  color: black; /* Black font color */
  font-family: 'Arial', sans-serif; /* Set the font family */
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TodoListWrapper = styled.div`
  flex: 1;
`;

const TodoListTitle = styled.h1`
  color: black; /* White font color for "To Do Today" */
`;

const LogoutButtonWrapper = styled.div`
  padding: 1rem;
  text-align: center;
`;

const LogoutButton = styled.button`
  background: #dc3545; /* Bootstrap danger color */
  color: #fff;
  border: none;
  padding: 1rem 2rem; /* Increase button size */
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.25rem; /* Increase font size */
  &:hover {
    background: #c82333;
  }
`;
