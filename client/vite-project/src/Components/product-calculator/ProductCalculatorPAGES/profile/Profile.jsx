import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../../../../Api";

export default function Profile({
    user
}){
    const { userId } = useParams();

    const [profilData,setProfilData] = useState({}) 
    const navigate = useNavigate();
     
    useEffect(()=>{
      
         
            (async ()=>{
                const data = await getData(`http://localhost:8000/api/users/${userId}/`)
                console.log(data);
                setProfilData(data)
                console.log('GET USER REQUEST');
                console.log(data)
                console.log(profilData)


            })()
        
    },[])

    console.log(profilData?.role);
    return(
        <div className="card-container">
          {profilData.role=='admin'?
          <span className="pro">ADMIN</span>
          :<span style={{backgroundColor:'#03BFCB',zIndex:5}}className="pro">W</span>

          }
        {profilData?.profile_url ? (
            
            <img
            className="round"
            src={profilData?.profile_url}
            alt="Profile photo"
            />
          
        ) : (
        
            <img
            className="round"
            src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
            alt="Profile photo"
            />
          
        )}
        <h3 style={{textAlign:'center'}}>{profilData?.name}</h3>
        <h6>New York</h6>
        <h4>{profilData?.email}</h4>
          
        {/* <p>
          User interface designer and <br /> front-end developer
        </p> */}
        <div className="buttons">
          <button className="primary">Message</button>
          <button className="primary ghost">Following</button>
        </div>
        <div className="skills">
          <h6>Projects</h6>
          <ul>
            <li>cleaning-MV</li>
            <li>TGYM-ProteinBars</li>
             
          </ul>
        </div>
      </div>
      
    )
}