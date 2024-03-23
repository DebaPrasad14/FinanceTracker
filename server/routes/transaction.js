const {
    addExpense,
    getExpense,
    deleteExpense,
    updateExpense,
} = require("../controllers/expense");
const {
    addIncome,
    getIncome,
    deleteIncome,
    updateIncome,
} = require("../controllers/income");
const {
    signUp,
    signIn,
    forgotPassword,
    resetPassword,
    verifyUser,
    signOut,
} = require("../controllers/user");

const router = require("express").Router();

router
    .post("/add-income", addIncome)
    .get("/get-incomes", getIncome)
    .delete("/delete-income/:id", deleteIncome)
    .patch("/update-income", updateIncome)
    .post("/add-expense", addExpense)
    .get("/get-expenses", getExpense)
    .delete("/delete-expense/:id", deleteExpense)
    .patch("/update-expense", updateExpense)
    .post("/signup", signUp)
    .post("/signin", signIn)
    .post("/forgot-password", forgotPassword)
    .post("/reset-password/:token", resetPassword)
    .get("/verify", verifyUser)
    .get("/signout", signOut);

module.exports = router;
