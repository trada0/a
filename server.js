const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

const FILE = "count.json";

function getData(){
if(!fs.existsSync(FILE)){
fs.writeFileSync(FILE, JSON.stringify({
count:0,
clicks:[]
}, null, 2));
}
return JSON.parse(fs.readFileSync(FILE));
}

function saveData(data){
fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// lấy dữ liệu
app.get("/get",(req,res)=>{
res.json(getData());
});

// click
app.post("/click",(req,res)=>{
let data = getData();

let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

data.count++;

data.clicks.push({
ip: ip,
time: new Date().toLocaleString()
});

saveData(data);

res.json(data);
});

app.listen(3000,()=>{
console.log("http://localhost:3000");
});
