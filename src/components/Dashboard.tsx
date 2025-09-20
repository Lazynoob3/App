import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Timer from './Timer';

interface Step {
  name: string;
  duration: number;
  breakDuration: number;
}

interface Task {
  id: number;
  name: string;
  steps: Step[];
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('yogaTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('yogaTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const startTask = (task: Task) => {
    setActiveTask(task);
    setIsRunning(true);
  };

  const stopTask = () => {
    setActiveTask(null);
    setIsRunning(false);
  };

  return (
    <div className="dashboard">
      <div className="tasks-section">
        <h2>Your Yoga Tasks</h2>
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <h3>{task.name}</h3>
              <div className="task-details">
                <p><strong>Total Steps:</strong> {task.steps.length}</p>
                <p><strong>Steps:</strong></p>
                <ul>
                  {task.steps.map((step, index) => (
                    <li key={index}>
                      {step.name} ({step.duration}s + {step.breakDuration}s break)
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => startTask(task)}
                className="start-button"
              >
                Start Practice
              </button>
            </div>
          ))}
        </div>
        <div className="create-task-section">
          <h3>Create New Practice</h3>
          <TaskForm onAddTask={handleAddTask} />
        </div>
      </div>
      <div className="timer-section">
        {activeTask ? (
          <Timer
            task={activeTask}
            isRunning={isRunning}
            onComplete={stopTask}
          />
        ) : (
          <div className="timer-placeholder">
            <h3>No Active Practice</h3>
            <p>Select a practice from the list to begin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
