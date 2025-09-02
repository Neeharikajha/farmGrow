import mongoose from "mongoose";

const farmerListingSchema = new mongoose.Schema({
    userId: {
        type: String,   // storing userId as string (like senderId in Message)
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true   // URL or path to the image
    },
    price: {
        type: Number,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    quantityOffered: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("FarmerListing", farmerListingSchema);
