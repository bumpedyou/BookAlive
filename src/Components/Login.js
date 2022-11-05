import { GoogleLogin } from 'react-google-login';

function Login(props) {

    const { loginSuccess, loginFailure, clientId } = props
    
    return(
            <GoogleLogin
                clientId={clientId}
                buttonText={"Login"}
                onSuccess={loginSuccess}
                onFailure={loginFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
                prompt="consent"
            />
        
    )
}
export default Login;