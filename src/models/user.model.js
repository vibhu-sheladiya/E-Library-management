const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },password:{
        type :String,
    },
    token: {
      type: String,
    },
    refreshToken: { type: String },
    fcm_token: {
      type: String,
      default: "",
    },
    is_active:{
        type:Boolean,
        default:true,
    },

    
    // bookid: 
    //    {
    //      type: mongoose.Schema.Types.ObjectId,
    //      ref: 'book',
    //    },
  },

  { timestamps: true }
);

const User=mongoose.model("user",userScheme);
module.exports= User;

