import User from "../models/userModel.js"
import Alert from "../models/alertModel.js"
import Contact from "../models/contactModel.js";


export const getAlert = async(req , res) => {
    try{

        const alertCreatorChecker = await Alert.find({userID : req.user.id});

        if(alertCreatorChecker.length > 0){
            return res.status(200).json(alertCreatorChecker)
        }

        const alertChecker = await Alert.find({contacts : req.user.id});

        if(alertChecker.length > 0){
            console.log(alertChecker);
            return res.status(200).json(alertChecker)
        }

        res.status(200).json({message : "no alerts found"});
    }catch(error){
        res.status(401).json({message : 'alert search failed'})
    }
}

export const postAlert = async(req , res) => {
    try{
        const {message, tags, specificContact, location} = req.body;
        const contactIDs = [];
        
        // If a specific contact ID is provided, only send to that contact
        if (specificContact) {
            try {
                const contact = await Contact.findById(specificContact);
                if (contact && contact.userID === req.user.id) {
                    // Verify contact belongs to the user
                    const contactUser = await User.findOne({ phone: contact.phone });
                    if (contactUser) {
                        contactIDs.push(contactUser.id);
                    }
                }
            } catch (error) {
                console.error("Error finding specific contact:", error);
            }
        } 
        // Otherwise, send to all contacts
        else {
            const contacts = await Contact.find({userID: req.user.id});
            for (const contact of contacts) {
                const cleanPhone = contact.phone;
                const user = await User.findOne({ phone: cleanPhone });
                if (user) {
                    contactIDs.push(user.id); 
                }
            }
        }
        
        const alertData = {
            userID: req.user.id,
            name: req.user.name,
            message,
            tags,
            contacts: contactIDs
        };
        
        // Add location if provided
        if (location && location.latitude && location.longitude) {
            alertData.location = {
                latitude: location.latitude,
                longitude: location.longitude
            };
        }
        
        const newAlert = new Alert(alertData);
        
        await newAlert.save();
        res.status(201).json({message : 'alert created successfully'})
    } catch(error) {
        console.error("Error creating alert:", error);
        res.status(401).json({message : 'alert creation failed'})
    }
}

export const updateAlert = async(req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Verify the alert exists and belongs to the requesting user
        const alert = await Alert.findById(id);
        
        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }
        
        if (alert.userID !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this alert' });
        }
        
        // Update the alert status
        alert.status = status;
        await alert.save();
        
        res.status(200).json({ message: 'Alert status updated successfully', alert });
    } catch (error) {
        console.error('Error updating alert:', error);
        res.status(500).json({ message: 'Failed to update alert status' });
    }
}