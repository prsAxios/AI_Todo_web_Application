import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const UserProfile = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center transform scale-95 animate-scaleUp w-80 sm:w-96 transition-all duration-300 hover:shadow-2xl">
                {/* Profile Image */}
                <div className="relative mb-6">
                    <img 
                        src={'/profilePic.jpg'} 
                        alt="Profile" 
                        className="w-28 h-28 rounded-full mx-auto border-4 border-blue-400 transform transition-transform hover:scale-110" 
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                </div>
                {/* Name and Details */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.username}</h2>
                <p className="text-gray-600 font-medium text-sm">{user.email}</p>
                {/* Description */}
                <p className="text-gray-700 mt-4 text-sm">
                    Passionate developer and tech enthusiast. Loves building innovative and user-friendly solutions.
                </p>
               
                <div className="flex space-x-6 justify-center items-center">
 
    <a href="https://www.linkedin.com/in/pradeepSuthar48/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} className="text-blue-600 text-4xl hover:text-blue-700 transition duration-300" />
    </a>

   
    <a href="hhttps://github.com/prsAxios" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} className="text-gray-800 text-4xl hover:text-gray-900 transition duration-300" />
    </a>
</div>





                

            </div>
        </div>
    );
};

export default UserProfile;
