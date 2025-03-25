import { Schema, model} from "mongoose";
import normalize from "normalize-mongoose";

const classifiedAdsSchema = new Schema({
    title: { 
        type: String,
        required: true,
    },
    pictures: {
        type: [String],
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
        enum: ["Electronics", "Home & Kitchen", "Vehicles", "Real Estate", "Beauty Supplies"],
        required: true
    },
}, {
    timestamps: true
});
classifiedAdsSchema.plugin(normalize)

export const AdvertModel = model('ClassifiedAds', classifiedAdsSchema)
