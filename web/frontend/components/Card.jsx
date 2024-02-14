import React, { useState, useEffect } from 'react';
import { Layout, LegacyCard, TextField, Button } from '@shopify/polaris';
// import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuthenticatedFetch } from "../hooks";
import { respond } from '@shopify/app-bridge/actions/AuthCode';
export const Card = ({ data }) => {
  let fetch = useAuthenticatedFetch();
  // const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [discounts, setDiscounts] = useState(Array(data.length).fill(0));
  const [description, setDescription] = useState("")
  const [shop, Setshop] = useState();
  const shopdata = async () => {
    try {
      const response = await fetch(`/api/shop`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const datashop = await response.json();
      console.log("data", datashop.data[0].id);
      Setshop(datashop.data[0].id);
      // console.log("shop data:", datashop.shop.data[0].id);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    shopdata();
  }, []);
  // console.log("shopid", shop)
  const handleCheckboxChange = (index) => {
    const newSelectedItems = [...selectedItems];
    if (newSelectedItems.includes(index)) {
      newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
    } else {
      newSelectedItems.push(index);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleDiscountChange = (value, index) => {
    const newDiscounts = [...discounts];
    newDiscounts[index] = !isNaN(parseFloat(value)) && isFinite(value) ? parseFloat(value) : null;
    setDiscounts(newDiscounts);
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (discount > 0 && discount <= 100) return (price - (price * discount) / 100).toFixed(2);
  };

  // const handleDescriptionClick = () => {
  //   const selectedItemsData = selectedItems.map((index) => ({
  //     id: data[index].id,
  //     title: data[index].title,
  //     image: data[index].image?.src || 'https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png',
  //     price: data[index].variants[0].price,
  //     discount: discounts[index],
  //     discountedPrice: calculateDiscountedPrice(data[index].variants[0].price, discounts[index])
  //   }));

  //   const dataToSend = {
  //     items: selectedItemsData,
  //   };

  //   navigate('/pagename', { state: { data: dataToSend } });
  // };
  function handleDescriptionClick() {
    console.log(data[0].title)
    selectedItems.forEach((index) => {
      const itemData = {
        productid: data[index].id,
        discount: discounts[index],
        discountprice: calculateDiscountedPrice(data[index].variants[0].price, discounts[index]),
        discription: description,
        shopid: shop,
        productname: data[index].title,
      };

      axios.post("http://localhost:8009/Product_Notification_Bar/", itemData)
        .then((response) => {
          console.log(response);
          alert("Description added successfully.");
        })
        .catch((error) => {
          console.log(error);
          alert("Error occurred while adding description.");
        });
    });
  }

  //
  // Assuming you have set up your Shopify API credentials and authentication

  // Function to update a product variant's price
  async function updateProductVariantPrice() {
    try {
      const response = await fetch(`/api/products/update`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   id: 8883924533535,
        //   variants: [
        //     {
        //       id: 47493353111839,
        //       price: 100.00,
        //     },
        //   ],
        // }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        console.log("Product variant price updated successfully:", updatedProduct);
      } else {
        console.error("Error updating product variant price:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }

  updateProductVariantPrice();

  //
  return (
    <Layout>
      <Layout.Section>
        <LegacyCard
          sectioned
          spacing="loose"
        >
          <div style={{ maxHeight: '200px', overflowY: 'auto', scrollBehavior: "smooth" }}>
            <table>
              <thead className='t1'>
                <tr>
                  <th>Checkbox</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Discount %</th>
                  <th>Discounted Price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type='checkbox'
                          onChange={() => handleCheckboxChange(index)}
                          checked={selectedItems.includes(index)}
                          style={{ width: "30px", height: "30px" }}
                        />
                      </td>
                      <td style={{ textAlign: "center", width: "150px" }}>
                        <img src={item.image?.src || 'https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png'} height='70' width='70' alt='profile' />
                      </td>
                      <td>
                        <p style={{ textAlign: "center", width: "150px" }}> {item.title} </p>
                      </td>
                      <td>
                        <p style={{ textAlign: "center", width: "150px" }}>$ {item.variants[0].price} </p>
                      </td>
                      <td>
                        <TextField
                          type='number'
                          value={discounts[index]}
                          onChange={(value) => handleDiscountChange(value, index)}
                          style={{ width: "100px" }}
                          size="small"
                        />
                      </td>
                      <td>
                        {/* <div style={{ border: "1px solid black" }}> */}
                        <p style={{ textAlign: "center", width: "150px" }}>
                          {calculateDiscountedPrice(data[index].variants[0].price, discounts[index]) && "$"}
                          {calculateDiscountedPrice(data[index].variants[0].price, discounts[index])}
                        </p>
                        {/* </div> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </LegacyCard>
        <Layout.Section sectioned style={{ margin: "10px 50px" }}>
          <LegacyCard title="Description" >
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", columnGap: "1fr", margin: "10px 50px 10px 50px" }}>
              <TextField style={{ width: "100%" }} value={description} onChange={setDescription} />

              <Button style={{ width: "100%", marginTop: "50px" }} onClick={handleDescriptionClick}>
                Add Description
              </Button>
            </div>

          </LegacyCard>
        </Layout.Section>
      </Layout.Section>
    </Layout>
  );
};
