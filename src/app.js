const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const vPath = path.join(__dirname, '../templates/views');
const pPath = path.join(__dirname, '../templates/partials');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, '../templates/assets/images')));
app.use("/css", express.static(path.join(__dirname, '../templates/assets/css')));
app.use("/js", express.static(path.join(__dirname, '../templates/assets/js')));

app.set('view engine', 'hbs');
app.set('views', vPath);
hbs.registerPartials(pPath);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/100JSProjects', (req, res) => {
    res.render('100JSProjects');
});

app.get('/leap-year', (req, res) => {
    res.render('leap_year');
});

app.get('/array-search', (req, res) => {
    res.render('search');
});

app.get('/char-search', (req, res) => {
    res.render('char_search');
});

app.get('/40-br', (req, res) => {
    res.render('40_br');
});
