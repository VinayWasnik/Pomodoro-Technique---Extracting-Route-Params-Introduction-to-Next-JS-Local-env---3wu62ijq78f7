import { useState, useEffect } from 'react';
import { metadat } from './layout';
import styles from './page.module.css';


const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5); // Default break duration in minutes
  const [timerLabel, setTimerLabel] = useState('Work');
  const [timeLeft, setTimeLeft] = useState(workDuration * 60); // Initial time left in seconds
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    updateTimeDisplay(timeLeft);
  }, [timeLeft]);

  const updateTimeDisplay = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    setTimeLeft(seconds);
    document.title = `${metadata.title} - ${timerLabel} (${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds})`;
  };

  const startTimer = (duration, label) => {
    clearInterval(timerInterval);
    setTimerLabel(label);
    const endTime = Date.now() + duration * 60 * 1000;

    setTimerInterval(
      setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);
        if (secondsLeft < 0) {
          clearInterval(timerInterval);
          alert(`${label} time is up!`);
          if (label === 'Work') {
            startTimer(breakDuration, 'Break');
          } else {
            startTimer(workDuration, 'Work');
          }
          return;
        }
        updateTimeDisplay(secondsLeft);
      }, 1000)
    );
  };

  const handleStart = () => {
    startTimer(workDuration, 'Work');
  };

  const handleStop = () => {
    clearInterval(timerInterval);
    setTimerLabel('Paused');
  };

  const handleReset = () => {
    clearInterval(timerInterval);
    setTimerLabel('Work');
    updateTimeDisplay(workDuration * 60);
  };

  const handleSet = () => {
    const newWorkDuration = parseInt(document.getElementById('work-duration').value, 10);
    const newBreakDuration = parseInt(document.getElementById('break-duration').value, 10);

    if (!isNaN(newWorkDuration) && !isNaN(newBreakDuration) && newWorkDuration >= 0 && newBreakDuration >= 0) {
      setWorkDuration(newWorkDuration);
      setBreakDuration(newBreakDuration);
      updateTimeDisplay(newWorkDuration * 60);
    }
  };


  return (
    <div id="main">
    <div className="timer-container">
        <div className="timer">
          <span id="timer-label">{timerLabel}</span>
          <span id="time-left">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <div className="controls">
          <button id="set-btn" onClick={handleSet} data-testid="set-btn">
            Set
          </button>
          <button id="start-btn" onClick={handleStart} data-testid="start-btn">
            Start
          </button>
          <button id="stop-btn" onClick={handleStop} data-testid="stop-btn">
            Stop
          </button>
          <button id="reset-btn" onClick={handleReset} data-testid="reset-btn">
            Reset
          </button>
        </div>
        <div className="settings">
          <div className="duration">
            <label htmlFor="work-duration">Work Duration:</label>
            <input type="number" id="work-duration" data-testid="work-duration" min="0" defaultValue={workDuration} />
          </div>
          <div className="duration">
            <label htmlFor="break-duration">Break Duration:</label>
            <input type="number" id="break-duration" data-testid="break-duration" min="0" defaultValue={breakDuration} />
          </div>
        </div>
      </div>
    
    </div>
  );
};


export default App;
