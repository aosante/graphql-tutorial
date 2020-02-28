const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');
const cors = require('cors');

const app = express();

// allow cros origin requests
const corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

// mongodb+srv://admin:<password>@cluster0-pq2oj.mongodb.net/test?retryWrites=true&w=majority
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => console.log(err));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// bind express with graphql
app.use(
  '/graphql',
  graphqlHTTP({
    // pass in a schema property
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
