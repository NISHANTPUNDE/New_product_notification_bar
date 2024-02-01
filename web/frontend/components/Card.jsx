import { Layout, LegacyCard ,LegacyStack,TextField} from '@shopify/polaris'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Description } from './Description';

export const Card = ({ data }) => {
  const navigate = useNavigate();

  const [selectedItems,setSelectedItems]=useState([]);

  const handleCheckboxChange=(index)=>{
    const newSelectedItems=[...selectedItems]
    if(newSelectedItems.includes(index))
    {
      newSelectedItems.splice(newSelectedItems.indexOf(index),1)
    }
    else
    {
      newSelectedItems.push(index)
    }

    setSelectedItems(newSelectedItems)
  }


  const handleDescriptionClick = () => {
    const selectedItemsData = 
     selectedItems.map((index) => ({
        id:data[index].id,
        title: data[index].title,
        image: data[index].image?.src || 'https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png',
        price:data[index].variants[0].price
      }))

      const dataToSend={
        items:selectedItemsData,
      }
    
    // Navigate to the '/pagename' route with dataToSend
    navigate('/pagename', { state: { data: dataToSend } });


    


  };

  return (
    <>
          <LegacyCard  sectioned spacing="loose" primaryFooterAction=
            {{
            content:'Description', 
            onAction:handleDescriptionClick,
            }}
            >

            <div style={{ maxHeight: '450px', overflowY: 'auto' ,scrollBehavior:"smooth"}}>
            <table>
            
            <thead className='t1' >
                <tr>
                    <th>Checkbox</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    
                    
                </tr>
            </thead>
            
            <tbody>
            
            {data.map((item,index)=>{
                    return <tr key={index}>
                       
                        <td><input 
                              type='checkbox' 
                              onChange={()=>handleCheckboxChange(index)}
                              checked={selectedItems.includes(index)} 
                              style={{width :"30px", height:"30px"}}
                        ></input> 
                        
                        </td>
                        <td style={{textAlign:"center",width:"300px"}}><img src={item.image?.src || 'https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png'} height='70' width='70' alt='profile'/></td>
                        <td>
                            <p style={{textAlign:"center",width:"300px"}}> {item.title} </p>
                        </td>
                        <td>
                          <p>$ {item.variants[0].price} </p>
                        </td>
                        <td>
                       
                        </td>

                    </tr>

            })}
            </tbody>
           
        </table>
        </div>
        </LegacyCard>

            
        
    </>
  )
}

