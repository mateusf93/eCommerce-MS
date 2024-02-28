import express from 'express';


const app = express();
const port = process.env.PORT || 3003;

app.get('/', (req, res)=>{
    res.send("Orders Service is running")
  })
  
  app.listen(port, () => console.log(`Orders Service is running ${port}`));
  