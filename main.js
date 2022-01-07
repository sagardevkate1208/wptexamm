const express = require("express");
const res = require("express/lib/response");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const { sendmessage, showmessage } = require("./user.js");

app.post("/add-chat", async(req, res) => {
    const user = req.body;
    await sendmessage(user);
    res.json({ message: "message Added Successfully" });
});
app.get("/users", async(req, res) => {
    const list = await showmessage();
    res.json(list);
});
app.listen(2000, () => console.log("server started"));