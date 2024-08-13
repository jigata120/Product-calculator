import { useContext, useEffect, useState } from "react"
import styles from './projects.module.css';
import { getData } from "../../../Api"
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ProjectDetails from "./project/Project";
import UserContext from "../../../contexts/UserContext";
import CreateProjectModal from "./project/modals/CreateProject";
 

 

export default function Projects() {
    
    const BASEURL = 'http://localhost:8000/api/projects/'
    const { user, setUser } = useContext(UserContext);
    
    const [createModal,closeModalCreate]=useState(false)
	const [table,setTable] = useState([])
    const[refreshProjects,setRefreshProjects] = useState(false)
    useEffect(()=>{
        (async ()=>{
            const data = await getData(BASEURL)
            setTable(table => data)
            
        })() 
        
    },[])
    useEffect(()=>{
        (async ()=>{
            const data = await getData(BASEURL)
            setTable(table => data)
            
        })() 
        
    },[refreshProjects])
    console.log(table);
    const handleMemberClicked = (id)=>{
        const navigate = useNavigate();
        console.log(id);
        navigate(`/user/${id}`)
    } 
    const ProjectsHtml = table.map(
        (project)=>(
        
        <li key={project.id}>
            <span   className={styles.card}>
           {user.id?
          ( <Link to={`/projects/${project.id}`}>
           <img
               src={project?.picture_url}
               className={styles.card__image}
               alt=""
           /></Link>)
           :
           ( <Link to={`/authentication`}>
           <img
               src={project?.picture_url}
               className={styles.card__image}
               alt=""
           /></Link>)
           }     
            
            
            <div className={styles.card__overlay}>
                <div className={styles.card__header}>
                <svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg">
                    <path />
                </svg>
                <Link to={user.id?`user/${project.owner.id}`:''} >
                   
                <img
                    className={styles.card__thumb}
                    src={project.owner.profile_url}
                    alt=""
                />
                </Link>
                <div className={styles.card__header_text}>
                    <h3 className={styles.card__title}>{project.title} by {project.owner.name}</h3>
                    <span className={styles.card__status}>1 hour ago</span>
                </div>
                </div>
                <p className={styles.card__title}>Project members</p>
                <div className={styles.members}>
                { project.members.length>0 ?
                project.members.map((member)=>(
                    
                     
                <Link key={member.id} to={user.id?`user/${member.id}`:''} className={`${styles.member}`}      >
                   <img
                       
                     className={`${styles.card__thumb} `}
                     src={member.profile_url}
                     alt={member.name}
                       />
                </Link>
                    
                   
                
                    
                  
                 
            ))
                :<p>No members</p>  }
                
                
                </div>
            </div>
            </span>
        </li>))
        const  handleCreateModal=()=>{
            closeModalCreate(true)
        }
	return(
        <>
         {user.id&&(<span  
            onClick={handleCreateModal}
            style={{ userSelect: 'none', cursor: 'pointer' }}
            className="px-3 py-1 ml-3 font-semibold rounded-md dark:bg-violet-300 dark:text-gray-50 self-right
            over:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300">
                <span>Create New Project +</span>
        </span>)}
          {createModal && <CreateProjectModal 
          refreshProjects={refreshProjects}
           setRefreshProjects={setRefreshProjects}
          closeModalCreate={closeModalCreate}
          />}
        <ul className={styles.cards}>
            {ProjectsHtml}
             
        </ul>
        
        </>
    )

}