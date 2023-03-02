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
exports.OrderEntity = exports.OrderStatus = void 0;
var AddressEntity_1 = require("@/lib/adapter/entities/AddressEntity");
var typeorm_1 = require("typeorm");
var UserEntity_1 = require("@/lib/adapter/entities/UserEntity");
var TrackingEntity_1 = require("./TrackingEntity");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["I"] = "in-transit";
    OrderStatus["D"] = "delivered";
    OrderStatus["A"] = "at-warehouse";
    OrderStatus["P"] = "pending";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var OrderEntity = /** @class */ (function () {
    function OrderEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], OrderEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid" }),
        __metadata("design:type", String)
    ], OrderEntity.prototype, "maz_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid" }),
        __metadata("design:type", String)
    ], OrderEntity.prototype, "reference_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int", nullable: true, default: null }),
        __metadata("design:type", Number)
    ], OrderEntity.prototype, "shipping_amt", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], OrderEntity.prototype, "created_on", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true, default: null }),
        __metadata("design:type", Date)
    ], OrderEntity.prototype, "shipped_on", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true, default: null }),
        __metadata("design:type", Date)
    ], OrderEntity.prototype, "delivered_on", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true, default: null }),
        __metadata("design:type", Date)
    ], OrderEntity.prototype, "received_on", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: OrderStatus, default: OrderStatus.P }),
        __metadata("design:type", String)
    ], OrderEntity.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], OrderEntity.prototype, "store_link", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return UserEntity_1.UserEntity; }, function (user) { return user.orders; }, {
            createForeignKeyConstraints: true,
            eager: true
        }),
        __metadata("design:type", Object)
    ], OrderEntity.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return AddressEntity_1.AddressEntity; }, function (address) { return address.orders; }, {
            createForeignKeyConstraints: true,
            eager: true
        }),
        __metadata("design:type", Object)
    ], OrderEntity.prototype, "address", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return TrackingEntity_1.TrackingEntity; }, function (tracking) { return tracking.order; }),
        __metadata("design:type", Array)
    ], OrderEntity.prototype, "tracking", void 0);
    OrderEntity = __decorate([
        (0, typeorm_1.Entity)({ name: "orders" })
    ], OrderEntity);
    return OrderEntity;
}());
exports.OrderEntity = OrderEntity;
