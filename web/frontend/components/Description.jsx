import React from 'react'
import { useLocation } from 'react-router-dom';
import { LegacyCard } from '@shopify/polaris';

export const Description = () => {

  const location = useLocation();
  const { data } = location.state || {};
  console.log(data)
  return (
    <div>
    <LegacyCard  sectioned spacing="loose" 
    >

    
    <table>
    
    <thead className='t1' >
        <tr>
            <th>Product ID</th>
            <th>Image</th>
            <th>Product Name</th>
            
            
        </tr>
    </thead>
    
    <tbody>
    {data.items.map((item, index) => {
       return <tr key={index}>
          <td>hello</td>
         <td>Title: {item.title}</td>
        <td>Image: {item.image}</td>
      </tr>
    })}

    </tbody>
   
</table>
</LegacyCard>
    
    
    </div>
  )
}

