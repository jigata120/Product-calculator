import AddFields from "../projecs/AddFiels"

 

 

export default function Projects() {
    let projectData={
        "title":"MineralsCalculator",
        "finalProduct":"Soap",
        "owner":"60f0adw3-34b0-4abd-9769-8c42f830eeec",
        "members":[
            "60f0cf0b-34b0-4abd-9769-8c42f830dffc",
            "35c62d76-8152-4626-8712-eeb96381bea8"
        ],
        "table":{
            "Values":{
                "Calcium":"mg",
                "Magnecium":"mg",
                "Celen":"mg",
                "Vitamin-B6":"mg",
                "Vitamin-B12":"mg",  
            },
            "Products":{
                 "Carrot":{
                    "Calcium":100,
                    "Magnecium":23,
                    "Celen":15,
                    "Vitamin-B6":4,
                    "Vitamin-B12":55, 
                },
                "Broccoli":{
                    "Calcium":50,
                    "Magnecium":0,
                    "Celen":200,
                    "Vitamin-B6":0,
                    "Vitamin-B12":55, 
                },
                "Garlic":{
                    "Calcium":100,
                    "Magnecium":123,
                    "Celen":200,
                    "Vitamin-B6":76,
                    "Vitamin-B12":0, 
                },
                "Carrot2":{
                    "Calcium":100,
                    "Magnecium":23,
                    "Celen":15,
                    "Vitamin-B6":4,
                    "Vitamin-B12":55, 
                },
                // "Broccoli2":{
                //     "Calcium":50,
                //     "Magnecium":0,
                //     "Celen":200,
                //     "Vitamin-B6":0,
                //     "Vitamin-B12":55, 
                // },
                // "Garlic2":{
                //     "Calcium":100,
                //     "Magnecium":123,
                //     "Celen":200,
                //     "Vitamin-B6":76,
                //     "Vitamin-B12":0, 
                // },
            }
        }
    
    
    }
    const title = projectData.title
    const projectOwnerId = projectData.owner
    const membersIdsList = projectData.members
    const finalProduct = projectData.finalProduct
    const values = projectData.table.Values
    const products = projectData.table.Products
    const productsEntries = Object.entries(products)
	console.log(Object.entries(productsEntries));
	console.log(Object.entries(values));
	 


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
    return(
        <>
           
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800" bis_skin_checked="1">
                <div className="row">
                   <AddFields projectData={projectData}/>
                    <h2 className="mb-4 project-title text-2xl font-semibold leading-tight">TITLE</h2>
                    

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