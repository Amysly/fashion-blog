import HeroSection from '../models/herosectionModel.js';
import asyncHandler from "express-async-handler";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const getHerosection = asyncHandler(async (req, res) => {
    const heroSections = await HeroSection.find();
    res.status(200).json(heroSections);
});

const ensureAdmin = (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403);
    throw new Error("You do not have permission to manage hero sections");
  }
};

const createHerosection = asyncHandler(async (req, res) => {
    ensureAdmin(req, res);

  const { title } = req.body;

  if(!title){
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  
     if (!req.file) {
        res.status(400);
        throw new Error('Please upload a hero image')
      }
    
      const result = await uploadToCloudinary(req.file.buffer);
    
      const heroSection = await HeroSection.create({
        title,
        image: result.secure_url,
        user: req.user._id
      });
      res.status(201).json(heroSection);
 })
 const updateHerosection = asyncHandler(async (req, res) => {
    ensureAdmin(req, res);

   const heroSection = await HeroSection.findById(req.params.id);
 
   if (!heroSection) {
     res.status(404);
     throw new Error('Hero section not found');
   }
 
   const { title} = req.body;
 
   if (title) heroSection.title = title;
 
   if (req.file) {
     const result = await uploadToCloudinary(req.file.buffer);
     heroSection.image = result.secure_url;
   }
 
   const updatedHeroSection = await  heroSection.save();
   res.status(200).json(updatedHeroSection);
 });
    
 const deleteHeroSection = asyncHandler(async (req, res) => {
    ensureAdmin(req, res);
   const heroSection = await HeroSection.findById(req.params.id);
 
   if (!heroSection) {
     res.status(404);
     throw new Error('Hero section not found');
   }
 
   await heroSection.deleteOne();
   res.status(200).json({ id: req.params.id });
 });

 export default {
    createHerosection,
    getHerosection,
    updateHerosection,
    deleteHeroSection
 };