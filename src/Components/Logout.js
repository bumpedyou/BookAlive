import { GoogleLogout } from 'react-google-login';

function Logout(props) {
    
    const { logoutSuccess, logoutFailure, clientId } = props

    return(
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={logoutSuccess}
                onLogoutFailure={logoutFailure}
            />
    )
}

export default Logout;