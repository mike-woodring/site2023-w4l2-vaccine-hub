const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { PORT } = require("./config");
const { BadRequestError, NotFoundError } = require("./utils/errors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
    return next(new NotFoundError())
});
  
app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message

    return res.status(status).json({
        error: { message, status },
    })
})
  
app.listen(PORT, () => {
    console.log({
        "context": "app.listen",
        "message": `Server running on http://localhost:${PORT}`
    })
});