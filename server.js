const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const productRoutes = require('./routes/handleProducts');

app.use(express.json());

app.use(express.json());
app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});