require('dotenv').config();

module.exports = {
    port_no: process.env.port_no,
    mongoDB_url: process.env.mongoDB_url,
    google_client_id: process.env.google_client_id,
    google_client_secret: process.env.google_client_secret,
    redirect_url: process.env.redirect_url,
    json_secret: process.env.json_secret,
    json_refresh_secret: process.env.json_refresh_secret,
    paystack_public_key: process.env.paystack_public_key,
    paystack_secret_key: process.env.paystack_secret_key,
    cloudinary_api_key: process.env.cloudinary_api_key,
    cloudinary_api_secret: process.env.cloudinary_api_secret,
    cloudinary_name: process.env.cloudinary_name
}