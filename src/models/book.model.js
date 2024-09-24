const mongoose=require('mongoose');
const bookSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            // required:[true,'Please enter the name of your product']
        },

        author:{type : String},

       genre:{type : String},
       
    //    1-YES 2-NO (IF BOOK AVAILABLE THEN YES AND NOT AVAILABLE THEN NO )
       availability:{type:String},
   
    book_image:{type:String},

    // 1 -Join Waitlist ,2- Read, 3 -  Borrow, 4 - Return
    availability_type:{type:String,default:"2"},

    userid: 
       {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
       },
     
        },
        {timestamps: true},{versionKey: false,
      
        },
);
const Book=mongoose.model("book",bookSchema);
module.exports= Book;