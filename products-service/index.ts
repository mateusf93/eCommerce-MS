import express from 'express';


const app = express();
const port = process.env.PORT || 3005;

app.get('/', (req, res)=>{
    res.send("Products Service is running")
  })
  
  app.listen(port, () => console.log(`Products Service is running ${port}`));
  