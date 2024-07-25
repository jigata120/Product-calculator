import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile({
    user
}){
    const { userId } = useParams();

    const [profilData,setProfilData] = useState({}) 
    const navigate = useNavigate();
     
    useEffect(()=>{
        if (userId==user[0]){
            setProfilData(user[1])
        }else{
            (async ()=>{
                const response = await fetch(`http://localhost:3030/jsonstore/users/${userId}`)
                if (!response.ok) {
                  navigate('/NotFound')
                console.log("navigated")

                  }
                const data = await response.json()
                setProfilData(data)
                console.log('GET USER REQUEST');
                console.log(data)
                console.log(profilData)


            })()
        }
    },[])

    console.log(profilData?.role);
    return(
        <div className="card-container">
          {profilData.role=='admin'?
          <span className="pro">ADMIN</span>
          :<span style={{backgroundColor:'#03BFCB'}}className="pro">W</span>

          }
        <img
          className="round"
          src={profilData?.profileUrl}
          alt="user"
        />
        <h3>{profilData?.name}</h3>
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