const [tasks, setTasks] = useState([]);

const handleAddTask = (task) => {
  setTasks([...tasks, task]);
};

const handleDeleteTask = (taskId) => {
  setTasks(tasks.filter((task) => task.id !== taskId));
};

const handleToggleComplete = (taskId) => {
  setTasks(
    tasks.map((task) => 
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    )
  );
};
