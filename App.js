import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import TaskScreen from './TaskScreen'; // Import the TaskScreen

const Stack = createStackNavigator();

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Ensure task always has a description, even if empty
  const addTask = (text, description = '') => {
    setTasks([...tasks, { id: Date.now().toString(), text, description, completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  const onToggleTask = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="TaskScreen">
          {props => (
            <TaskScreen
              {...props}
              tasks={tasks}
              onAddTask={addTask} // Pass both task and description here
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              onToggleTask={onToggleTask}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
