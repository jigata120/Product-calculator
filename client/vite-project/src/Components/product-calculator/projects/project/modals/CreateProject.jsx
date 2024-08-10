import React, { useContext, useState } from 'react';
import styles from './crudFormsStyle.module.css';
import UserContext from '../../../../../contexts/UserContext';
import { postData } from '../../../../../Api';
import { useNavigate } from 'react-router-dom';

export default function CreateProjectModal({refreshProjects,setRefreshProjects, closeModalCreate }) {
    const BASEURL = 'http://localhost:8000/api/projects/'
    
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [finalProduct, setFinalProduct] = useState('');
    const [picture, setPicture] = useState('');
    const [newProject, setNewProjectData] = useState({});
    const { user, setUser } = useContext(UserContext);
    const [members, setMembers] = useState([]);  
    const [owner] = useState({
        id: "a5475db8-cb87-4d5c-882c-93c5382fdd5f",
        name: "PolYa",
        profile_url: "https://www.shutterstock.com/image-photo/portrait-beautiful-young-woman-over-260nw-419163175.jpg"
    });  
    const isValidUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            return /^https?:\/\/.+\..+$/.test(parsedUrl.href);
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = async() => {
        if (!title || !finalProduct || !picture) {
            alert("Please fill in all fields.");
            return;
        }
        console.log(isValidUrl(picture));
        if (!isValidUrl(picture)) {
            alert("Please enter a valid URL for the picture.");
            return;
        }

        const newProject = {
            title,
            final_product: finalProduct,
            picture_url: picture,
            owner: owner,  
            members: [...members],  
            table: {
                Values: {
                    'Default Value': 'unit',
                    'Default Value2': 'unit2'
                },
                Products: {
                    'Default Product': {
                        'Default Value': 0,
                        'Default Value2':0
                    }
                }
            }
        };

 
        const success = await postData(BASEURL,newProject)
        setRefreshProjects(!refreshProjects)

        console.log(JSON.stringify(newProject));
        console.log(newProject);
        setNewProjectData(newProject);
        closeModalCreate(false);
    };

    const handleClose = () => {
        closeModalCreate(false);
    };

    return (
        <div className={styles.box}>
            <div className={styles.boxForm}>
                <div className={styles.boxLoginTitle}>
                    <div className={`${styles.icon} ${styles.iconLogin}`} />
                    <h2 className={styles.h2}>Create New Project</h2>
                </div>
                <div className={styles.boxLogin}>
                    <div className={styles.fieldsetBody}>
                        <p className={styles.field}>
                            <label htmlFor="title">Project Title</label>
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
                                type="url"
                                id="picture"
                                name="picture"
                                placeholder="Picture URL"
                                value={picture}
                                onChange={(e) => setPicture(e.target.value)}
                            />
                        </p>

                        <div className={styles.row}>
                            <input
                                type="button"
                                className={styles.box__submit}
                                value="Create Project"
                                onClick={handleSubmit}
                            />
                            <input
                                type="button"
                                className={styles.box__submit__close}
                                value="Cancel"
                                onClick={handleClose}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
