const express = require('express');
const cors = require('cors');
const db = require('./models');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/product'));

db.sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}`);
  });
});
