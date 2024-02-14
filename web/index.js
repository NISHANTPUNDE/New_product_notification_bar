// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";
import mysql from "mysql"
import bodyParser from "body-parser"
import exp from "constants";
import cors from "cors"
const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();
app.use(bodyParser.json())
// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());
// app.use("/userdata/*", authenticateUser);

// async function authenticateUser(req,res,next){
//   let shop=req.query.shop

//   let storeName=await shopify.config.sessionStorage.findSessionsByShop(shop)
//   if(shop===storeName[0].shop)
//   {
//     next()
//   }
//   else
//   {
//     res.send("User not Authorized")
//   }
// }

app.use(express.json());
app.use(cors());
// GETTING STOREDATA DATA
// app.get('/userdata/userinfo',async(req,res)=>
// {
//   res.send(200).send("Store data send successfully")
// })

// //
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "product_notification_bar"
// })
// db.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to database")
// })
// app.use(express.json())
// app.use(cors())
// app.get("/user", (req, res) => {
//   db.query("SELECT * FROM product", (err, result) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       res.status(500).send("Error fetching data");
//       return;
//     }
//     // console.log("Data fetched:", result);
//     res.status(200).send(result);
//   });
// });
// app.post("/userdata", (req, res) => {
//   let sql = "INSERT INTO product(`productid`,`discount`,`discountprice`,`discription`,`shopid`,`productname`) VALUES(?,?,?,?,?,?)";
//   let storeData = [
//     req.body.productid,
//     req.body.discount,
//     req.body.discountprice,
//     req.body.discription,
//     req.body.shopid,
//     req.body.productname
//   ];
//   console.log(storeData)

//   db.query(sql, storeData, (err, result) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       res.status(500).send("Error inserting data");
//       return;
//     }
//     console.log("Data inserted:", result);
//     res.status(200).send("Data inserted successfully");
//   });
// });

// app.listen(8083, () => {
//   console.log("Server is running on port 8083")
// })
// //


//read shop information

app.get("/api/store/info", async (req, res) => {
  let storeInfo = await shopify.api.rest.Shop.all({
    session: res.locals.shopify.session,
  })

  res.status(200).send(storeInfo);
})



app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});


//read all products
app.get("/api/products", async (_req, res) => {
  const countData = await shopify.api.rest.Product.all({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/shop", async (_req, res) => {
  const shopData = await shopify.api.rest.Shop.all({
    session: res.locals.shopify.session,
  });
  // console.log(countData)
  res.status(200).send(shopData);
});

//read collection data
app.get("/api/collections/count", async (_req, res) => {
  const countData = await shopify.api.rest.CustomCollection.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

//read orders
app.get("/api/orders/all", async (_req, res) => {
  const orderData = await shopify.api.rest.Order.all({
    session: res.locals.shopify.session,
    status: "any"
  });
  res.status(200).send(orderData);
});

// Assuming you have set up your Shopify API credentials and authentication

app.put("/api/products/update", async (req, res) => {
  try {
    // const { productId, variantId, newPrice } = req.body;
    const product = new shopify.api.rest.Product({ session: res.locals.shopify.session });
    product.id = 8906413900063,
      product.compare_at_price = "100.00",
      // product.variants = [
      //   {
      //     id: 47625426895135,
      //     title: "new variant",
      //     compare_at_price: "100.00",
      //   },
      // ];


      await product.save({
        update: true,
      });

    res.status(200).json({ message: "Product variant price updated successfully" });
  } catch (error) {
    console.error("An error occurred:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
