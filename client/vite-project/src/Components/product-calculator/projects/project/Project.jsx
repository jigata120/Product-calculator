import { useContext, useEffect, useState } from "react";
import { getData } from "../../../../Api";
import { useParams } from "react-router-dom";
import AddField from "./modals/AddFiels";
import UserContext from "../../../../contexts/UserContext";  
export default function ProjectDetails(){
   
    const { projectId } = useParams();
    const { user, setUser } = useContext(UserContext);
    const BASEURL = 'http://localhost:8000/api/projects/'
    const [project,setProjectData] = useState({})
    const [modalAddActive,setModalAddActive] = useState(false)
   
    
	// console.log(Object.entries(productsEntries));
	// console.log(Object.entries(values));
    useEffect(()=>{
        (async ()=>{
            const data = await getData(`${BASEURL}${projectId}`)
            setProjectData(project => data)
            
        })()
     

    },[])
    // useEffect(() => {
    //     console.log('Project data updated:', project);
    // }, [project]);
    

    console.log(project);
     
    

    const title = project.title || '';
    const projectOwnerId = project.owner || '';
    const membersIdsList = project.members || [];
    const finalProduct = project.final_product || '';
    const values = project.table?.Values || {};
    const products = project.table?.Products || {};
    const productsEntries = Object.entries(products);
     

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
					<span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
						<span>Pending</span>
					</span>
				</td>
			</tr>
	))    
    const CalculatedValues ={}
    for (const product of productsEntries) {
        let productObj = product[1]
         Object.keys(productObj).map((key)=>{
            if(CalculatedValues[key]){
                CalculatedValues[key]+=productObj[key]
            }else{
                CalculatedValues[key]=productObj[key]
            }
        })
       
    }
    const CalculatedHtml = Object.keys(CalculatedValues)
        .map((key)=>(
            <td  key={`${key}//`} className="p-3 text-center border-t border-opacity-20 dark:border-gray-500 dark:bg-gray-50">
					<p>{CalculatedValues[key]}</p>
				</td>
        )) 
    



    const testData = {"Carrot": {
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
    function deleteData(valuesDelData={},projectsDelData={}){
        if (Object.keys(valuesDelData).length > 0){
            for (const key of Object.keys(valuesDelData)) {
                if (values[key]){
                   delete values[key] 
                   for (const key of Object.keys(products)) {
                    delete products[key][values[key]]
                    }
                }else{
                    console.log('no value to delete');

                }
            } 
            
        }
        if(Object.keys(projectsDelData).length > 0){
            for (const key of Object.keys(projectsDelData)) {
                if (products[key]){
                   delete products[key]  
                }else{
                   console.log('no product to delete');
                }
            } 
            

        }
        localProjectData()   
        }
    console.log(values);
    console.log(products);
   
    const edit = ()=>{
        setModalAddActive(true)
        editData({'Vitamin-B12': 'koko'},testData)}

    const add = ()=>{
        setModalAddActive(true)
          }

    const del = ()=>{
                console.log('EDDIT');
                deleteData({'Vitamin-B13': 'mg'},testData)}    

    
    

    return(
        <>
           {modalAddActive && <AddField project={project} 
            setProjectData={setProjectData}
            setModalAddActive={setModalAddActive} />}
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800" bis_skin_checked="1">
                <div className="row">
               {user.id==projectOwnerId && <div className="controls">
                     <i className="ph ph-plus-square" onClick={add}></i>{/*openModal('add') */}
                      
                    <i className="ph ph-pencil" onClick={edit}></i>
                    <i className="ph ph-trash" onClick={del}></i>
                    <i className="ph ph-sliders-horizontal" onClick={() => openModal('settings')}></i>
                </div>}
                    <h2 className="mb-4 project-title text-2xl font-semibold leading-tight">{title}</h2>
                    
                
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
                                    <p className="text-center ">{finalProduct} </p>
                                </td>
                                 {CalculatedHtml}
                                <td className="p-3 text-right border-t border-opacity-20 dark:border-gray-500 dark:bg-gray-50">
                                    <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50 ">
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