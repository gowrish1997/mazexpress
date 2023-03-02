"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseEntity = exports.City = void 0;
var typeorm_1 = require("typeorm");
var City;
(function (City) {
    City["B"] = "benghazi";
    City["T"] = "tripoli";
    City["M"] = "misrata";
})(City = exports.City || (exports.City = {}));
var WarehouseEntity = /** @class */ (function () {
    function WarehouseEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], WarehouseEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], WarehouseEntity.prototype, "address_1", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], WarehouseEntity.prototype, "address_2", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: City, default: City.T }),
        __metadata("design:type", String)
    ], WarehouseEntity.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", default: "Libya" }),
        __metadata("design:type", String)
    ], WarehouseEntity.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, default: null }),
        __metadata("design:type", Object)
    ], WarehouseEntity.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], WarehouseEntity.prototype, "tag", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], WarehouseEntity.prototype, "status", void 0);
    WarehouseEntity = __decorate([
        (0, typeorm_1.Entity)({ name: "warehouses" })
    ], WarehouseEntity);
    return WarehouseEntity;
}());
exports.WarehouseEntity = WarehouseEntity;
