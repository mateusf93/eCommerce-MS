import express from 'express';


const app = express();
const port = process.env.PORT || 3002;

app.get('/', (req, res)=>{
    res.send("Cart Service is running")
  })
  
  app.listen(port, () => console.log(`Cart Service is running ${port}`));
  