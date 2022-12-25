import { Router } from "express"
import vendorsCtrl from "./vendors.controller"
import usersCtrl from "./users.controller"

//geolocation lat and lon of vendors by zipcode
//router.route("/:zipcode").get(vendorsCtrl.apiGetVendorsByZipCode)