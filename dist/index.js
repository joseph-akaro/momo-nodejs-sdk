"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MomoPay: () => MomoPay
});
module.exports = __toCommonJS(index_exports);
var import_axios = __toESM(require("axios"));
var MomoPay = class {
  environment;
  primarySubscriptionKey;
  secondarySubscriptionKey;
  apiUser;
  callBackUrl;
  constructor(environment, primarySubscriptionKey, secondarySubscriptionKey, apiUser, callBackUrl) {
    this.environment = environment;
    this.primarySubscriptionKey = primarySubscriptionKey;
    this.secondarySubscriptionKey = secondarySubscriptionKey;
    this.apiUser = apiUser;
    this.callBackUrl = callBackUrl;
  }
  async authenticateUser(primarySubscriptionKey, apiUser) {
    this.primarySubscriptionKey = primarySubscriptionKey;
    this.apiUser = apiUser;
    try {
      switch (this.environment) {
        case "sandbox":
          const token = await (0, import_axios.default)(
            {
              url: "https://sandbox.momodeveloper.mtn.com/collection/oauth2/token/",
              data: {
                primarySubscriptionKey,
                apiUser
              }
            }
          ).catch(
            (error) => {
              console.log("Error:", error.message);
            }
          ).then(
            (data) => {
              console.log(data);
            }
          );
        case "production":
        default:
          console.log("No Environment variable provide");
          break;
      }
    } catch (error) {
      throw new Error("Error: failed to complete request!");
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MomoPay
});
