# overview

- The Firebase Image API is a RESTful API built with Node.js and Express.js, designed to interact with Firebase Firestore.
- It provides endpoints for CRUD operations on image data stored in Firebase Firestore and offers the capability to shorten image URLs using the Shareaholic API. 
- The API is secured with Firebase Authentication and uses Firebase Admin SDK to interact with Firestore.

# Installation

1. Clone the repository
```bash
git clone
```
2. Install dependencies
```bash
npm install
```
3. create a `credentials.json` file in the root directory and add the following content
```json
{
    "type": "service_account",
    "project_id": "your_project_id",
    "private_key_id": "your_private_key_id",
    "private key": "your private key",
    "client_email": "your_client_email",
    "client_id": "your_client_id",
    "auth_uri": "your_auth_uri",
    "token_uri": "your_token_uri",
    "auth_provider_x509_cert_url": "your_auth_provider_x509_cert_url",
    "client_x509_cert_url": "your_client_x509_cert_url"
}
```
4. Start the server
```bash
npm start
```



# Features
- **User Authentication**: The API uses Firebase Authentication to authenticate users and secure the endpoints.
- **CRUD Operations**: The API provides endpoints for creating, reading, updating, and deleting image data in Firestore.
- **Shorten Image URLs**: The API uses the Shareaholic API to shorten image URLs and make them easier to share.
- **Error Handling**: The API handles errors gracefully and returns appropriate error messages to the client.
- **Api Documentation**: The API documentation is available at `/api-docs` using Swagger UI.
