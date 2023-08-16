import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import registerHandler from './controllers/register.js';
import signinHandler from './controllers/signin.js';
import profileHandler from './controllers/profile.js';
import imageHandler from './controllers/image.js';


const handleRegister = registerHandler;
const handleSignin = signinHandler;
const handleProfileGet = profileHandler;
const handleImage = imageHandler;


const db = knex({
	client: 'pg',
	connection: {
		connectionString: "postgresql://postgres:jRD3D55fbHLEvKpvwwjP@containers-us-west-79.railway.app:6861/railway",
		ssl: { rejectUnauthorized: false},
		host: "containers-us-west-79.railway.app",
		port: 6861,
		user: 'postgres',
		password: 'jRD3D55fbHLEvKpvwwjP',
		database: "railway"
	}
});


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
	res.send('success');
})


app.post('/signin', handleSignin(db,bcrypt));


app.post('/register', (req,res) => {handleRegister(req,res,db,bcrypt)});


app.get('/profile/:id', (req,res) => {handleProfileGet(req,res,db)});


app.put('/image', (req, res) => {handleImage(req,res,db)})




app.listen(3000, () => {
	console.log('app is running');
});