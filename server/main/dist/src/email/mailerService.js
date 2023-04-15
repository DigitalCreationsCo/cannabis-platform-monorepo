"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailerService = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
// import { Injectable, Logger } from '@nestjs/common';
// import { compile } from 'handlebars';
// import mjml2html from 'mjml';
// import { readFileSync } from 'node:fs';
// import * as nodemailer from 'nodemailer';
// import SMTPTransport from 'nodemailer/lib/smtp-transport';
// import appConfig from '../config/app.config';
// export enum EmailTemplates {
// 	VERIFY_USER = 'verify-user.mjml',
// 	RESET_PASSWORD = 'reset-password.mjml'
// }
// export interface IEmailVariables {
// 	link?: string;
// }
// @Injectable()
var MailerService = /*#__PURE__*/_createClass(function MailerService() {
  _classCallCheck(this, MailerService);
});
exports.MailerService = MailerService;