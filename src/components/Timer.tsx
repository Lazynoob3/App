import React, { useState, useEffect } from 'react';

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

interface TimerProps {
  task: Task;
  isRunning: boolean;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ task, isRunning, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize and start the first step
  useEffect(() => {
    if (isRunning && !hasStarted) {
      setHasStarted(true);
      setCurrentStepIndex(0);
      setTimeLeft(task.steps[0].duration);
      setIsBreak(false);
      // Announce the start of practice and first step
      setTimeout(() => {
        announce(`Starting ${task.name}`);
        setTimeout(() => {
          announce(`First step: ${task.steps[0].name}`);
        }, 2000);
      }, 500);
    }
  }, [isRunning, task, hasStarted]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0 && hasStarted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        announceTime(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isBreak) {
        // Break is over, move to next step
        const nextStepIndex = currentStepIndex + 1;
        if (nextStepIndex < task.steps.length) {
          setCurrentStepIndex(nextStepIndex);
          setTimeLeft(task.steps[nextStepIndex].duration);
          setIsBreak(false);
          announce(`Starting ${task.steps[nextStepIndex].name}`);
        } else {
          onComplete();
          announce("Practice complete!");
        }
      } else {
        // Step is complete, start break if there is one
        const currentStep = task.steps[currentStepIndex];
        if (currentStep.breakDuration > 0) {
          setTimeLeft(currentStep.breakDuration);
          setIsBreak(true);
          announce("Break time");
        } else {
          // No break, move to next step
          const nextStepIndex = currentStepIndex + 1;
          if (nextStepIndex < task.steps.length) {
            setCurrentStepIndex(nextStepIndex);
            setTimeLeft(task.steps[nextStepIndex].duration);
            announce(`Starting ${task.steps[nextStepIndex].name}`);
          } else {
            onComplete();
            announce("Practice complete!");
          }
        }
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, timeLeft, currentStepIndex, isBreak, task, onComplete]);

  const announce = (message: string) => {
    // Use the Web Speech API for announcements
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  const announceTime = (time: number) => {
    // Announce remaining time at specific intervals
    if (time <= 3 && time > 0) {
      announce(time.toString());
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentStep = task.steps[currentStepIndex];

  return (
    <div className="timer">
      <h3>{task.name}</h3>
      <div className="current-step">
        <h4>{isBreak ? "Break" : currentStep.name}</h4>
        <div className="time-display">
          {formatTime(timeLeft)}
        </div>
        <div className="progress">
          Step {currentStepIndex + 1} of {task.steps.length}
        </div>
      </div>
    </div>
  );
};

export default Timer;
