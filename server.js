// Imports
const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');

// Server setup
const app = express();
const PORT = process.env.PORT || 3001;

// Configuration object for the session
const sess = {
    secret: 'super secret secret',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({db: sequelize})
}
// Telling express to use session middleware
app.use(session(sess));

// Telling server to use handlebars and use the custom helpers
const hbs = exphbs.create({helpers});

// Telling express that we're using the handlebars templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setting up Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Starting up server and syncing database
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});