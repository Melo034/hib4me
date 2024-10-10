import * as service from '../services/donation_service';
import multer from "multer";
import path from "path";

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export const createDonation = async (req, res) => {
  const body = req.body;
  if (req.file) {
    body.image = `../../public/uploads/${req.file.filename}`;
  }

  try {
    const donation = await service.createDonation(body);
    
    return res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export async function getAllDonations(req, res) {
   try {
      const donation = await service.getAllDonations();
      return res.status(200).json(donation);
   }catch (error) {
      return res.status(500).json({message:error.message});
   }  
   

}

export async function getDonationById(req, res) {
   try {
      const donation = await service.getDonationById(req.params.id);
      return res.status(200).json(donation);
   }catch (error) {
      return res.status(500).json({message:error.message});
   }  
}


export async function updateDonation(req, res) {
   const donation = await service.updateDonation(req.params.id, req.body);
   return res.status(200).json(donation);
}


export async function deleteDonation(req, res) {
   await service.deleteDonation(req.params.id);
   return res.status(204).end();
}