import express from 'express'
import { getContacts, createContacts, updateContacts, deleteContacts } from '../controllers/contactController.js';
const router = express.Router();

router.get("/", getContacts);
router.post("/", createContacts);
router.put("/", updateContacts);
router.delete("/:id", deleteContacts);

export default router;