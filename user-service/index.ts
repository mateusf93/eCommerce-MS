import express from 'express';
import {userRoutes} from './src/routes/UserRoutes'



const app = express();
const port = process.env.PORT || 9000;
app.use(express.json(), userRoutes);
app.get('/', (req, res)=>{
    res.send("Users Service is running")
  })
  
  app.listen(port, () => console.log(`Users Service is running ${port}`));
  