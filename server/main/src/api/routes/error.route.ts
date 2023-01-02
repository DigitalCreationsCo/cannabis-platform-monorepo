import { Router } from "express";
import { orgCtrl } from "../controllers";
const router = Router();
/* =================================
Error Handling Test Routes

"/badParam/:id"     Bad Query Parameter
"/500"              500 Response Error
"/200WithError"     200 Response With Error
"/200"              200 Ok

================================= */
router.route("/badParam/:id").get((req, res) => {
    res.status(404).json("Bad query parameter.");
})
router.route("/500").get((req, res) => {
    res.status(500).json("An error occurred.");
});
router.route("/200WithError").get((req, res) => {
    res.status(200).json("An error occurred.");
})
router.route("/200").get((req, res) => {
    res.status(200).json("ok");
})

export default router;
