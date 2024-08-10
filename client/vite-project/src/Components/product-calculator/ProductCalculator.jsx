import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Overview from "./ProductCalculatorPAGES/Overview";
import NotFoundPage from "../NotFoundPage";
import Transactions from "./ProductCalculatorPAGES/Transactions";
import Subscriptions from "./ProductCalculatorPAGES/Subscriptions";
import style from "./ProductCalculator.jsx"
import { useContext, useEffect, useState } from "react";
import UserContext from '../../contexts/UserContext';
import Wellcome from "./ProductCalculatorPAGES/Wellcome.jsx";
import Profile from "./ProductCalculatorPAGES/profile/Profile.jsx";
import Accounts from "./ProductCalculatorPAGES/Accounts.jsx";
 
import {   fetchDataWithToken,   logoutUser } from "../../auth.js";
import Projects from "./projects/Projects.jsx";
import ProjectDetails from "./projects/project/Project.jsx";



export default function ProductCalculator(){
    // const UserData  = useContext()
    // console.log(UserData)
    const { user, setUser } = useContext(UserContext);
    console.log(user);
    const navigate = useNavigate(); 

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);   
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(()=>{
        const fetchUserData = async () => {
            console.log(localStorage.getItem('access_token'));
            console.log(localStorage.getItem('refresh_token'));

            try {
              const AccessToken = localStorage.getItem('access');  
              if (AccessToken){
                const data = await fetchDataWithToken();
                setUser(data);              
              }
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
        }
        fetchUserData();
    },[])

    const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
      
    };

    function handleSignOut(){
        logoutUser()
        setLoading(!loading)
        navigate("/authentication")
        
    }
    return(
        <>
            {/* partial:index.partial.html */}

            <div className="earmark-app">
                <header className="header">
                <h1 className="header-logo">ProductCalculator</h1>
                <div className="header-content">
                    <div className="header-search">
                    <input type="text" className="search-field" placeholder="Search..." />
                    <button type="submit" className="search-btn">
                        <i className="ph-magnifying-glass-bold" />
                    </button>
                    </div>
                    <div className="relative">
      

                        {isDropdownOpen && (
                            <div
                            id="dropdownAvatarName"
                            className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                            <Link to={`/user/${user.id}`}>
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div className="font-medium text-center">{user.name}</div>
                                    <div className="truncate">{user.email} </div>
                                </div>
                            </Link>
                            <ul
                                className=" text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownAvatarNameButton"
                            >
                                <li>
                                <a 
                                    onClick={ toggleDropdown}
                                     
                                     
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                                >
                                    Close
                                </a>
                                </li>
                                <li>
                                <a
                                     
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                                >
                                    Settings
                                </a>
                                </li>
                                 
                            </ul>
                            <div onClick={handleSignOut}className="py-1">
                                <a
                                 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                Sign out
                                </a>
                            </div>
                            </div>
                        )}
                        </div>
                   <span className="header-avatar">
                     
                    {user.id? (
                        <>
                            <button
                                id="dropdownAvatarNameButton"
                                onClick={toggleDropdown}
                                className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-purple-600 dark:hover:text-purple-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-dark"
                                type="button"
                            >
                                <span className="sr-only">Open user menu</span>
                                {user?.profileUrl ? (
                            
                                <img
                                className="mx-4 header-avatar-img"
                                src={user?.profileUrl}
                                alt="Profile photo"
                                />
                             
                            ) : (
                            
                                <img
                                className="header-avatar-img"
                                src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                                alt="Profile photo"
                                />
                             
                            )}

                                {user?.name}
                                <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                                >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                                </svg>
                            </button>
                           
                            <Link to={`/user/${user.id}`} className="header-avatar-name">
                            
                            </Link>
                        </>
                        ) : (
                        <Link to="/authentication" className="SigninSignup-btn">Sign Up/Sign In</Link>
                        )}
                   
                   </span>
                </div>
                </header>
                <main className="main">
                <nav className="nav">
                    <ul className="tabs">
                    <li className="tab">
                         <NavLink  to="overview" 
                         className={({ isActive })=> (isActive ? "tab-btn tab-btn--active" : "tab-btn")}
                         >{/*tab-btn--active "tab-btn "*/}
                        <i className="ph-lightbulb-bold" />
                        <span className="tab-btn-title">Overview</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink  to="transactions" 
                        className={({ isActive })=> (isActive ? "tab-btn tab-btn--active" : "tab-btn")}>
                        <i className="ph-arrows-left-right-bold" />
                        <span className="tab-btn-title">Transactions</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="projects" 
                        className={({ isActive })=> (isActive ? "tab-btn tab-btn--active" : "tab-btn")}>
                         <i className="ph-credit-card-bold" />
                        <span className="tab-btn-title">Projects</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="subscriptions" 
                        className={({ isActive })=> (isActive ? "tab-btn tab-btn--active" : "tab-btn")}>
                        <i className="ph-arrows-counter-clockwise-bold" />
                        <span className="tab-btn-title">Subscriptions</span>
                        </NavLink>
                    </li>
                    <li className="tab">
                        <NavLink to="accounts" 
                        className={({ isActive })=> (isActive ? "tab-btn tab-btn--active" : "tab-btn")}>
                        <i className="ph-bank-bold" />
                        <span className="tab-btn-title">Accounts</span>
                        </NavLink>
                    </li>
                    </ul>
                </nav>
                <div className="content">
                    <Routes>
                        <Route path='overview' element={<Overview/>}/>
                        <Route path='*' element={<NotFoundPage/>}/>
                        
                        <Route path='transactions' element={<Transactions/>}/>
                        <Route path='projects' element={<Projects/>}/>
                        <Route path='accounts' element={<Accounts/>}/>
                        <Route path='subscriptions' element={<Subscriptions/>}/>
                        <Route path='' element={<Wellcome name= {user?.name}/>}/>
                        <Route path='user/:userId' element={<Profile user={user}/>}/>
                        <Route path='projects/user/:userId' element={<Profile user={user}/>}/>
                        <Route path='projects/:projectId' element={<ProjectDetails/>}/>
                        


                        
                    </Routes>
                </div>
                </main>
            </div>
            {/* partial */}
        </>

    )
}