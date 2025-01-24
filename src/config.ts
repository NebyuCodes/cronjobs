import path from "path";
// Dotenv
import { config } from "dotenv";
config();

export default {
  env: <string>process.env.NODE_ENV,
  db: {
    remote: <string>process.env.DB_REMOTE,
  },
  api_key: <string>process.env.API_KEY,
  delete_key: <string>process.env.DELETE_KEY,
  jwt: {
    expiresin: process.env.JWT_EXPIRESIN as string,
    secret: process.env.JWT_SECRET as string,
  },
  cloudinary: {
    cloud_name: <string>process.env.CLOUDINARY_CLOUD_NAME,
    secret: <string>process.env.CLOUDINARY_API_SECRET,
    api_key: <string>process.env.CLOUDINARY_API_KEY,
  },
  email: {
    user: <string>process.env.EMAIL_USER,
    host: <string>process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT as unknown as number,
    password: <string>process.env.EMAIL_PASSWORD,
  },
};
