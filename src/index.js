const express = require('express');
require('dotenv/config');
const cors = require('cors');
// require('express-async-errors');
require('./db/mongoose');
require('./db/redis');


console.log(process.env.REDIS_HOST)
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
