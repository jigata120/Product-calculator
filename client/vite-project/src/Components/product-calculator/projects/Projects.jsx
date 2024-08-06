import { useEffect, useState } from "react"
import styles from './projects.module.css';
import { getData } from "../../../Api"
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ProjectDetails from "./project/Project";

 

 

export default function Projects() {
    
    const BASEURL = 'http://localhost:8000/api/projects/'
    

	const [table,setTable] = useState([])
    useEffect(()=>{
        (async ()=>{
            const data = await getData(BASEURL)
            setTable(table => data)
            
        })()
        
    },[])
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
            <Link to={`/projects/${project.id}`}>
            <img
                src={project?.picture_url}
                className={styles.card__image}
                alt=""
            />
            </Link>
            <div className={styles.card__overlay}>
                <div className={styles.card__header}>
                <svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg">
                    <path />
                </svg>
                <Link to={`user/${project.owner.id}`} >
                   
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
                   
                    <Link key={member.id} to={`user/${member.id}`} className={`${styles.member}`}      >
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
	return(
        <>
          
        <ul className={styles.cards}>
            {ProjectsHtml}
             
        </ul>
        
        </>
    )

}