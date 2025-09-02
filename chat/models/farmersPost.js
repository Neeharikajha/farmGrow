import mongoose from "mongoose";

const farmersPostSchema = new mongoose.Schema({
  farmerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "AuthDetails", // links to your Auth model
    required: true 
  },
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  totalQuantity: { type: Number, required: true },
  price: { type: Number, required: true },
  offeredQuantity: { type: Number, required: true },
  available: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("FarmersPost", farmersPostSchema);
