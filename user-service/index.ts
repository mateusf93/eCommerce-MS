import express from 'express';


const app = express();
const port = process.env.PORT || 3006;

app.get('/', (req, res)=>{
    res.send("Users Service is running")
  })
  
  app.listen(port, () => console.log(`Users Service is running ${port}`));
  