import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TaskScreen = ({ tasks, onAddTask, onDeleteTask, onEditTask, onToggleTask }) => {
  const [newTask, setNewTask] = React.useState('');
  const [newDescription, setNewDescription] = React.useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask, newDescription); // Pass task and description
      setNewTask('');
      setNewDescription(''); // Clear inputs after adding task
    } else {
      Alert.alert('Error', 'Task cannot be empty');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => onToggleTask(item.id)}>
        <Icon name={item.completed ? "check-box" : "check-box-outline-blank"} size={24} color="#6e00ff" />
      </TouchableOpacity>
      <View style={styles.taskTextContainer}>
        <TextInput
          style={[styles.taskInput, item.completed && styles.completedTask]}
          value={item.text}
          onChangeText={(text) => onEditTask(item.id, text)}
          editable={!item.completed} // Prevent editing if task is completed
        />
        {item.description ? (  // Only show description if it's not empty
          <Text style={styles.descriptionText}>{item.description}</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={() => onDeleteTask(item.id)}>
        <Icon name="delete" size={24} color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Your Tasks</Text>
      
      {/* Task Name Input */}
      <TextInput
        placeholder="Add a new task"
        placeholderTextColor="#888"
        style={styles.input}
        value={newTask}
        onChangeText={setNewTask}
      />

      {/* Task Description Input */}
      <TextInput
        placeholder="Add a description"
        placeholderTextColor="#888"
        style={styles.input}
        value={newDescription}
        onChangeText={setNewDescription}
      />

      {/* Add Task Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Pending Tasks */}
      <Text style={styles.subtitle}>Pending Tasks</Text>
      <FlatList
        data={tasks.filter(task => !task.completed)}  // Filter pending tasks
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Completed Tasks */}
      <Text style={styles.subtitle}>Completed Tasks</Text>
      <FlatList
        data={tasks.filter(task => task.completed)}  // Filter completed tasks
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#1c1c1e',
    borderColor: '#444',
    borderWidth: 1,
    marginBottom: 10, // Add some space between task name and description inputs
    color: '#fff',
  },
  addButton: {
    padding: 15,
    backgroundColor: '#6e00ff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Center the button horizontally
    width: '50%', // Make the button take half the width of the screen
    marginVertical: 20, // Add space above and below the button
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#444',
    borderWidth: 1,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskInput: {
    fontSize: 16,
    color: '#fff',
  },
  descriptionText: {
    fontSize: 14,
    color: '#aaa', // Lighter text for the description
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default TaskScreen;
