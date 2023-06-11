
"use strict";

const fs = require("fs");
const jwt = require("jsonwebtoken");

const privateKey = fs.readFileSync("AuthKey_H5YZQ5ZKZ4.p8").toString();
const teamId     = "X3392H7G44";
const keyId      = "H5YZQ5ZKZ4";

const jwtToken = jwt.sign({}, privateKey, {
  algorithm: "ES256",
  expiresIn: "180d",
  issuer: teamId,
  header: {
    alg: "ES256",
    kid: keyId
  }
});

print(jwtToken);