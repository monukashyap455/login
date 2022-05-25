const req = require("express/lib/request");
const res = require("express/lib/response");
const transcation = require("../model/transcation");
const wallet = require("../model/userWallet");



module.exports.walletCreate = async (req, res) => {
    try {

        const currentLogin = req.currentUser;

        const walletFind = await wallet.findOne({ userId: currentLogin._id });
        if (walletFind !== null) {
            return res.status(404).json("your wallet account has been already created please login")
        }

        const walletData = new wallet({
            userId: currentLogin._id,
        });

        await walletData.save();

        res.status(200).json("your wallet account has been created ");

    } catch (error) {
        res.send(error);

    }
}

module.exports.walletLogin = async (req, res) => {
    const currentLogin = req.currentUser

    const walletFind = await wallet.findOne({ userId: currentLogin._id })
    console.log(walletFind.status);
    if (walletFind == null) {
        return res.status(404).json("your account not exits please register")
    }

    await wallet.findOneAndUpdate({ userId: currentLogin._id }, {
        $set: {
            status: true,
            updatedAt: Date.now()
        }
    }, { new: true })
    res.status(200).json("your walllet account is active,use this")
}

module.exports.amountAdd = async (req, res) => {
    try {

        const activeUser = req.currentUser
        const amount = req.body.amount
        const reciverId = req.body.reciverId
        // console.log(activeUser);

        const reciverWalletFind = await wallet.findOne({ userId: reciverId })
        // console.log(reciverWalletFind);
        if (reciverWalletFind === null) {
            return res.status(404).json("user wallet not found ")
        }
        console.log(reciverWalletFind.wallet);

        await wallet.findOneAndUpdate({ userId: reciverWalletFind.userId }, {
            $set: {
                wallet: reciverWalletFind.wallet + amount,
                updatedAt: Date.now()
            }
        }, { new: true })

        const transcationData = new transcation({
            userId:activeUser._id,
            amount: amount,
            status: true,
            to: reciverId,
            from: activeUser._id

        })

        await transcationData.save();

        res.status(200).json("amount has benn created ")


    } catch (error) {
        res.status(404).json(error);
    }
}

module.exports.payAmount = async (req, res) => {
    try {

        const activeUser = req.currentUser
        const to = req.body.to
        const amount = req.body.amount

        //current user wallet find 
        const activeUserWallet = await wallet.findOne({ userId: activeUser._id });
        if (activeUserWallet == null) {
            return res.status(404).json("active user wallet account not exits")
        }
        if (activeUserWallet.status == false) {
            return res.status(404).json("your wallet account is not verify please verify the wallet ")
        }

        //to user wallet find 
        const toUserWallet = await wallet.findOne({ userId: to })

        if (toUserWallet == null) {
            return res.status(404).json("to user wallet account not exits")
        }
        if (toUserWallet.status == false) {
            return res.status(404).json("  transcation failed ,from user wallet account not verify ")
        }

        //check user wallet amount 
        if (activeUserWallet.wallet < amount) {
            return res.status(404).json("your account balane is low ")

        }

        const activeUserAmount = activeUserWallet.wallet - amount
        await wallet.findOneAndUpdate({ _id: activeUserWallet._id }, {
            $set: {
                wallet: activeUserAmount,
                updatedAt: Date.now()
            }
        }, { new: true })

        // req.toUserWallet = toUserWallet
        const toUserAmount = toUserWallet.wallet + amount
        await wallet.findOneAndUpdate({ _id: toUserWallet._id }, {
            $set: {
                wallet: toUserAmount,
                updatedAt: Date.now()
            }
        }, { new: true });

        const transcationData = new transcation({
            userId: activeUserWallet.userId,
            amount: amount,
            status: true,
            to: toUserWallet.userId,
            from: activeUserWallet.userId
        })
        transcationData.save();
        req.activeWallet = activeUserWallet


        res.status(200).json("sucess")
        // console.log(activeUserWallet);

    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports.getAmount = async (req, res) => {
    try {
        const activeUser = req.currentUser
        const amountData = await wallet.findOne({ userId: activeUser._id })
        console.log(amountData.wallet);
        res.status(200).json(amountData.wallet)

    } catch (error) {
        res.status(400).json(error)

    }
}

module.exports.getTransctionHistory = async (req, res) => {

    try {
        const activeUser = req.currentUser

        const transcationData = await transcation.find({ userId: activeUser._id })
        console.log(transcationData);
        res.status(200).json(transcationData)

    } catch (error) {
        res.status(400).json(error)

    }
}












