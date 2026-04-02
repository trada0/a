const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static(__dirname));

const FILE = "count.json";

function getData(){
if(!fs.existsSync(FILE)){
fs.writeFileSync(FILE, JSON.stringify({
count:0,
visits:[]
}, null, 2));
}
return JSON.parse(fs.readFileSync(FILE));
}

function saveData(data){
fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// mỗi lần vào web
app.get("/visit",(req,res)=>{

let data = getData();

let ip =
req.headers['x-forwarded-for'] ||
req.socket.remoteAddress;

data.count++;

data.visits.push({
ip: ip,
time: new Date().toLocaleString()
});

saveData(data);

res.json(data);
});

app.listen(3000,()=>{
console.log("http://localhost:3000");
});
