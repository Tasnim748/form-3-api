const app = require('./app');
const port = 4003;
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const DB_URL = process.env.MONGODB_LOCAL_SERVER;
console.log(DB_URL);
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to mongo server successfully'))
    .catch(() => console.log('connection failed :('));

app.listen(port, () => {
    console.log(`listenning on port: ${port}`)
})