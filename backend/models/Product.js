const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
   
    category: {
      type: mongoose.Schema.Types.ObjectId, //ilişkili veri tabanı
      ref: "Category", //nerden alıcagımızı soyledık
      required: true,
    },

  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;