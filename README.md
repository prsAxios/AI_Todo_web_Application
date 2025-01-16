# AI Todo Web Application

This project is a smart task management application that integrates AI to help users generate and organize their daily tasks. It incorporates authentication and a user profile page for personalized experiences. The application uses **Google Gemini API** to generate structured and actionable task lists based on user inputs.

## Features

- **Task Creation**: Users can create and manage their daily tasks with a title, description, time slot, and priority level.
- **Gemini API Integration**: The AI-powered task generation feature uses Google's **Gemini API** to help users plan their day by generating a list of tasks. Users can provide prompts to the AI, and it returns a JSON array of tasks.
- **Authentication**: User authentication is implemented for secure access to the app. Users can sign up, log in, and access their personalized tasks and profile.
- **User Profile**: Users can view and update their profile, which includes personal information and task details.
- **Task Completion**: Tasks can be marked as completed, and users can view their completed and pending tasks separately.
- **Task Priority**: Tasks are prioritized with levels (High, Medium, Low) to help users focus on what’s most important.

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: (if any, or can mention "currently frontend-only")
- **Database**: Local Storage (for task persistence)
- **Gemini API**: Integrated for AI-powered task generation.

## Setup and Installation

### Prerequisites
- Node.js (v14.x or higher)
- NPM or Yarn

### Getting Started
1. Clone the repository:
   git clone https://github.com/yourusername/ai-todo-web-application.git
   
2. Navigate to the project directory:
   cd ai-todo-web-application
   
3. Install the dependencies:
   npm install
   
5. Create a `.env` file and add your **Gemini API key**:
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   
7. Start the application:
   npm run dev

8. Visit `http://localhost:3000` in your browser.

## Gemini API Integration

This application utilizes the **Gemini API** from Google to generate task lists. Users can input prompts such as "Generate a task list for today," and the AI returns a structured array of tasks. Each task contains:
- `id`: A unique identifier
- `text`: The task name
- `description`: A brief description of the task
- `time`: The time slot allocated for the task
- `completed`: A default `false` value
- `priority`: The task's priority level (High, Medium, Low)

### How It Works:
- The **handlePromptUpload** function sends the user’s prompt along with a default template to the Gemini API.
- The API returns a structured JSON array of tasks.
- The tasks are parsed and added to the state, allowing users to view them and mark them as completed or delete them.

### Example Prompt:
```plaintext
Generate an array of 10 tasks for a productive day. Each task should include:
- id: A unique identifier (integer starting from 1)
- text: The task name
- description: A short description of the task
- time: The time slot for the task (e.g., "6:00 AM - 6:30 AM")
- completed: A default boolean value set to false
- priority: A priority level (High, Medium, or Low)
```

## Screenshots

![cardMode_image](https://github.com/user-attachments/assets/4f8d6876-1f7a-44f4-acc8-d2383e4cfaaf)


![cardMode_image](https://github.com/user-attachments/assets/58388111-32ae-4a1b-8f13-313f4c413846)

![Light_mode_1](https://github.com/user-attachments/assets/d6175b57-f605-4be0-8e78-536c89aaf015)


## Future Enhancements

- **Task Notifications**: Add reminder notifications for upcoming tasks.
- **Due Date Functionality**: Users can set and track due dates for their tasks.
- **Task Editing**: Enable users to edit existing tasks.
- **Task Categories**: Organize tasks into different categories for better management.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



