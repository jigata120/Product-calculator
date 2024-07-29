
import React, { useEffect, useState,useContext  } from 'react';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function AuthenticationForm({url}) {
    const [isSignUp, setSignUp] = useState(false)
    const [users,setUsers] = useState({})
    const [usedName,setUsedName] = useState(false)
    const [usedEmail,setUsedEmail] = useState(false)
    const [emailNotFound,setEmailNotFound] = useState(false)
    const [passDontMatch,setPassDontMatch] = useState(false)
    const [render,setRender] = useState(false)
    const {user , setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [signInData, setsignInData] = useState({
        email: '',
        password: ''
    })
    const [signUpData, setsignUpData] = useState({
        name: '',
        email: '',
        password: ''

    })

    useEffect(()=>{
        async function getUsers(){
            const response = await fetch(`${url}/users`);
            const data = await response.json()
            console.log(data)
            return data
        }
        (async function Resolve (){ 
            const Users = await getUsers()
            console.log(Users)
            setUsers(Users)
        })()
    },[])


    function onSignUpInput(e) {
        const newValue = e.target.value.trim()
        const Elname = e.target.name
        setsignUpData(
            oldData => ({
                ...oldData,
                [Elname]: newValue
            })
        );

    }
    function onSignInInput(e) {
        const newValue = e.target.value.trim()
        const Elname = e.target.name
        setsignInData(
            oldData => ({
                ...oldData,
                [Elname]: newValue
            })
        );

    }

    console.log(signInData)
    console.log(signUpData)


    function onSignUpSubmit(e) {
        e.preventDefault()
        let nameStatus = Object.entries(users)
        .filter(user => user[1]['name'].toLowerCase() === signUpData['name'].toLowerCase());
        if (nameStatus.length !== 0){
            console.log(nameStatus);
            setUsedName(true)
        }else{
            setUsedName(false)
        }

        let emailStatus = Object.entries(users)
        .filter(user => user[1]['email'].toLowerCase() === signUpData['email'].toLowerCase());
        if (emailStatus.length !== 0){
            console.log(emailStatus);
            setUsedEmail(true)
        }else{
            setUsedEmail(false)
        }    
    }


    
    function onSignInSubmit(e) {
        e.preventDefault()
        
        let emailStatus = Object.entries(users)
        .filter(user => user[1]['email'].toLowerCase() === signInData['email'].toLowerCase());
        if (emailStatus.length == 0){
            setEmailNotFound(true)
            signInData['password']=''
            setRender(!render)
            console.log(emailStatus)
        }else{
            setEmailNotFound(false)
            if (emailStatus[0][1]["password"]!==signInData['password']){
                setPassDontMatch(true)
                console.log("DONT MATCH");

                signInData['password']=''
                setRender(!render)
            }else{
                setPassDontMatch(false)
                console.log("LOGGED");
                setUser(emailStatus[0]);
                console.log(user)
                navigate('/')
            }
               
        }

    }
    return (

        <div className={isSignUp ?
            'container scope right-panel-active' :
            'container scope'} id="container">
            <div className="form-container  sign-up-container">
                <form onSubmit={onSignUpSubmit}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    {/* <span>or use your email for registration</span> */}
                    
                    <input type="text" placeholder="Name"
                        name="name"
                        value={signUpData.name}
                        onChange={onSignUpInput}
                    />
                    {usedName&&<p>This name is not available!</p>}
                    <input type=" " placeholder="Email"
                        name="email"
                        value={signUpData.email}
                        onChange={onSignUpInput}
                    />
                    {usedEmail&&<p>This email is already used!</p>}
                    <input type="password" placeholder="Password"
                        name="password"
                        value={signUpData.password}
                        onChange={onSignUpInput}
                    />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={onSignInSubmit}>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input type=" " placeholder="Email"
                        name="email"
                        value={signInData.email}
                        onChange={onSignInInput}
                    />
                    {emailNotFound&&<p>This email is not registerd</p>}

                    <input type="password" placeholder="Password"
                        name="password"
                        value={signInData.password}
                        onChange={onSignInInput}
                    />
                    {passDontMatch&&<p>The password is incorrect!</p>}

                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn"
                            onClick={() => setSignUp(false)}
                        >Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp"
                            onClick={() => setSignUp(true)}
                        >Sign Up</button>
                    </div>
                </div>
            </div>
        </div>

    )
}