import {  FormLayout, Layout, LegacyCard } from "@shopify/polaris";
import {Card} from '../components'

import React from 'react'

export const ProductTable = ({data}) => {
    {console.log("data:",data)}
    return (
        <FormLayout>
    
    
  {
    data.map((product) => (
      <FormLayout.Section key={product.id}>
        <Card {...product}/>
      </FormLayout.Section>
    ))

  }
  </FormLayout>
        
      )
      
}

