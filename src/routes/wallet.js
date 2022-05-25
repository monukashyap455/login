const router = require("express").Router();
const walletController = require("../controller/wallet");
const verifyToken = require("../middleware/verifyToken");



router.post('/wallet/create', verifyToken, walletController.walletCreate)

router.post('/wallet/active', verifyToken, walletController.walletLogin)

router.post('/amount/add',verifyToken,walletController.amountAdd)

router.post('/pay',verifyToken,walletController.payAmount)

router.get('/transction',verifyToken,walletController.getTransctionHistory)

router.get('/amount/:id',verifyToken,walletController.getAmount)

router.post('')




module.exports = router;