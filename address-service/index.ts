import express from 'express';


const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res)=>{
    res.send("Address Service is running")
  })
  
  app.listen(port, () => console.log(`Address Service is running ${port}`));
  