const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const auth = {
  email: "akshat.agarwal9292@gmail.com",
  name: "akshat agarwal",
  rollNo: "2201641520018",
  accessCode: "sAWTuR",
  clientID: "d6b5e270-fe9d-471d-b8c9-2a28e6085fb2",
  clientSecret: "ufcumqDGJBJnYaKu",
};

const getToken = async () => {
  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/auth",
      auth,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error getting token:",
      error.response?.data || error.message
    );
    return null;
  }
};

const log = async (stack, level, pkg, message) => {
  try {
    const token = await getToken();
    if (!token) throw new Error("Token not received");

    const body = { stack, level, package: pkg, message };

    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending log:", error.response?.data || error.message);
    return null;
  }
};

app.get("/", async (req, res) => {
  const logResponse = await log(
    "backend",
    "error",
    "handler",
    "received string, expected bool"
  );
  res.json(logResponse || { error: "Failed to send log" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});