const express = require("express");
const path = require("path")
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 3000;


//set up express app to handle data parsing:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))