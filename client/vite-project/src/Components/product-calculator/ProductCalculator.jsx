import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Overview from "./ProductCalculatorPAGES/Overview";
import NotFoundPage from "../NotFoundPage";
import Transactions from "./ProductCalculatorPAGES/Transactions";
import Subscriptions from "./ProductCalculatorPAGES/Subscriptions";
import style from "./ProductCalculator.jsx"
import { useContext } from "react";
import UserContext from '../../contexts/UserContext';
import Wellcome from "./ProductCalculatorPAGES/Wellcome.jsx";
import Profile from "./ProductCalculatorPAGES/profile/Profile.jsx";
import Accounts from "./ProductCalculatorPAGES/Accounts.jsx";
import Projects from "./ProductCalculatorPAGES/Projects.jsx";



export default function ProductCalculator(){
    // const UserData  = useContext()
    // console.log(UserData)
    const { user, setUser } = useContext(UserContext);
    console.log(user);
    const navigate = useNavigate(); 

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
                    
                    <button className="header-avatar">
                    
                    {user && user.length > 0 ? (
                        <>
                            {user[1]?.profileUrl ? (
                            <Link to={`/user/${user[0]}`}>
                                <img
                                className="header-avatar-img"
                                src={user[1]?.profileUrl}
                                alt="Profile photo"
                                />
                            </Link>
                            ) : (
                            <Link to={`/user/${user[0]}`} className="header-avatar-span">
                                <span className="header-avatar-span"></span>
                            </Link>
                            )}
                            <Link to={`/user/${user[0]}`} className="header-avatar-name">
                            {user[1]?.name}
                            </Link>
                        </>
                        ) : (
                        <Link to="/authentication" className="SigninSignup-btn">Sign Up/Sign In</Link>
                        )}
                   
                   </button>
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
                        <span className="tab-btn-title">Bugdets</span>
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
                        <Route path='' element={<Wellcome name= {user[1]?.name}/>}/>
                        <Route path='user/:userId' element={<Profile user={user}/>}/>
                        



                    </Routes>
                </div>
                </main>
            </div>
            {/* partial */}
        </>

    )
}