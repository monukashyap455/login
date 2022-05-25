const blog = require("../model/blog");

module.exports.blogAdd = async (req, res) => {

    const loginUser = req.currentUser
    const files = req.file
    const { title, description, subject } = req.body

    const fsize = files.size;
    const file = Math.round((fsize / 1024));

    if (file >= 2048) {
        return res.send("File too Big, please select a file less than 2mb");

    } if (file < 1024) {
        return res.send("File too small, please select a file greater than 2mb");

    }
    if (files.mimetype !== 'image/png' && files.mimetype !== 'image/jpg' && files.mimetype !== 'image/jpeg') {
        res.send("Supported image files are jpeg, jpg, and png")
    }

    if (title.length <= 3 || title.length >= 11) {
        return res.send("please enter the title vale of min 2 and maximum 10 ")
    }
    if (subject.length <= 11 || title.length >= 21) {
        return res.send("please enter the subject vale of min 10 and maximum 20 ")
    }
    if (description.length <= 51 || title.length >= 101) {
        return res.send("please enter the description vale of min 50 and maximum 100 ")
    }

    const blogData = new blog({
        userId: loginUser._id,
        title: title,
        subject: subject,
        description: description,
        image: files.filename

    })
    await blogData.save();
    res.status(200).send(blogData)
}

exports.blogGet = async (req, res) => {
    try {
        const blogId = req.params.id
        const blogFind = await blog.findOne({ _id: blogId })
        res.status(200).json(blogFind)

    } catch (error) {
        res.send(error)

    }

}