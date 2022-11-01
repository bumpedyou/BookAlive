import { GoogleLogin } from 'react-google-login';

function Login(props) {
    
    const { loginSuccess, loginFailure, clientId, isLoggedIn } = props

    return(
        !isLoggedIn ? (
                <GoogleLogin
                    clientId={clientId}
                    buttonText={"Login"}
                    onSuccess={loginSuccess}
                    onFailure={loginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
        ): null
        
    )
}
export default Login;