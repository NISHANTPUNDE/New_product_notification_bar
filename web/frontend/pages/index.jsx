import {
  Layout,
  Page,
  LegacyCard
 
} from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks";
import { OrderGraphs , Card2 , Card,  OrderDetails, ProductTable} from "../components";
import { useEffect, useState } from "react";



export default function HomePage() {

  let fetch=useAuthenticatedFetch();

  let[products,setProducts]=useState([])
  let[collections,setCollections]=useState(0)
  let[orders,setOrders]=useState(0)
  let[fulfilled,setFulFilled]=useState(0)
  let[remains,setRemains]=useState(0)



  async function fetchProducts(){
    try {

      let request=await fetch("api/products")
      let response=await request.json()
      
      console.log(response.data)
      setProducts(response.data)
      
      
    } catch (error) {
      
      console.log(error)
    }
  }




  

  // async function fetchOrders(){
  //   try {

  //     let request=await fetch("/api/orders/all")
  //     let response=await request.json()
  //     console.log(response.data.length)
  //     setOrders(response.data.length)
  //     // let fulfillOrders=response.data.filter(item=>item.fulfillment_status==='fulfilled')
  //     // setFulFilled(fulfillOrders.length)
  //     // setRemains(response.data.length - fulfillOrders.length)

  //   } catch (error) {
      
  //     console.log(error)
  //   }
  // }

 

  useEffect(()=>{
    
    fetchProducts()
   
    

  },[])

  return (
    <Page fullWidth>
        <div className="home-section">
            <div className="graphs-section">
                
            </div>
            <div className="cards-section ">
              <Layout>
               
              </Layout>
                  
            </div>

            <div className="order-details-section">
            
              <Card data={products} />
           
            </div>
        </div>
    </Page>
  );
}
