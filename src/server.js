import express from "express";

// const express = require("express");

const app = express();

const hostname = "localhost";

const port = 8080;

app.get("/", function (req, res) {
  res.send("<h1>hello word</h1>");
});

app.listen(port, hostname, () => {
  console.log(`hello hoanbaoDev,Iam running server at ${hostname}:${port}/`);
});
