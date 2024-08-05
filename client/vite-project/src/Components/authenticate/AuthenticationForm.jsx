
import React, { useEffect, useState,useContext  } from 'react';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { getData, postData } from '../../Api';
import {  loginUser } from '../../auth';

export default function AuthenticationForm({url}) {
     
    
    const [isSignUp, setSignUp] = useState(false)
    const [users,setUsers] = useState({})
    const [usedName,setUsedName] = useState(false)
    const [usedEmail,setUsedEmail] = useState(false)
    const [emailNotFound,setEmailNotFound] = useState(false)
    const [passDontMatch,setPassDontMatch] = useState(false)
    const [passValidation,setPassValidation] = useState({})
    const [emailValidation,setEmailValidation] = useState({})
    const [nameValidation,setNameValidation] = useState({})
    const [fillInfo,setFillInfo] = useState(false)


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
        password: '',
        profile_url:"https://example.com/profile.jpg",
        role:"worker"



    })

    useEffect(()=>{
        
        (async function Resolve (){ 
            const Users = await getData(url)
            console.log(Users)
            setUsers(Users)
        })()
        console.log(users);
        
    },[])

    function validatePassword(password) {
        const minLength = 8;
        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;
        const digitPattern = /[0-9]/;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    
        if (password.length < minLength) {
            return {
                isValid: false,
                message: `Password must be at least ${minLength} characters long.`
            };
        }
        if (!uppercasePattern.test(password)) {
            return {
                isValid: false,
                message: "Password must contain at least one uppercase letter."
            };
        }
        if (!lowercasePattern.test(password)) {
            return {
                isValid: false,
                message: "Password must contain at least one lowercase letter."
            };
        }
        if (!digitPattern.test(password)) {
            return {
                isValid: false,
                message: "Password must contain at least one digit."
            };
        }
        if (!specialCharPattern.test(password)) {
            return {
                isValid: false,
                message: "Password must contain at least one special character."
            };
        }
    
        return {
            isValid: true,
            message: "Password is valid."
        };
    }
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const forbiddenCharactersPattern = /[<>,;{}()\\\[\]`~!#$%^&*|+=?]/;
        const domainPattern = /^[^\s@]+\.[^\s@]+$/;
    
        if (email.length === 0) {
            return {
                isValid: false,
                message: "Email address cannot be empty."
            };
        }
        if (!emailPattern.test(email)) {
            return {
                isValid: false,
                message: "Email address is not in a valid format."
            };
        }
        if (forbiddenCharactersPattern.test(email)) {
            return {
                isValid: false,
                message: "Email address contains forbidden characters."
            };
        }
        const domainPart = email.split('@')[1];
        if (!domainPattern.test(domainPart)) {
            return {
                isValid: false,
                message: "Email domain is not valid."
            };
        }
    
        return {
            isValid: true,
            message: "Email address is valid."
        };
    }
    function validateUsername(username) {
        if (username.length === 0) {
            return {
                isValid: false,
                message: "Username cannot be empty."
            };
        }
        if (username.length <= 2) {
            return {
                isValid: false,
                message: "Username must be more than 2 characters long."
            };
        }
    
        return {
            isValid: true,
            message: "Username is valid."
        };
    }
    function onSignUpInput(e) {
        const newValue = e.target.value.trim()
        const Elname = e.target.name
        if (Elname =="password"){
           const validation = validatePassword(newValue)
           setPassValidation(validation)
        }else if (Elname =="email"){
            const validation = validateEmail(newValue)
            setEmailValidation(validation)
 
        }else if (Elname =="name"){
            const validation = validateUsername(newValue)
            setNameValidation(validation)
        }    
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
        console.log(`III ${!usedName},${!usedEmail},${passValidation.isValid}`);
        let nameStatus = Object.entries(users)
        .filter(user => user[1]['name'].toLowerCase() === signUpData['name'].toLowerCase());
        if (nameStatus.length !== 0){
            console.log(nameStatus);
            setUsedName(usedEmail => true)
        }else{
            setUsedName(usedEmail => false)
        }

        let emailStatus = Object.entries(users)
        .filter(user => user[1]['email'].toLowerCase() === signUpData['email'].toLowerCase());
        console.log(emailStatus);
        if (emailStatus.length !== 0){
            console.log(emailStatus);
            setUsedEmail(usedName => true)
        }else{
            setUsedEmail(usedName => false)
        } 
        console.log(`${!usedName},${!usedEmail},${passValidation.isValid}`);
        if (emailStatus.length == 0 &&
             nameStatus.length == 0 &&
             passValidation.isValid && 
             emailValidation.isValid &&
             nameValidation.isValid){
            console.log(` CREATION${signUpData}`);
            console.log(signUpData);
            (async function RegisterUser(){
                const postRequest = await postData(url,signUpData)
            })()
            navigate('/')
        }else{
            setFillInfo(true)
        }
    }


    
    function onSignInSubmit(e) {
        e.preventDefault()
        
        let emailStatus = Object.entries(users)
        .filter(user => user[1]['email'].toLowerCase() === signInData['email'].toLowerCase());
        console.log(emailStatus);
        (async function auth() {
            try {
                await loginUser(signInData.email, signInData.password);
                console.log("AUTH");
                navigate('/')   
            } catch (error) {
                console.log(error);
            }
        })()
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
                    {!nameValidation.isValid&&<p>{nameValidation.message}</p>}
                   
                    <input type=" " placeholder="Email"
                        name="email"
                        value={signUpData.email}
                        onChange={onSignUpInput}
                    />
                    {usedEmail&&<p>This email is already used!</p>}
                    {!emailValidation.isValid&&<p>{emailValidation.message}</p>}
                   
                    <input type="password" placeholder="Password"
                        name="password"
                        value={signUpData.password}
                        onChange={onSignUpInput}
                    />
                    {!passValidation.isValid&&<p>{passValidation.message}</p>}
                    {fillInfo&&<p>Please fill all fields correctly</p>}
                    
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