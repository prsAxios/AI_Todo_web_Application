import React, { useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import {Doughnut} from 'react-chartjs-2'
import {Chart as ChartJS , ArcElement,Tooltip,Legend } from 'chart.js';
import { useTheme } from '../ThemeContext';  // Import the useTheme hook


ChartJS.register(ArcElement,Tooltip,Legend);


const SideNav = ({taskArray}) => {

   const { darkMode } = useTheme();  // Access darkMode
  



  const [total,setTotal] = useState(0);

  let taskIncomplete = 0;

  let taskComplete = 0;

  for(let i=0;i<taskArray.length;i++){
    if(taskArray[i].completed == false){
      taskIncomplete++;
    }else{
      taskComplete++;
    }
  }

  useEffect(()=>{
    if(taskArray){
      setTotal(taskArray.length);
    }
  },[taskArray]);

  

  const [isOpen, setIsOpen] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));







    // Sample data for the donut chart
    const data = {
      labels: [taskComplete, taskIncomplete],
      datasets: [
        {
          label: 'Tasks',
          data: [taskComplete,taskIncomplete ], // Data for completed and pending tasks
          backgroundColor: ['#4caf50', '#f44336'], // Green for completed, red for pending
          borderWidth: 0,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          enabled: true,
        },
      },
      cutout: '70%', // This creates the donut effect
    };

    return (
      <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`flex ${isOpen ? 'h-screen' : 'h-16'} fixed left-0 overflow-y-auto`}>
        <div className={`flex-shrink-0 w-64 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-white to-green-300'} shadow-2xl`}>
          {/* {User Info div with Image and Text} */}
          <div className="grid items-center justify-center text-center">
            <img src={'/profilePic.jpg'} className="h-[100px] rounded-full shadow-2xl" />
            <p className="text-xl font-semibold">{`Hey , ${user.username}`}</p>
          </div>

          {/* {Div 1} */}
          <div className={`m-4 rounded-xl shadow-2xl ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <ul className="py-4">
              <li className="p-2 hover:bg-green-200 rounded-sm">All Tasks</li>
              <li className="p-2 hover:bg-green-200 rounded-sm">Today</li>
              <li className="p-2 hover:bg-green-200 rounded-sm">Important</li>
              <li className="p-2 hover:bg-green-200 rounded-sm">Planned</li>
              <li className="p-2 hover:bg-green-200 rounded-sm">Assigned to me</li>
            </ul>
          </div>

        

          {/* {div 3} */}
          <div className={`m-4 grid-cols-1 rounded-xl shadow-2xl ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="grid-cols-1 p-8">
              <div className="flex items-center justify-between">
                <p>Total Tasks</p>
                <Plus className="text-xl mr-3" />
              </div>
              <p className="text-3xl">{total}</p>
            </div>
            <hr className="bg-gray-200 h-[2px]" />
            {/* {pie chart Div} */}
            <div className="flex justify-center items-center py-6">
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default SideNav;
