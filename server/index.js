require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.p3eoj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const DATBASE_NAME = "stock-dekho";
const port = 3001;
const app = express();
app.use(cors());
app.use(bodyParser.json());
client.connect().then(async () => {
  console.log("Connected to Database cluster");

  // await client.close();
});
// respond with "hello world" when a GET request is made to the homepage
app.get("/bseCount", async (req, res) => {
  let x = await client.db(DATBASE_NAME).collection("BSE").countDocuments();
  res.send(`BSE collection has ${x} documents`);
});

app.post("/getBSE", async (req, res) => {
  let startDate = new Date(req.body.data.startDate);
  let endDate = new Date(req.body.data.endDate);
  const findResult = client
    .db(DATBASE_NAME)
    .collection("BSE")
    .find({
      Date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
  let arr = await findResult.toArray();
  res.send(arr);
});
app.post("/getNSE", async (req, res) => {
  let startDate = new Date(req.body.data.startDate);
  let endDate = new Date(req.body.data.endDate);
  const findResult = client
    .db(DATBASE_NAME)
    .collection("NSE")
    .find({
      Date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
  let arr = await findResult.toArray();
  res.send(arr);
});
app.post("/getCompany", async (req, res) => {
  let startDate = new Date(req.body.data.startDate);
  let endDate = new Date(req.body.data.endDate);
  let companyName = req.body.data?.companyName;
  const findResult = client
    .db(DATBASE_NAME)
    .collection(companyName)
    .find({
      Date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
  let arr = await findResult.toArray();
  res.send(arr);
});

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});

// TODOS
// implement AUTH
