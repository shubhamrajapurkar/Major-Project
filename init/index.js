// const mongoose=require("mongoose");
// const initdata=require("./data.js");
// const Listing = require("../models/listing.js");

// main()
// .then(res=>{
//     console.log("database connected");
// })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/JourneyNest');
// };

// const initDB= async () => {
//     await Listing.deleteMany({});
//     await Listing.insertMany(initdata.data);
//     console.log("data inserted");
// }

// initDB();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/JourneyNest";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"661e9fc4c7f5605594c63e2a"}))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();


