const express = require('express');
const app = express();

const morgan = require('morgan');
const AppError = require('./AppError');

app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    req.method = 'GET'
    console.log(req.method, req.path);
    next();

});



const verifyPassword = ((req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    // res.send('Sorry you need a Password!!')

    throw new AppError('Password required!', 401)
})



app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Home Page!!')
})

app.get('/error', (req, res) => {
    chicken.fly();
})


app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Woof Woof')
})

app.get('/admin', (req, res) => {
    throw new AppError('You are not an app Admin! ', 403)
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send("MY SECRET IS: Sometimes I wear pods so I avoid talking")
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

// app.use((err, req, res, next) => {
//     console.log('*************');
//     console.log('******ERROR******');
//     console.log('*************');
//     console.log(err);
//     next(err);
// })

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    const { message = 'Something went wrong' } = err;

    // express deprecated res.send(status): Use res.sendStatus(status) instead index.js

    res.sendStatus(status).send(message)
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})