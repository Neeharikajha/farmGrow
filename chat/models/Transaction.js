import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,   // farmer's userId
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    productCount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Transaction", transactionSchema);
