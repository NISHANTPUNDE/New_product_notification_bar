import { Layout, LegacyCard } from '@shopify/polaris'
import {Card} from '../components'
import React from 'react'

export function OrderDetails ({ data,title,productCard,collectionCard,orderCard,fulfillCard,remainsCard }) {
  return (
    <>
      <Layout.Section oneThird>
        <LegacyCard title={title} sectioned>
              <h1 className='total_count'>
                  
              </h1>
        </LegacyCard>
    </Layout.Section>
  
    </>
  )
}
  




