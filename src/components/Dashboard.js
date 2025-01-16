import React, { useState, useEffect } from 'react';
import { ArrowDown, Bell, Calendar, Download, Grid, Repeat } from 'react-feather';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaSpinner } from 'react-icons/fa';
import SideNav from './SideBar';
import { useTheme } from '../ThemeContext';  // the useTheme hook


const DashBoardScreen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [viewMode, setViewMode] = useState('list');
    const [selectedTask, setSelectedTask] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [reminder, setReminder] = useState(false);
    const [userPrompt, setUserPrompt] = useState('');
    const [AIresponse, setAIresponse] = useState('');
    const [processing, setIsProcessing] = useState(false);
    const [OpenDesc, setOpenDesc] = useState(false);
    const [description, setDescription] = useState('');


    const { darkMode } = useTheme();  // Access darkMode


    const geminiApiKey = 'AIzaSyD_VeBHTGa0k61Bfwt0CE9da4yRTVypG18';

    const handleScroll = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    }





    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    })



    // {Handling user prompt here}
    const handlePromptUpload = async () => {

        setIsProcessing(true);

        try {
            const genAI = new GoogleGenerativeAI(geminiApiKey);

            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

            const prompt = `
    You are an expert in creating structured and actionable daily task lists. Generate an array of 10 tasks for a productive day. Each task should include the following details:

    - **id**: A unique identifier (integer starting from 1).
    - **text**: The task name or title (concise and clear).
    - **description**: A short description of the task (1-2 sentences).
    - **time**: The time slot for the task (e.g., "6:00 AM - 6:30 AM").
    - **completed**: A default boolean value set to false.
    - **priority**: A priority level (High, Medium, or Low) based on the importance of the task.
    - **dueDate**: The due date for the task in the format "YYYY-MM-DD HH:mm" (e.g., "2025-01-16 08:00").

    Ensure the tasks cover a balance of work, relaxation, and self-care activities. Return the result as a JSON array ready for use in a JavaScript application.
`;




            const results = await model.generateContent([prompt, userPrompt]);

            const response = await results.response;


            // Cleaning the response to remove Markdown formatting

            let rawText = response.text();
            rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

            const ResponseTask = JSON.parse(rawText);

            setTasks((prevTasks) => [...prevTasks, ...ResponseTask]);

            console.log(ResponseTask);

            // setAIresponse(ResponseTask);

        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setIsProcessing(false);
        }

    };


    //loading task from the localstorage on computer

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
        console.log(`This are the Tasks : ${tasks}`);
    }, []);

    //saving task to localstorage 
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, []);


    const handleAddTask = () => {
        if (taskText.trim()) {
            const newTask = {
                text: taskText,
                priority: priority,
                id: Date.now(),
                completed: false,
                dueDate: dueDate || null,
                description : description,
            };
            setTasks([...tasks, newTask]);
            setTaskText('');
            setIsOpen(false);
            setDueDate(null);
        }

    }

    const handleDescription = () => {
        setOpenDesc(!OpenDesc);
    }


    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setSelectedTask(null);
    }

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task =>
            task.id == taskId ? { ...task, completed: !task.completed } : task
        ));
    }

    //priority sorting of tasks
    const sortedTasks = tasks.sort((a, b) => {
        const priorityLevels = { High: 3, Medium: 2, low: 1 };
        return priorityLevels[b.priority] - priorityLevels[a.priority];
    })

    const handleTaskClick = (task, e) => {
        setSelectedTask(task);
    };


    // {function for making reminder}
    const handleReminder = (taskId) => {
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
            alert(`Reminder set for task : "${task.text}"`);
            setTimeout(() => {
                alert(`Reminder for task:"${task.text}"`);
            }, 10000);
        }
    }




    // {function for repeating the task}
    const handleRepeatTask = (taskId) => {
        const taskToRepeat = tasks.find((t) => t.id === taskId);
        if (taskToRepeat) {
            const newTask = {
                ...taskToRepeat,
                id: Date.now(),
                completed: false,
                dueDate: dueDate || null,
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            alert(`Task "${taskToRepeat.text}" repeated.`);
        }

    }







    return (



    <div className='min-h-screen bg-gray-50 dark:bg-black flex'>
    {/* Sidebar (Sticky) */}
    <div className="w-64 bg-green-200 dark:bg-green-700 sticky top-0 h-screen">
        <SideNav taskArray={tasks} />
    </div>

    <div className='flex-1 p-5 space-y-5'>
        {/* Header section */}
        <div className='flex items-center text-lg font-semibold'>
            <p className='mr-3 text-black dark:text-white'>To Do</p>
            <ArrowDown />
        </div>

        <hr className='h-[2px] bg-gray-300 dark:bg-gray-600' />

        {/* Add task div */}
        <div className='grid bg-gradient-to-tr from-green-100 to-green-200 dark:from-green-100 dark:via-green-300 dark:to-green-800'>

            <div className='w-full text-white'>
                <input
                    type='text'
                    className='border p-2 w-full mb-4   dark:bg-gray-700 dark:text-white dark:border-gray-600'
                    placeholder='Add a Task'
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                />

                <div className="flex items-center justify-center mt-6 space-x-4">
                    <input
                        type="text"
                        className="border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 w-2/5 rounded-lg shadow-sm text-gray-700 placeholder-gray-400 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 transition duration-200"
                        placeholder="Ask AI to plan today's day"
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                    />
                    <button
                        onClick={handlePromptUpload}
                        className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Generate
                        {processing && (
                            <FaSpinner className="ml-2 animate-spin w-5 h-5 text-white" />
                        )}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 px-4 py-3 bg-gray-100 dark:bg-gray-700 dark:text-white shadow-md ">
                {/* Priority Dropdown */}
                <ul className="flex items-center space-x-2">
                    <li>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                            Set Priority:
                        </label>
                        <select
                            className="border border-gray-300 p-2 rounded-md text-sm text-gray-700 dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </li>
                </ul>

                <button
                    onClick={() => handleDescription()}
                    className="bg-green-500 text-white font-medium px-5 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                    ADD DESCRIPTION
                </button>

                {/* Date Picker */}
                <Datetime
    value={dueDate}
    onChange={setDueDate}
    dateFormat="YYYY-MM-DD"
    timeFormat="HH:mm"
    inputProps={{ placeholder: 'Select Due Date & Time' }}
    className="p-2 border border-gray-300 dark:border-gray-600 rounded text-white"
    wrapperClassName="datetime-picker"
/>

                {/* View Mode Toggle */}
                <button
                    onClick={() => setViewMode(viewMode === "list" ? "card" : "list")}
                    className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-white hover:bg-blue-500 transition duration-200"
                >
                    <Grid />
                </button>

                {/* Add Task Button */}
                <button
                    onClick={handleAddTask}
                    className="bg-green-500 text-white font-medium px-5 py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                    ADD TASK
                </button>
            </div>
        </div>

        {/* Tasks Section */}
        <div className={viewMode === 'list' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
            {sortedTasks.filter(task => !task.completed).map(task => (
                <div
                    key={task.id}
                    className={viewMode === 'list'
                        ? 'bg-white p-4 rounded-lg shadow-md dark:bg-gray-700 dark:text-white'
                        : 'bg-white p-5 rounded-lg shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden dark:bg-gray-700 dark:text-white'}
                    onClick={(e) => handleTaskClick(task, e)}
                >
                    {/* Task Contents */}
                    <div className="flex flex-col justify-between h-full">
                        {/* Top Section - Task Name and Priority */}
                        <div className="flex justify-between items-center">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                                className="form-checkbox h-5 w-5 text-green-500 dark:text-green-400"
                            />
                            <p className="text-lg font-semibold">{task.text}</p>
                            <p className="text-sm text-black dark:text-white">
                                <span className={`text-${task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'green'}-600`}>
                                    {task.priority}
                                </span>
                            </p>
                        </div>

                        {/* Middle Section - Task Description and Due Date */}
                        <div className="flex flex-col mt-2">
                            <p className="text-sm text-gray-700 dark:text-gray-300">{task.description}</p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Due Date: {task.dueDate ? moment(task.dueDate).format('YYYY-MM-DD HH:mm') : 'No Due Date'}
                            </p>
                        </div>

                        {/* Bottom Section - Delete Button */}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTask(task.id);
                                }}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Completed tasks section */}
        <div className='bg-gray-100 dark:bg-gray-700 p-5 rounded-xl'>
            <h2 className='text-xl font-semibold text-black dark:text-white'>Completed Tasks</h2>
            {sortedTasks.filter(task => task.completed).map(task => (
                <div key={task.id} className='bg-white p-5 rounded-lg shadow-xl mt-2 dark:bg-gray-700 dark:text-white'>
                    {/* Task content */}
                    <div className='flex items-center justify-between'>
                        <input
                            type='checkbox'
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className='form-checkbox h-5 w-5 text-green-500 dark:text-green-400'
                        />
                        <p className='mt-3 text-lg'>{task.text}</p>
                        <p className='mt-1 text-sm text-gray-600'>
                            Priority:
                            <span className={`text-${task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'green'}-600`}>
                                {task.priority}
                            </span>
                        </p>

                        <button
                            onClick={() => handleDeleteTask(task.id)}
                            className='bg-red-500 text-white p-1 rounded-full hover-bg-red-600'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Sidebar for Task Details */}
        {selectedTask && (
           
 <div className='w-1/4 bg-gradient-to-b from-green-100 to-green-400 dark:from-green-700 dark:to-green-900 shadow-4xl p-5 fixed right-0 -top-5 h-full'>
    <h2 className='text-lg font-semibold text-white mb-4 mt-12'>Task Details</h2>

    <p className='mb-4 text-2xl font-bold text-white'>{selectedTask.text}</p>

    <hr className='border-1 border-white rounded-xl mb-2' />

    <label className='text-lg font-semibold text-white'>Time</label>
    <p className='mb-5 text-white'>{selectedTask.time}</p>

    <hr className='border-1 border-white rounded-xl mb-2' />

    <label className='text-lg font-semibold text-white'>Description</label>
    <p className='mb-5 text-white'>{selectedTask.description}</p>

    <hr className='border-1 border-white rounded-xl mb-2' />

    {/* Set Reminder */}
    <div className='mb-4'>
        <label className='block text-sm font-semibold text-white'>Set Reminder</label>
        <input
            type='checkbox'
            checked={reminder}
            onChange={() => handleReminder(selectedTask.id)}
            className='form-checkbox h-5 w-5 text-green-500 dark:text-green-400'
        />
    </div>

    <hr className='border-1 border-white rounded-xl mb-2' />

    {/* Due Date */}
    <div className='mb-4'>
        <label className='block text-sm font-semibold text-white'>Add Due Date</label>
        <Datetime
            value={dueDate}
            onChange={setDueDate}
            dateFormat="YYYY-MM-DD"
            timeFormat="HH:mm"
            inputProps={{ placeholder: 'Select Due Date & Time' }}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded"
        />
    </div>

    <hr className='border-1 border-white rounded-xl mb-2' />

    {/* Repeat Button */}
    <div className='mb-4'>
        <label className='block text-sm font-semibold text-white'>
            <button onClick={() => handleRepeatTask(selectedTask.id)} className='border-4 border-white rounded-xl p-5 text-white'>
                Repeat
            </button>
        </label>
    </div>

    <hr className='border-1 border-white rounded-xl mb-2' />

    {/* Add Notes */}
    <div className='mb-4'>
        <textarea placeholder='Add Notes' className='w-full p-4 border-green-500 rounded-md focus:outline-none focus:ring-blue-500 text-white bg-gray-800' rows={4}></textarea>
    </div>

    {/* Action Buttons */}
    <div className='absolute bottom-4 left-0 right-0 p-4 flex justify-between items-center'>
        <button onClick={() => handleDeleteTask(selectedTask.id)} className='bg-red-500 text-white px-4 py-2 rounded-md'>
            Delete
        </button>
        <button onClick={() => setSelectedTask(null)} className='bg-gray-500 text-white px-4 py-2 rounded-md'>
            Close Sidebar
        </button>
    </div>
</div>

        )}

{OpenDesc && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        {/* Dialog Box */}
        <div className="p-8 rounded-lg shadow-lg bg-gray-800 border border-gray-700 w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Add Description</h2>
            <button onClick={handleDescription} className="text-red-500 hover:text-red-700">
              Close
            </button>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Elaborate the task"
            className="w-full p-4 border border-gray-700 rounded-md mb-4"
            rows={4}
          />
          <button
            onClick={handleDescription}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    )}

        
    </div>
</div>





    )






}

export default DashBoardScreen;