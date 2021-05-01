import './App.css';
import React, { useState, useEffect } from "react";
import Tasks from './components/Tasks';
import Header from './components/Header';
import AddTask from './components/AddTask';
function App() {
  const [tasks, setTasks] = useState([]);

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      'method': 'DELETE'
    })
    setTasks(tasks.filter((task) => (task.id !== id)))
  }
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }
  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

  }
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);

  return (
    <div className="App container">
      <Header showAdd={showAddTask} onAdd={() => setShowAddTask(!showAddTask)} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length === 0 ? 'No tasks available' :
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      }
    </div>
  );
}

export default App;
