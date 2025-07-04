import Contact from "../models/contactModel.js"


export const createContacts = async (req , res)=>{
    try{
        const {name , phone} = req.body;
        const userID = req.user.id
        const newContact = new Contact({
            userID,
            name ,
            phone
        });

        await newContact.save();

        res.status(201).json({message : 'contact created succesfully'})
    }catch(error){
        res.status(500).json({message : 'failed to create contact'})
    }
}

export const getContacts = async (req , res)=>{
    try{
        const contacts = await Contact.find({userID: req.user.id});
        res.status(200).json(contacts);
        console.log(req.user)
    }catch(error){
        res.status(500).json({message : 'unable to find contacts'});
    }
}

export const updateContacts = (req , res)=>{
    res.json({message : "hello there"})
}

export const deleteContacts = async (req , res)=>{
    try {
        const { id } = req.params;
        
        // Find the contact
        const contact = await Contact.findById(id);
        
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        
        // Verify the contact belongs to the requesting user
        if (contact.userID !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this contact' });
        }
        
        // Delete the contact
        await Contact.findByIdAndDelete(id);
        
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Failed to delete contact' });
    }
}

