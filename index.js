const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yjiyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("TourBooking");
    const servicesCollection = database.collection("service");
    const bookingCollection = database.collection("Booking");

    // POST API
    app.post("/addService", async (req, res) => {
      const service = req.body;
      const result = await servicesCollection.insertOne(service);
      res.json(result);
    });

    // GET API
    app.get("/service", async (req, res) => {
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    // POST API user Booking
    app.post("/booking", async (req, res) => {
      const service = req.body;
      console.log(service);
      const result = await bookingCollection.insertOne(service);
      res.json(result);
    });
    // GET user Booking
    app.get("/booking/:email", async (req, res) => {
      const email = { email: req.params.email };
      console.log(email);
      const result = await bookingCollection
        .find({
          userEmail: req.params.email,
        })
        .toArray();
      res.send(result);
    });

    // DELETE Orders
    // app.delete("/booking/:id", async (req, res) => {
    //   const id = req.params.id;
    //   console.log("id");
    //   const query = { _id: ObjectId(id) };
    //   const result = await bookingCollection.deleteOne(query);
    //   res.json(result);
    // });
    // Update Orders
    // app.put("/booking/:id", async (req, res) => {
    //   const id = req.params.id;
    //   console.log("id", id);
    //   const update = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   console.log(filter);
    //   const options = {upseert : true}
    //   const updateDoc ={
    //     $set:{
    //       state: update.state,
    //     }
    //   }
    //   console.log("update", updateDoc);
    //   const result = await  bookingCollection.updateOne(filter, updateDoc, options)
    //   res.send(result)
    // });

    // // GET API
    // app.get("/booking", async (req, res) => {
    //   const cursor = bookingCollection.find({});
    //   const services = await cursor.toArray();
    //   res.send(services);
    // });
  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Hit Server", port);
});




// git remote add origin https://github.com/TayeburRahman/turizam_vill_clints.git
// git branch -M main
// git push -u origin main