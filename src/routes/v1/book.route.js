const express=require('express');
const {bookController}=require('../../controllers');
const { singleFileUpload } = require("../../helpers/upload");

const router=express.Router();

// create recipe 
router.post("/create-book",
    singleFileUpload("/images", "book_image"),
bookController.createBook
);

// // list book 
router.get("/list-book",
    bookController.getBookList
    );

//     // list book by id
    router.get("/list-book-id",
        bookController.getBookById
        );

        // // list book 
router.get("/list-borrow-return-book",
  bookController.getBookBorrowReturn
  );

    
//         // update book by id
        router.put("/update-book-id",
    singleFileUpload("/images", "book_image"),
            bookController.updateBookProfile
            );

            /* -------------------------- DELTE BOOK ----------- */
router.delete(
    "/delete-book/:bookId",
    // accessToken(),
    bookController.deleteBook
  );
  

module.exports=router;
