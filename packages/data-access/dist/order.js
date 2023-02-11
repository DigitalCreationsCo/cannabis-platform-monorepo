"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderWithOrderItems = exports.findOrderWithDetails = exports.findOrdersByOrg = exports.createOrder = void 0;
var prisma_1 = __importDefault(require("./db/prisma"));
function createOrder() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.createOrder = createOrder;
function findOrdersByOrg(organizationId) {
    return __awaiter(this, void 0, void 0, function () {
        var order, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma_1.default.order.findMany({
                            where: { organizationId: organizationId },
                            orderBy: [
                                { updatedAt: 'desc' }
                            ]
                        })];
                case 1:
                    order = (_a.sent()) || [];
                    return [2 /*return*/, order];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1.message);
                    throw new Error(error_1.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findOrdersByOrg = findOrdersByOrg;
function findOrderWithDetails(id) {
    return __awaiter(this, void 0, void 0, function () {
        var order, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma_1.default.order.findUnique({
                            where: { id: id },
                            include: {
                                customer: true,
                                driver: true,
                                deliveryInfo: true,
                                items: { include: { productVariant: { include: { images: true } } } }
                            }
                        })];
                case 1:
                    order = _a.sent();
                    return [2 /*return*/, order];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    throw new Error(error_2);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findOrderWithDetails = findOrderWithDetails;
function updateOrderWithOrderItems(order) {
    return __awaiter(this, void 0, void 0, function () {
        var updateOrderItemsOp, connectOrderItems, id, updateOrderOp, updateOrder, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    updateOrderItemsOp = !!order.items && order.items.map(function (item) {
                        var rest = __rest(item, []);
                        var orderId = order.id;
                        var variantId = item.variantId;
                        var update = prisma_1.default.orderItem.upsert({
                            where: {
                                orderId_variantId: {
                                    orderId: orderId,
                                    variantId: variantId
                                }
                            },
                            create: __assign(__assign({}, rest), { quantity: Number(item.quantity) }),
                            update: __assign(__assign({}, rest), { quantity: Number(item.quantity) })
                        });
                        return update;
                    });
                    connectOrderItems = !!order.items && order.items.map(function (item) { return ({
                        variantId: item.variantId,
                        orderId: order.id
                    }); }) || [];
                    delete order['items'];
                    id = order.id;
                    updateOrderOp = prisma_1.default.order.update({
                        where: { id: id },
                        data: __assign(__assign({}, order), { items: {
                                connect: connectOrderItems
                            } }),
                    });
                    return [4 /*yield*/, prisma_1.default.$transaction(__spreadArray([], updateOrderItemsOp, true))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_1.default.$transaction([updateOrderOp])];
                case 2:
                    updateOrder = _a.sent();
                    return [2 /*return*/, updateOrder[0]];
                case 3:
                    error_3 = _a.sent();
                    console.error('error: ', error_3);
                    throw new Error(error_3);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateOrderWithOrderItems = updateOrderWithOrderItems;
function deleteOrder() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.deleteOrder = deleteOrder;
