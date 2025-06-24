const express = require('express');
const app = express();
const logger = require('./middlewares/logger');
const swaggerDocs = require('./docs/swagger');

app.use(express.json());
app.use(logger); // Middleware global
require('./routes/userRoutes')(app);
swaggerDocs(app);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
