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
exports.AddressEntity = exports.City = void 0;
var OrderEntity_1 = require("@/lib/adapter/entities/OrderEntity");
var typeorm_1 = require("typeorm");
var UserEntity_1 = require("./UserEntity");
var City;
(function (City) {
    City["B"] = "benghazi";
    City["T"] = "tripoli";
    City["M"] = "misrata";
})(City = exports.City || (exports.City = {}));
var AddressEntity = /** @class */ (function () {
    function AddressEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], AddressEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], AddressEntity.prototype, "address_1", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], AddressEntity.prototype, "address_2", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: City, default: City.T }),
        __metadata("design:type", String)
    ], AddressEntity.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", default: "Libya" }),
        __metadata("design:type", String)
    ], AddressEntity.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, default: null }),
        __metadata("design:type", Object)
    ], AddressEntity.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], AddressEntity.prototype, "tag", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return UserEntity_1.UserEntity; }, function (user) { return user.addresses; }, {
            createForeignKeyConstraints: true,
        }),
        __metadata("design:type", Object)
    ], AddressEntity.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return OrderEntity_1.OrderEntity; }, function (order) { return order.address; }),
        __metadata("design:type", Array)
    ], AddressEntity.prototype, "orders", void 0);
    AddressEntity = __decorate([
        (0, typeorm_1.Entity)({ name: "addresses" })
    ], AddressEntity);
    return AddressEntity;
}());
exports.AddressEntity = AddressEntity;
