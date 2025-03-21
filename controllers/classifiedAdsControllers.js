import { AdvertModel } from "../models/classifiedAds.js";
import { addClassifiedAdValidator } from "../validators/classifiedAds.js";

export const addClassifiedAd = async (req, res, next) => {
  try {
    console.log(req.body);
    // validate classified ad information
    const { error, value } = addClassifiedAdValidator.validate({
      ...req.body,
      pictures: req.files?.map((file) => {
        return file.filename;
      }),
    }, {abortEarly:false});
    if (error) {
      return res.status(422).json(error);
    }
    // save classified ad information in database
    const result = await AdvertModel.create(value); 
    // return response
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllAds = async(req, res, next) => {
    try {
      const {filter = "{}", sort = "{}" } = req.query;
      // Fetch classified ads from database
      const result = await AdvertModel
        .find(JSON.parse(filter))
        .sort(JSON.parse(sort));
      // Return response
      res.json(result);
    } catch (error) {
      next(error);
    }
};
  
export const getAdById = async(req, res, next) => {
    try {
      // Fetch classified ad by id from database
      const result = await AdvertModel.findById(req.params.id);
      // Return response
      res.json(result);
    } catch (error) {
      next(error);
    }
};

export const updateAd = async (req, res, next) => {
    try {
      const result = await AdvertModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!result) {
        return res.status(404).json({ message: 'Advert not found' });
      }
      res.status(201).json(result `Advert ${result.title} updated!`); 
    }
    catch (error) {
      next(error);
    }
};
  
export const deleteAd = async(req, res, next) => {
    try {
        const deletedAd = await AdvertModel.findByIdAndDelete(req.params.id);
        if (!deletedAd) {
            return res.status(404).json({ message: 'Advert not found' });
        }
        res.status(200).json({ message: `${deletedAd.title} deleted!`}); 
    } catch (error) {
        next(error);
    }
};
