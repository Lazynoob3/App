# Yoga Practice Timer Application

A web-based application that helps you create and follow yoga practice routines with customizable steps and timers. The application works offline and can be installed on your mobile device as a Progressive Web App (PWA).

## 🌟 Features

- Create custom yoga practice routines
- Add multiple steps with individual timers
- Set break durations between steps
- Voice announcements for steps and countdowns
- Works offline
- Save your routines automatically
- Mobile-friendly design

## 📱 How to Use the Application

1. **Creating a New Yoga Routine**
   - Click "Create New Yoga Task"
   - Enter a name for your routine (e.g., "Morning Yoga")
   - Add steps:
     - Step name (e.g., "Mountain Pose")
     - Duration in seconds (e.g., 30)
     - Break duration in seconds (e.g., 10)
   - Click "Add Step" to add more steps
   - Click "Create Task" when finished

2. **Starting a Practice**
   - Find your routine in the list
   - Click "Start Practice"
   - The app will follow this precise sequence for each practice:
     1. Announces "Starting [Practice Name]"
     2. After 2 seconds, announces "First step: [Step Name]"
     3. Starts the timer for the first step's duration
     4. Countdown announcements for last 3 seconds of each step
     5. After step completes, announces "Break time" (if break is set)
     6. After break, announces next step name
     7. Repeats steps 3-6 for each subsequent pose
     8. Announces "Practice complete!" at the end
   - The timer display shows:
     - Current step name or "Break"
     - Time remaining in minutes and seconds
     - Current step number and total steps
   - Voice announcements guide you through all transitions

## 💻 Technical Details (For Developers)

### File Structure
```
App/
├── public/
│   ├── index.html      # Main HTML file
│   └── manifest.json   # PWA configuration
└── src/
    ├── index.tsx       # Application entry point
    ├── App.tsx         # Root component
    ├── App.css         # Global styles
    └── components/
        ├── Dashboard.tsx   # Main container
        ├── TaskForm.tsx    # Form for creating tasks
        └── Timer.tsx       # Timer component
```

### Code Flow Explanation

1. **Entry Point (`index.tsx`)**
   - Initializes the React application
   - Renders the main `App` component
   - Sets up PWA capabilities

2. **App Component (`App.tsx`)**
   - Provides the basic layout
   - Contains the header
   - Renders the Dashboard component

3. **Dashboard Component (`Dashboard.tsx`)**
   - Manages the main state of the application
   - Stores and retrieves tasks from localStorage
   - Contains two main sections:
     - Task list and creation form
     - Active timer display
   - Key functions:
     - `handleAddTask`: Adds new tasks
     - `startTask`: Begins a practice session
     - `stopTask`: Ends the current session

4. **TaskForm Component (`TaskForm.tsx`)**
   - Handles the creation of new tasks
   - Manages the form state for:
     - Task name
     - Step details (name, duration, break time)
   - Validates input
   - Sends new task data to Dashboard

5. **Timer Component (`Timer.tsx`)**
   - Controls the practice session
   - Manages countdown timer
   - Handles voice announcements
   - Shows progress through steps
   - State Management:
     - `currentStepIndex`: Tracks current step
     - `timeLeft`: Remaining time for step/break
     - `isBreak`: Whether in break period
     - `hasStarted`: Ensures proper initialization
   - Sequence of operations:
     1. When practice starts:
        - Announces practice name
        - Waits 2 seconds
        - Announces first step name
        - Begins step timer
     2. During each step:
        - Shows countdown timer
        - Announces last 3 seconds
        - Transitions to break or next step
     3. During breaks:
        - Shows break countdown
        - Announces next step when break ends
     4. Completes when all steps are done
   - Features:
     - Visual countdown
     - Step progress indicator
     - Voice prompts
     - Break time management
   - Key functions:
     - `announce`: Handles voice announcements
     - `announceTime`: Manages countdown announcements
     - `formatTime`: Converts seconds to display format

### Data Flow

1. **Task Creation**
   ```
   TaskForm → handleAddTask → Dashboard → localStorage
   ```

2. **Task Storage**
   - Tasks are automatically saved to localStorage
   - Persists across page refreshes
   - Format:
   ```javascript
   {
     id: number,
     name: string,
     steps: [
       {
         name: string,
         duration: number,
         breakDuration: number
       }
     ]
   }
   ```

3. **Practice Session**
   ```
   Dashboard → Timer → Voice Announcements → Session Complete
   ```

## 🔧 Customization Guide

### Adding a New Step Duration
1. Open `TaskForm.tsx`
2. Find the duration input field
3. Modify the min/max values or add presets

### Changing Voice Announcements
1. Open `Timer.tsx`
2. Locate the `announce` function
3. Modify the announcement text

### Styling Changes
1. Open `App.css`
2. Find the relevant section (e.g., `.timer`, `.dashboard`)
3. Modify the CSS properties

## 🚀 Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm start` for development
4. Run `npm run build` for production

## 📱 Mobile Installation (PWA)

1. Visit the application in Chrome/Safari
2. Click "Add to Home Screen"
3. The app will install like a native application

## 💾 Data Storage

- All tasks are saved automatically
- Data is stored in your browser's localStorage
- Clear browser data to reset all tasks

## 🐛 Troubleshooting

- **Tasks not saving?** Check if localStorage is enabled in your browser
- **No sound?** Ensure your device's media volume is on
- **Timer issues?** Refresh the page and try again

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

MIT License - Use it freely!
