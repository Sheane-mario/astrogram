import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import searchRoutes from './routes/search.js';
import eventRoutes from './routes/events.js';
import { register } from './controllers/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';
import Event from "./models/Event.js";
import { users, posts, events } from './data/index.js';


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy: 'cross-origin' } ));
app.use(morgan('common'));
app.use(bodyParser.json( { limit: '30mb', extended: true } ));
app.use(bodyParser.urlencoded( { limit: '30mb', extended: true } ));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register);

/* ROUTES */ 
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use("/posts", postRoutes);
app.use("/search", searchRoutes);
app.use("/events", eventRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server port ${PORT}`));

        //User.insertMany(users);
        //Post.insertMany(posts);
        //Event.insertMany(events);
    })
    .catch((err) => console.log(`${err} did not connect !`));   