"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformer = void 0;
var transformer = {
    date: {
        from: function (date) { return date && new Date(parseInt(date, 10)); },
        to: function (date) { return date === null || date === void 0 ? void 0 : date.valueOf().toString(); },
    },
    bigint: {
        from: function (bigInt) { return bigInt && parseInt(bigInt, 10); },
        to: function (bigInt) { return bigInt === null || bigInt === void 0 ? void 0 : bigInt.toString(); },
    },
};
exports.transformer = transformer;
