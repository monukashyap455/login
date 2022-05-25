const masterRoute = require("express").Router()

const user = require("./user");
const rolesTypes = require("./roleType");
const admin = require("./admin");
const permisssion = require('./permission');
const roleAndPermission = require("./roleAndPermission");
const group = require("./groupType");
const multipleImage = require("./multipleImage");
const wrong = require("../helper/nessoryFunction");
const wallet = require("./wallet");
const blog = require("../routes/blog");



masterRoute.use(user)
masterRoute.use(admin)
masterRoute.use(group)
masterRoute.use(rolesTypes)
masterRoute.use(permisssion)
masterRoute.use(roleAndPermission)
masterRoute.use(multipleImage)
masterRoute.use(wallet)
masterRoute.use(blog)


masterRoute.use(wrong.wrongUrl)




module.exports = masterRoute;