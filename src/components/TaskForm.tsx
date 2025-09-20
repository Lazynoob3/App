import React, { useState } from 'react';

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

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>({
    name: '',
    duration: 30,
    breakDuration: 10
  });

  const handleAddStep = () => {
    if (currentStep.name) {
      setSteps([...steps, { ...currentStep }]);
      setCurrentStep({
        name: '',
        duration: 30,
        breakDuration: 10
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName && steps.length > 0) {
      onAddTask({
        id: 0, // Will be set by the parent component
        name: taskName,
        steps: steps
      });
      setTaskName('');
      setSteps([]);
    }
  };

  return (
    <div className="task-form">
      <h3>Create New Yoga Task</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Task Name:
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="step-form">
          <h4>Add Steps</h4>
          <div>
            <label>
              Step Name:
              <input
                type="text"
                value={currentStep.name}
                onChange={(e) => setCurrentStep({...currentStep, name: e.target.value})}
              />
            </label>
          </div>
          <div>
            <label>
              Duration (seconds):
              <input
                type="number"
                value={currentStep.duration}
                onChange={(e) => setCurrentStep({...currentStep, duration: parseInt(e.target.value)})}
                min="1"
              />
            </label>
          </div>
          <div>
            <label>
              Break Duration (seconds):
              <input
                type="number"
                value={currentStep.breakDuration}
                onChange={(e) => setCurrentStep({...currentStep, breakDuration: parseInt(e.target.value)})}
                min="0"
              />
            </label>
          </div>
          <button type="button" onClick={handleAddStep}>Add Step</button>
        </div>

        <div className="steps-list">
          <h4>Added Steps:</h4>
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <p>{step.name} - {step.duration}s (Break: {step.breakDuration}s)</p>
            </div>
          ))}
        </div>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
