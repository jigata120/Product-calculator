import { useState } from "react";
import styles from './crudFormsStyle.module.css';
import { useNavigate } from "react-router-dom";
import { deleteData } from "../../../../../Api";


export default function SettingsField({ project, setProjectData, setModalSettingsActive }) {
    const [title, setTitle] = useState(project.title || '');
    const [finalProduct, setFinalProduct] = useState(project.final_product || '');
    const [picture, setPicture] = useState(project.picture_url || '');
    const [newOwner, setNewOwner] = useState({});
    const [members, setMembers] = useState(project.members || []);
    const projectOwner = project.owner || '';
    const projectId = project.id ||''
    const [confirmText, setConfirmText] = useState('');
    const navigate = useNavigate();
    const BASEURL = 'http://localhost:8000/api/projects/'


    const handleDelete = async() => {
        if (confirmText === 'DELETE') {
            if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
                
                console.log("Project deleted:", projectId);
                console.log(`${BASEURL}${projectId}/`);
                const success = await deleteData(`${BASEURL}${projectId}/`)
                
                    navigate('/projects/');
                 
                 
            }
        } else {
            alert("Please type 'DELETE' to confirm.");
        }
    };

    const handleOwnerChange = (e) => {
        const memberId = e.target.value;
        if (memberId !== projectOwner && window.confirm("Are you sure you want to change the project owner?")) {
            e.target.checked =true
            console.log('new');
            const member = members.filter(member => member.id === memberId);
            setNewOwner(member[0]);
            console.log(member[0]);

        } else {
            e.target.checked = false; 
        }
    };
    const handleSubmit = () => {
        let updatedMembers = [...members];
    
        
        if (newOwner && newOwner.id !== projectOwner.id) {
             const isCurrentOwnerInMembers = updatedMembers.some(member => member.id === projectOwner.id);
            if (!isCurrentOwnerInMembers) {
                updatedMembers.push(projectOwner);
            }
            updatedMembers = updatedMembers.filter(member => member.id !== newOwner.id);
        }
    
        const updatedProject = {
            ...project,
            title,
            final_product: finalProduct,
            picture_url: picture,
            owner: newOwner || projectOwner,  
            members: updatedMembers,  
        };
        console.log(updatedProject);
        setProjectData(updatedProject);
        setModalSettingsActive(false);  
    };
    const closeModal = () => setModalSettingsActive(false);

    const memberCheckboxes = members.map(member => (
        <div  key={`${member.id}-p`} className={styles.row} >
            <input
                className={styles.inputbox}
                type="checkbox"
                value={member.id}
                checked={newOwner === member}
                onChange={handleOwnerChange}
            />
            <label className={styles.labelCheckbox}>
                {member.name}
            </label>
        </div>
    ));
    console.log(project.members);


    return (
        <div className={styles.box}>
            <div className={styles.boxForm}>
                <div className={styles.boxLoginTitle}>
                    <div className={`${styles.icon} ${styles.iconLogin}`} />
                    <h2 className={styles.h2}>Project Settings</h2>
                </div>
                <div className={styles.boxLogin}>
                    <div className={styles.fieldsetBody}>
                        <h2 className={styles.h2}>Edit Project Details</h2>
                        <p className={styles.field}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Project Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </p>
                        <p className={styles.field}>
                            <label htmlFor="finalProduct">Final Product</label>
                            <input
                                type="text"
                                id="finalProduct"
                                name="finalProduct"
                                placeholder="Final Product"
                                value={finalProduct}
                                onChange={(e) => setFinalProduct(e.target.value)}
                            />
                        </p>
                        <p className={styles.field}>
                            <label htmlFor="picture">Picture URL</label>
                            <input
                                type="text"
                                id="picture"
                                name="picture"
                                placeholder="Picture URL"
                                value={picture}
                                onChange={(e) => setPicture(e.target.value)}
                            />
                        </p>
                        <h2 className={styles.h2}>Change Project Owner</h2>
                        <div className={styles.row} >

                                {members.length>0?memberCheckboxes:
                                <p >No members yet</p>}

                        </div>
                        <div className={styles.boxLoginTitle}>
                        </div>
                        <div className={styles.fieldsetBody}>
                        <p className={styles.field}>
                            <label htmlFor="confirmText">Type 'DELETE' to confirm</label>
                            <input
                                type="text"
                                id="confirmText"
                                name="confirmText"
                                placeholder="DELETE"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                className={styles.inputbox}
                            />
                        </p>
                        <div className={styles.row}>
                            <input
                                type="button"
                                className={styles.box__submit}
                                value="Delete Project"
                                onClick={handleDelete}
                            />
                             
                        </div>
                    </div>
                        <div className={styles.row}>
                            <input
                                type="button"
                                className={styles.box__submit}
                                value="Save Changes"
                                onClick={handleSubmit}
                            />
                            <input
                                type="button"
                                className={styles.box__submit__close}
                                value="Close"
                                onClick={closeModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}