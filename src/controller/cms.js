const cms = require("../model/cms");


//cms create controller
module.exports.cmsCreate = async (req, res) => {
    try {

        const { favicon_icon, title, web_icon, slider_image, slider_heading, slider_subheading, footer_icon, footer, copyright } = req.body
        const cmsDb = new cms({
            favicon_icon,
            title,
            web_icon,
            slider_heading,
            slider_image: req.file.filename,
            slider_subheading,
            footer_icon,
            footer,
            copyright,
        })
        console.log(req.file.filename);
        console.log(cmsDb);
        const data = await cmsDb.save()
        res.status(200).json("Created")

    } catch (error) {
        res.send(error)

    }
}
//cmc update controller 
module.exports.cmsUpdate = async (req, res) => {
    try {

        const cmsId = req.params.id
        req.body.updatedAt = Date.now()
        req.body.slider_Image = req.file.filename
    
        const updated = await cms.findOneAndUpdate({ _id: cmsId }, { $set: req.body })
        if (!updated) {
            return res.status(404).json("updated fail")
        }
        res.status(200).json({
            message: 'cmsData has been updated',
            data: updated
        })
    } catch (error) {
        res.send(error)
    }
}


