import popupForm from '../model/popupForm.js';

export const createPopupForm = async (req, res) => {
    const { name, email, phoneNumber, message } = req.body;
    try {
        const newPopupForm = await popupForm.create({
            name,
            email,
            phoneNumber,
            message
        });
        res.status(201).json(newPopupForm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPopupForms = async (req, res) => {
    try {
        const popupForms = await popupForm.find();
        res.status(200).json(popupForms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPopupFormById = async (req, res) => {
    const { id } = req.params; // Destructuring is cleaner
    try {
        const popupFormData = await popupForm.findById(id);
        if (!popupFormData) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json(popupFormData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};