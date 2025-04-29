const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');

require('dotenv').config();

app.use(express.json());
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
