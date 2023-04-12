const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT || 3000

const { config } = require('dotenv');
config();

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'alibillow',
      password : '',
      database : 'smart-brain'
    }
  });

db.select('*').from('users').then(data => {
    // console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/register', (req, res) => {register.handleRegister (req, res, db, bcrypt)})
// database.users

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt) })
// 	const { email, password } = req.body

// 	if ( !email || !password) {
// 		return res.status(400).json('incorrect form submission');
// 	}

// 	db.select('email', 'hash').from('login')
// 	.where('email', '=', email)
// 	.then(data => {
// 		const isValid = bcrypt.compareSync(password, data[0].hash);
// 		if (isValid) {
// 			return db.select('*').from('users')
// 				.where('email', '=', email)
// 				.then(user => {
// 					res.json(user[0])
// 				})
// 				.catch(err => res.status(400).json('unable to get user'))
// 		} else {
// 			res.status(400).json('wrong credentials')
// 		}
// 	})
// 	.catch(err => res.status(400).json('wrong credentials'))
// }

// app.post('/register', (req, res) => { register.handleRegister (req, res, db, bcrypt) }) 

    // register = (req, res) => {
    //     const { email, name, password } = req.body;
    //     const hash = bcrypt.hashSync(password);
    //         db.transaction(trx => {
    //             trx.insert({
    //                 hash: hash,
    //                 email: email
    //             })
    //             .into('login')
    //             .returning('email')
    //             .then(loginEmail => {
    //                 return trx('users')
    //                 .returning('*')    
    //                 .insert({
    //                     email:loginEmail[0].email,
    //                     name: name,
    //                     joined: new Date()
    //                 })
    //                 .then(user => {
    //                     res.json(user[0]);
    //                 })
    //             })
    //             .then(trx.commit)
    //             .catch(trx.rollback)
    //         })    
    //         .catch(err => res.status(400).json('unable to register'))
    // }

app.get('/profile/:id', (req, res) => { profile.getProfile (req, res) })
    // const { id } = req.params;
    // db.select('*').from('users').where({id})
    //  .then(user => {
    //     if (user.length) {
    //         res.json(user[0])
    //     } else { 
    //         res.status(400).json('Not found')
    //     }
    // })
    // .catch(err => res.status(400).json('error getting user'))
    // if (!found) {
    //     res.status(400).json('not found');
    // }
    // })

app.put('/image', (req, res) => { image.fetchImage (req, res, db) })
//     const { id } = req.body;
//     db('users').where('id', '=', id)
//      .increment('entries', 1)
//      .returning('entries')
//      .then(entries => {
//         res.json(entries[0].entries);
//      })
//      .catch(err => res.status(400).json('unable to get entries'))
// })

app.listen(PORT, () => {
    console.log('app is running on port 3000');
}) 
