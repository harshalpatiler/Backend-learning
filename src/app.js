const express = require("express");
const app = express();
const connectDb = require("./config/database");
const user = require("./model/user");

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
app.get('/user', async (req, res)=>{
const userEmailId = req.body.emailId
try {
  const userInfo = await user.find({
  emailId : userEmailId
})
if(userInfo.length === 0){
  res.status(404).send("please enter correct email id")
}else res.send(userInfo);
} catch(err){
  res.status(404).send("something went wrong")
}

})

app.get('/feed', async (req, res)=>{
 try {
  const alluser = await user.find();
 res.send(alluser);
}catch(err){
  res.status(404).send("Something went wrong !!!!");
}
} );

app.delete('/user', async (req, res)=>{
  const id = req.body.userId;
  console.log(id)
  try{
     const userone = await user.findByIdAndDelete(id);
     res.send("User with these id not found please try again with correct email id ")
  }catch(err){
    res.status(404).send("something went wrong!!")
  }
})

app.patch('/update', async (req, res)=>{
  const id = req.body.userId;
  const data = req.body;
  console.log(id)
  console.log(data)
 try{ 
  const updatedUser = await user.findByIdAndUpdate(id, data);
  res.send("The user has beed updated successfully!!!")
}catch(err){
  res.status(404).send("Error occured"+ err.message)
}
})

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
