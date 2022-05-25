const nfts = require("../model/multipleImage");


//multiple image  upload 
module.exports.multipleImageAdd = async (req, res,) => {
    try {

        let image = req.files;
        let imgArr = []

        image.forEach((array) => {
            const imageFile = array.filename;
            imgArr.push(imageFile);
        });

        const loginUserId = req.currentUser._id

        const imageData = nfts({
            userId: loginUserId,
            title: req.body.title,
            description: req.body.description,
            image: imgArr
        })
        await imageData.save()
        res.status(200).json(imageData)
    } catch (error) {
        res.send(error)
    }
}
// multiple image get 
module.exports.getMultipleImage = async (req, res) => {
    try {
        const loginUserId = req.currentUser._id

        const getMultipleImageDb = await nfts.find({ userId: loginUserId });

        res.status(200).json({
            data: getMultipleImageDb
        });
    } catch (error) {
        res.send(error)
    }
}
//update multiple image 
module.exports.updateMultipleImage = async (req, res,) => {
    try {
        const img = req.params.img - 1;

        const loginUserId = req.currentUser._id

        const data = await nfts.findOne({ userId: loginUserId });

        data.image[img] = req.file.filename;

        await data.save();

        res.status(200).json("updated")

    } catch (error) {
        res.send(error)
    }
}
// delete multiple image 
module.exports.deleteMultipleImage = async (req, res,) => {
    try {
        const img = req.params.img - 1

        const loginUserId = req.currentUser._id

        const userImageFind = await nfts.findOne({ userId: loginUserId })

        userImageFind.image = userImageFind.image.filter((image) => {
            let x = image != userImageFind.image[img]
            return x
        })

        await userImageFind.save();
        res.status(200).json(userImageFind)


    } catch (error) {
        res.send(error)
    }
}



