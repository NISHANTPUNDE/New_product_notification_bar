import { Layout, LegacyCard } from '@shopify/polaris';
import React from 'react';
import '../App.css';

export const Card2 = ({ title, data, product, collections, orderCard, fulfilledCard, remainsCard }) => {
  return (
    <>
      
        <Layout.Section oneThird>
          
            <LegacyCard title={title} sectioned className="legacy-card" >
             
            {product && data}
              {collections && data}
              {orderCard && data}
              {fulfilledCard && data}
              {remainsCard && data}
            
            </LegacyCard>
         
        </Layout.Section>
      
    </>
  );
};
