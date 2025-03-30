// test.js
const { MongoClient } = require ('mongodb');
const uri = "mongodb+srv://simiyunevily:xFBUKmJow8tCIl3F@cluster0.2vqk2.mongodb.net/inventoryDB?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  try {
    const client = await MongoClient.connect(uri);
    console.log("Connected successfully");
    await client.close();
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

testConnection();


const transactions = [
  { userId: 1, amount: 50, type: "credit" },
  { userId: 2, amount: 30, type: "debit" },
  { userId: 1, amount: 20, type: "debit" },
  { userId: 2, amount: 100, type: "credit" },
  { userId: 1, amount: 10, type: "credit" }
];



const words = ["cat", "dog", "apple", "Cat", "banana", "do"];

const result = words.reduce((obj, word)=>{

  if(!obj[word.length]) obj[word.length] = [];

    obj[word.length] =  word.length



  

},{})