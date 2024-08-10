import { useContext, useEffect, useState } from "react";
import { getData, postData, putData } from "../../../../Api";
import { useParams } from "react-router-dom";
import AddField from "./modals/AddFiels";
import UserContext from "../../../../contexts/UserContext";  
import EditField from "./modals/EditFields";
import DeleteField from "./modals/DeleteFields";
import SettingsField from "./modals/EditProject";
export default function ProjectDetails(){
   
    const { projectId } = useParams();
    const { user, setUser } = useContext(UserContext);
    const BASEURL = 'http://localhost:8000/api/projects/'
    const [project,setProjectData] = useState({})
    const [modalAddActive,setModalAddActive] = useState(false)
    const [modalDeleteActive, setModalDeleteActive] = useState(false);
    const [modalSettingsActive, setModalSettingsActive] = useState(false);

	// console.log(Object.entries(productsEntries));
	// console.log(Object.entries(values));
    useEffect(()=>{
        (async ()=>{
            const data = await getData(`${BASEURL}${projectId}/`)
            setProjectData(project => data)
            
        })()
     

    },[])
    // useEffect(() => {
    //     console.log('Project data updated:', project);
    // }, [project]);
    

     
    console.log(JSON.stringify(project));
    console.log(project);
     
    

    const title = project.title || '';
    const projectOwnerId = project.owner || '';
    const membersIdsList = project.members || [];
    const finalProduct = project.final_product || '';
    const picture = project.picture_url || '';

    const values = project.table?.Values || {};
    const products = project.table?.Products || {};
    const productsEntries = Object.entries(products);
    const [modalEditActive, setModalEditActive] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
     

    const htmlTableValues = Object.entries(values).map(([key, val]) => (
		<th key={`${key}-${val}`} className="p-3 text-center">{key}/{val}</th>
	  ));
	const htmlTableProducts = productsEntries
	.map(([key,val])=>(
		
	<tr key={key} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
				<td className="p-3 border-r border-opacity-20 dark:border-gray-500 dark:bg-gray-50">
					<p>{key} </p>
				</td>
				{Object.entries(products[key]).map(([key2,val2])=>(
				<td  key={`${key2}/${val2}`} className="p-3 text-center">
					<p>{val2}</p>
				</td>
				))}
				<td className="p-3 text-right">
					<span style={{ userSelect: 'none', cursor: 'pointer' }}className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
						<span>Pending</span>
					</span>
				</td>
			</tr>
	))    
    const CalculatedValues ={}
    let lastProductValues = {}
    function calculateTheValues(){
        for (const product of productsEntries) {
            let productObj = product[1]
             Object.keys(productObj).map((key)=>{
                if(CalculatedValues[key]){
                    CalculatedValues[key]+=productObj[key]
                }else{
                    CalculatedValues[key]=productObj[key]
                }
            })
            lastProductValues=productObj
    
            
            console.log(productObj);
           
        }
        const keys = Object.keys(CalculatedValues);
        const Pkeys = Object.keys(lastProductValues);
        if (keys.length >Pkeys.length) {
            const lastKey = keys[keys.length - 1];
            delete CalculatedValues[lastKey];
        }
    }
    calculateTheValues()
     
    const CalculatedHtml = Object.keys(CalculatedValues)
        .map((key)=>(
            <td  key={`${key}//`} className="p-3 text-center border-t border-opacity-20 dark:border-gray-500 dark:bg-gray-50">
					<p>{CalculatedValues[key]}</p>
				</td>
        )) 
    



    const testData = {"Example p": {
        'Calcium': 101,
         'Magnecium': 123,
          'Celen': 200,
           'Vitamin-B6': 761,
            'Vitamin-B12': 0
        }
    
    }


    
    function editData(valuesEditData={},projectsEditData={}){
        if (Object.keys(valuesEditData).length > 0){
            for (const key of Object.keys(valuesEditData)) {
                if (values[key]){
                    values[key] = valuesEditData[key]
                }else{
                    console.log('no value to edit');
                }
            } 
            
        }
        if(Object.keys(projectsEditData).length > 0){
            for (const key of Object.keys(projectsEditData)) {
                if (products[key]){
                    products[key] = projectsEditData[key] 
                }else{
                   console.log('no product to edit');
                }
            } 
            

        }
        localProjectData()   
        }
     
         
    console.log(values);
    console.log(products);
   
    const edit = ()=>{
         setModalEditActive(true)
    }

    const add = ()=>{
        setModalAddActive(true)
          }

    const del = ()=>{
        setModalDeleteActive(true);}    
    
    const settings = ()=>{
        setModalSettingsActive(true);}   

    
function localProjectData(){
    const localProject ={
        ...project,
        table:{
            Values:values,
            Products:products
            }

    }
    setProjectData(localProject)
} 
const handleRemoteSave =async ()=>{
    const success = await putData(`${BASEURL}${projectId}/`,project)
    
}
    return(
        <>
            {modalAddActive && <AddField project={project}
             setProjectData={setProjectData} 
             setModalAddActive={setModalAddActive} />}
            {modalEditActive && (
                <EditField
                    project={project}
                    setProjectData={setProjectData}
                    setModalEditActive={setModalEditActive}
                    selectedProduct={selectedProduct}
                />
            )}
            {modalDeleteActive && (
                <DeleteField
                    project={project}
                    setProjectData={setProjectData}
                    setModalDeleteActive={setModalDeleteActive}
                />
            )}
             {modalSettingsActive && (
                <SettingsField
                    project={project}
                    setProjectData={setProjectData}
                    setModalSettingsActive={setModalSettingsActive}
                />
            )}
             
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800" bis_skin_checked="1">
                <div className="row">
               {user.id==projectOwnerId ||true && <div className="controls">
                     <i className="ph ph-plus-square" onClick={add}></i>{/*openModal('add') */}
                      
                    <i className="ph ph-pencil" onClick={edit}></i>
                    <i className="ph ph-trash" onClick={del}></i>
                    <i className="ph ph-sliders-horizontal" onClick={settings}></i>
                </div>}
                <div className="flex  w-full justify-between items-center mb-4">
                    <h2 className="project-title text-2xl font-semibold leading-tight">{title}</h2>
                    <span 
                    onClick={handleRemoteSave}
                    style={{ userSelect: 'none', cursor: 'pointer' }}
                    className="px-3 py-1 font-semibold rounded-md dark:bg-violet-200 dark:text-gray-20 self-right
                    over:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300">
                        <span>Remote Save</span>
                    </span>
                </div>
                
                </div>
             
                <div className="overflow-x-auto" bis_skin_checked="1">
                    <table className="min-w-full text-xs">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col className="w-24" />
                        </colgroup>
                        <thead className="dark:bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3 border-r border-opacity-20 dark:border-gray-500 ">
                                    Products</th>
                                    {htmlTableValues }
                                    <th className="p-3 text-center">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            
                            {htmlTableProducts}
                            <tr   className="border border-opacity-60 dark:border-gray-900 dark:bg-gray-50">
                                <td className="p-3 border-t border-opacity-20 dark:border-gray-500 dark:bg-gray-50">
                                    <p className="text-left">{finalProduct} </p>
                                </td>
                                 {CalculatedHtml}
                                <td className="p-3 text-right border-t border-opacity-20 dark:border-gray-500 dark:bg-gray-50">
                                    <span style={{ userSelect: 'none', cursor: 'pointer' }}className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50 ">
                                        <span>Pending</span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
            
        </>
                
            

    )
}