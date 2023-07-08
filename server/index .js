import express from "express"
import bodyParser from "body-parser"
import path  from "path"
import morgan from "morgan"
import mongoose from "mongoose"
import multer from "multer"
import helmet from "helmet"
import dotenv from 'dotenv'
import cors from "cors"
import {fileURLToPath} from 'url'


// CONFIGURATIONS ---------
const __filename = fileURLToPath(import.meta,url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet.crossOriginEmbedderPolicy({policy:"cross-origin"}));
app.use(morgan("common "));
app.use(bodyParser.json({limit: "40mb",extended : true }));
app.use(bodyParser.urlencoded({limit: "40mb",extended : true }));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assests')));

// FILE STORAGE 
const storage = multer.diskStorage({
    destination : function(req,file ,cb){
        cb(null,"public/assests");
    },
    filename : function (req,file,cb){
        cb(null,file.originalname);
    }

});
const upload =multer({storage});

// moongise setup 
const PORT = process.env.PORT|| 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    app.listen(PORT , ()=>console.log(`server Port :${PORT}`));
})
.catch((error)=> console.log(`${error} did not connect`));

