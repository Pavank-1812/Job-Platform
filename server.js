const express = require("express");

const app = express();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

//HTTPS METHODS ARE GET, PUT/pacth, POST, DELETE

app.get("/health", (req, res) => {
    console.log("Client has made a request");
    res.json({
        service: "Job Listing Backend API Server",
        status: "active",
        time: new Date(),
    });
    // res.send();
    // res.sendFile();
    // res.render();
});

//app.listen can take 2 parameters i.e.; port and a function (generally we use arrow function)
app.listen(PORT, () => {
    console.log(`Backend server running at http://${HOST}:${PORT}`);
});