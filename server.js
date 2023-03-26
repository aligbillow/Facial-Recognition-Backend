const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

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
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    bcrypt.compare("bacon", '$2a$10$t7row39yqI47RSfZM1MUSu2dX27snq4KKUIBGbMVZPmC4x0mT6RJG', function(err, res) {
        console.log('first guess', res)
    });
    bcrypt.compare("veggies", '$2a$10$t7row39yqI47RSfZM1MUSu2dX27snq4KKUIBGbMVZPmC4x0mT6RJG', function(err, res) {
        console.log('second guess', res)
    }); 
    console.log(req.body)
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
    res.json(database.users[0]);     
    res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')    
                .insert({
                    email:loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })    
        .catch(err => res.status(400).json('unable to register'))
})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
     .then(user => {
        if (user.length) {
            res.json(user[0])
        } else { 
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
    // if (!found) {
    //     res.status(400).json('not found');
    // }
})


app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
     .increment('entries', 1)
     .returning('entries')
     .then(entries => {
        res.json(entries[0].entries);
     })
     .catch(err => res.status(400).json('unable to get entries'))
})

app.listen(3000, () => {
    console.log('app is running on port 3000');
}) 
