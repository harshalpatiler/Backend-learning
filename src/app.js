const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./model/user");

app.use(express.json())
app.post("/signup", async (req, res) => {
  // const user = new User({
  //   firstName: "Dravid",
  //   lastName: "Rahul",
  //   age: 49,
  //   emailId: "rahuls@gmail.com",
  //   gender: "male",
  // });
  const user = new User(req.body)
  try {
    await user.save();
    res.send("User has been addded successfully");
  } catch(err) {
    res.status(400).send("Error in saving the user :" + err.message);
  }
});

connectDb()
  .then(() => {
    console.log("connection to Db is estabalished");
    app.listen(8000, () => {
      console.log("Listening to port number 8000 ohh yeah");
    });
  })
  .catch((err) => {
    console.log("Something went wrong !!!");
  });

// app.get("/dev",(req, res)=>{
//   //console.log(req);
//   res.send({
//     developer : "Harshal",
//     type_of_request : " you have made HTTP get request !"
//   })
// })
// // creating dynamic routes
// app.get("/dev/:devid",(req, res)=>{
//   console.log(req.params);
//   res.send({
//     developer : "Harshal",
//     type_of_request : " you have made HTTP get request !",
//     id: req.params
//   })
// })
// app.post("/dev",(req, res)=>{
//   console.log("Data has saved");
//   res.send({
//     developer : "Harshal",
//     type_of_request : " you have made HTTP POST request !"
//   })
// })

// order of writing routes is very important
// app.use("/testroute", (req, res) => {
//   res.send("You have successfully created route successfully");
// });
// app.use handles all the type of http request to the server eg. PUT/GET/PATCH/DELETE/POST etc
// app.use((req, res) => {
//   res.send("welcome in the learning of backend developement using express js");
// });
// listen to the server is like your listening request on the given port number
