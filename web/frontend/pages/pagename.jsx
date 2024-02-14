import React, { useState } from 'react';
import { Button, LegacyCard, Page, Layout, Text, TextField } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Stack } from '@mui/material';

export default function PageName() {
  const { t } = useTranslation();
  const location = useLocation();


  const { data } = location.state || {};
  const [description, setDescription] = useState('')
  const handleDescription = (value) => {
    setDescription(value)
  }

  const handleDescriptionClick = () => {

  }

  const initialDiscounts = data?.items.map(() => 0)
  const [discount, setDiscount] = useState(initialDiscounts);

  const calculateDiscountedPrice = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice.toFixed(2);
  };

  const handleDiscountChange = (value, index) => {
    const newDiscounts = [...discount]
    newDiscounts[index] = parseFloat(value) || 0;
    setDiscount(newDiscounts);
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>

            <table>
              <thead className='t1' >
                <tr>
                  <th>Checkbox</th>
                  {/* <th>Product ID</th> */}
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Discounted Price</th>

                </tr>
              </thead>
              <tbody>
                {data && data.items && data.items.map((item, index) => {
                  const discountedPrice = calculateDiscountedPrice(item.price, discount[index]);

                  return (
                    <tr key={index}>
                      <td><input
                        type='checkbox'
                        // onChange={() => handleCheckboxChange(index)}
                        // checked={selectedItems.includes(index)}
                        style={{ width: "30px", height: "30px" }}
                      ></input>

                      </td>
                      {/* <td style={{ filter: "blur(2px)" }}>{item.id} </td> */}
                      <td style={{ textAlign: "center", width: "150px" }}>
                        <img src={item.image || 'https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png'} height='70' width='70' alt='profile' />
                      </td>
                      <td>
                        <p style={{ textAlign: "center", width: "200px" }}> {item.title} </p>
                      </td>
                      <td style={{ textAlign: "center", width: "100px" }}>${item.price} </td>
                      <td>
                        <TextField
                          type='number'
                          value={discount[index].toString()}
                          onChange={(value) => handleDiscountChange(value, index)}
                          style={{ width: "50px" }}
                          size="small"
                        />
                      </td>
                      <td style={{ textAlign: "center", width: "100px" }}>${discountedPrice}</td>



                    </tr>
                  );
                })}
              </tbody>
            </table>
          </LegacyCard>
        </Layout.Section>


        <Layout.Section sectioned style={{ margin: "10px 50px" }}>
          <Stack></Stack>
          <LegacyCard title="Description" >
            <div style={{ margin: " 10px 50px 10px 50px" }}>
              <TextField
                value={description}
                onChange={handleDescription}
              >

              </TextField>
              <Button
                style={{ marginTop: "50px" }}
                onClick={handleDescriptionClick}
              >Add Description</Button>
            </div>

          </LegacyCard>
        </Layout.Section>




      </Layout>
    </Page>
  );
}
