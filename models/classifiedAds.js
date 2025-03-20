import { Schema, model} from "mongoose";
import normalize from "normalize-mongoose";
s
const classifiedAdsSchema = new Schema({
    title: { 
        type: String,
        required: true,
    },
    pictures: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
classifiedAdsSchema.plugin(normalize)

export const AdvertModel = model('ClassifiedAds', classifiedAdsSchema)
