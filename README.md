# 📌 Logging Middleware Service

This project implements a reusable **logging middleware** that sends structured logs to the **Evaluation Service API**.  
It demonstrates authentication, token management, and making authenticated API calls to log application events.

---

## 🚀 Features
- Reusable `log()` function:
  ```js
  log(stack, level, pkg, message)


## Authentication
<img width="1768" height="912" alt="Screenshot 2025-09-08 134746" src="https://github.com/user-attachments/assets/b87dcc1d-7be4-41de-963e-c655b0f2bec0" />

<img width="1576" height="836" alt="Screenshot 2025-09-08 133614" src="https://github.com/user-attachments/assets/1aef949d-b992-4838-a44b-4b9737e5ebfc" />



## Running the Project
### Install dependencies
npm install express axios

# Start the server
node server.js

# Visit
GET http://localhost:3000/ 

## logs
![WhatsApp Image 2025-09-08 at 14 30 00_40770d4f](https://github.com/user-attachments/assets/4339af36-1914-4cf1-a804-fc1cb7d134c0)

## Backend (URL-Shortner)

A simple Node.js + Express based **URL Shortener** with expiry and click tracking.
---

## 🚀 Features
- Create short URLs with optional custom shortcode.
- Each short URL has an **expiry time** (default: 30 minutes).
- Redirect from short URL to original URL.
- Track clicks with timestamp, referrer, and IP address.
- Fetch statistics for each shortcode.
---

## Running the Project
### Install dependencies
npm install express uuid moments

# Start the server
node server.js

## 📝 API Endpoints
### 1️⃣ Create a short URL
# POST http://localhost:3000/shorturls
{
  "url": "https://example.com/very-long-page",
  "validity": 10,
  "shortcode": "abc123"
}

![WhatsApp Image 2025-09-08 at 14 29 23_d2ea602e](https://github.com/user-attachments/assets/c09d6452-2762-4fd8-8892-f3da816cc905)

## Geeting URL back. 
## GET http://localhost:3000/shorturls/abc123

![WhatsApp Image 2025-09-08 at 15 01 08_d7daa716](https://github.com/user-attachments/assets/0afe4408-b3f8-4fac-957b-2a99649d10d0)

