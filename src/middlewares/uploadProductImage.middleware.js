import multer from "multer";
import path from 'path'

import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/products"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadProductImage = multer({
  storage: storage,
});

export { uploadProductImage };
