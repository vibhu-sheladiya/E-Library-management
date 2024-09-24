const { Book } = require("../models");
const { bookService } = require("../services");
const deleteFiles =require("../helpers/deletefile");
const path = require("path");
const fs = require("fs");

/** create recipe*/  
const createBook = async (req, res) => {
  try {
    const reqBody = req.body;

    if (req.file) {
      reqBody.book_image = req.file.filename;
    } else {
      throw new Error("book_image image is required!");
    }

    const book = await bookService.createBookServices(reqBody);

    res.status(200).json({
      success: true,
      message: "book is created successfully!",
      data: book,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};


const updateBookProfile = async (req, res) => {
  try {
    const reqbody = req.body;

    // Find the book first to check if the book exists and to get the old image path
    const book = await Book.findById(reqbody.bookId);
    
    if (!book) {
      return res.status(404).json({ status: 404, success: false, message: "Book not found!" });
    }

    // If a new file is uploaded, delete the old image if it exists
    if (req.file) {
      if (book.book_image) {
        const imagePath = path.join(__dirname, "/../../../public/images", book.book_image);
        console.log(imagePath, "imagePath imagePath");

        // Check if the file exists and delete it
        if (fs.existsSync(imagePath)) {
          try {
            fs.unlinkSync(imagePath);  // Remove the old image
          } catch (error) {
            return res.status(500).json({ success: false, message: "Error deleting old image", error: error.message });
          }
        }
      }

      // Set the new file name for the image
      reqbody.book_image = req.file.filename;
    }

    // Update book data in the database
    const updatedBook = await Book.findByIdAndUpdate(
      reqbody.bookId,
      { $set: reqbody },
      { new: true }  // Return the updated document
    );

    if (!updatedBook) {
      return res.status(404).json({ status: 404, success: false, message: `Book with id ${reqbody.bookId} not found` });
    }

    // Respond with the updated book data
    res.status(200).json({
      status: 200,
      success: true,
      updateData: updatedBook,
      message: "Book profile updated successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookData = await Book.findById(req.params.bookId);

    if (!bookData) {
      return res.status(404).json({status:404,success:false, message: "book Data not found" });
    }
    const DeletedData = await Book.findByIdAndDelete(req.params.bookId, req.body, {
      new: true,
    });

    deleteFiles("images/" + bookData.book_image);

    res.status(200).json({
      status: 200,
      success: true,
      message: "List of delete book of Data successfully ",
      user: DeletedData,
    });

  } catch (error) {
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

  // /** Get book list */
  const getBookList = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json({
      success: true,
       book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }  
  };


  //   /** Get book by id list */
  const getBookById = async (req, res) => {
    // Extract bookId from req.body
    const { bookId } = req.body; // Destructure bookId from the request body
    
    try {
      const book = await Book.findById(bookId);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "book not found.",
        });
      }
      
      res.status(200).json({
        success: true,
        data: book,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

     
  
  /** Get book borrow and return users list, filtered by availability_type (e.g., "borrow" or "return")  */ 
  const getBookBorrowReturn = async (req, res) => {
    try {
      // Get availability_type from request query (e.g., req.query.availbility_type)
      const { availability_type } = req.body;  // Assuming it's coming in the request body
      
      // Validate input: make sure availbility_type is provided
      if (!availability_type == "3"||!availability_type == "4" ) {
        return res.status(400).json({ 
          status: 400, 
          success: false, 
          message: 'Please provide an availbility_type (e.g., "borrow" or "return")' 
        });
      }
  
      // Fetch records based on the availbility_type
      const borrowReturnList = await Book.find({ availability_type })
        .populate('userid', 'name email')  // Populate user info (adjust fields as needed)
        // .populate('bookId', 'title author')  // Populate book info (adjust fields as needed)
        .exec();
  
      // Check if any records were found
      if (!borrowReturnList || borrowReturnList.length === 0) {
        return res.status(404).json({ 
          status: 404, 
          success: false, 
          message: `No ${availability_type} records found.` 
        });
      }
  
      // Return the filtered list of borrow/return events
      res.status(200).json({
        status: 200,
        success: true,
        data: borrowReturnList,
      });
  
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: error.message || 'Error retrieving borrow/return data',
      });
    }
  };
  

  


  module.exports = {
    // addRecipe,getRecipeList,getRecipeById,updateRecipe,deleteRecipeById
    createBook,updateBookProfile,deleteBook,getBookList,getBookById,getBookBorrowReturn

  };