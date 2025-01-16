import DashboardScreen from '../components/Dashboard';

const Dashboard = () => {
    
    return (
        <div className="flex h-screen">
            {/* <div className="w-[290px] ">
            <SideBar/>
            </div> */}

            <div className="flex-grow">
            <DashboardScreen/>
            </div>
        </div>
    )
}

export default Dashboard;