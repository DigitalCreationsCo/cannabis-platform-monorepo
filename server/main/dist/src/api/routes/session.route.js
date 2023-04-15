"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllers = require("../controllers");
var router = (0, _express.Router)();
/* =================================
Session Routes

"/"                 getSession

"/password/reset"   sendPasswordResetTokenEmail

"/password/reset"   doResetPassword

================================= */

router.get('/', function (req, res) {
  try {
    // console.log(' 👋 backend get session here')
    // let sessionData = Session.getSession(req, res);
    // console.log('session data: ', sessionData)

    // console.log('Session available?: ', req.session)
    // return res.status(200).json({
    //     note: "Fetch any data from your application for authenticated user after using verifySession middleware",
    //     session: req.session.getSessionData(),
    //     user: req.session.getUserId(),
    //     accessTokenPayload: req.session.getAccessTokenPayload(),
    // });
    var session = {
      user: {
        username: 'kbarnes',
        firstName: 'Katie',
        lastName: 'Barnes',
        memberships: [{
          organizationId: '2'
        }]
      }
    };
    return res.status(200).json({
      session: session,
      user: session.user
    });
  } catch (error) {
    console.log('API error: ', error);
    res.status(500).json({
      error: error
    });
  }
});
router.route('/password/reset').post(_controllers.sessionCtrl.sendPasswordResetTokenEmail);
router.route('/password/reset/token').post(_controllers.sessionCtrl.doResetPassword);
var _default = router;
exports["default"] = _default;