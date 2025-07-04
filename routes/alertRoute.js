import express from 'express';
import { getAlert, postAlert, updateAlert } from '../controllers/alertController.js';
const router = express.Router();

router.get("/", getAlert);
router.post("/", postAlert);
router.put("/:id", updateAlert);

export default router;