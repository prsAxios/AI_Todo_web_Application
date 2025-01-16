import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(!user || Date.now() > user.expiryTime){
        return <Navigate to="/login"/>;
    }
    return children;
}

export default ProtectedRoute;

