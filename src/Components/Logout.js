import { GoogleLogout } from 'react-google-login';

function Logout(props) {
    
    const { logoutSuccess, logoutFailure, clientId, isLoggedIn } = props

    return(
        isLoggedIn?(
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={logoutSuccess}
                onLogoutFailure={logoutFailure}
            />
        ) : null
            
    )
}

export default Logout;