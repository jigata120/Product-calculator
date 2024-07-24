import { Link, NavLink, Route, Routes } from "react-router-dom";
import Overview from "./ProductCalculatorPAGES/Overview";
import NotFoundPage from "../NotFoundPage";
import Transactions from "./ProductCalculatorPAGES/Transactions";
import Subscriptions from "./ProductCalculatorPAGES/Subscriptions";
import style from "./ProductCalculator.jsx"
import { useContext } from "react";

export default function ProductCalculator(){
    const UserData  = useContext()
    console.log(UserData)
    return(
        <>
            {/* partial:index.partial.html */}
            <div className="earmark-app">
                <header className="header">
                <h1 className="header-logo">earmark.</h1>
                <div className="header-content">
                    <div className="header-search">
                    <input type="text" className="search-field" placeholder="Search..." />
                    <button type="submit" className="search-btn">
                        <i className="ph-magnifying-glass-bold" />
                    </button>
                    </div>
                    <button className="header-avatar">
                    <span className="header-avatar-img" />
                    <span className="header-avatar-name">Ryan Johnson</span>
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
                        <NavLink to="bugdets" 
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
                        <Route path='subscriptions' element={<Subscriptions/>}/>



                    </Routes>
                </div>
                </main>
            </div>
            {/* partial */}
        </>

    )
}