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
exports.TrackingEntity = void 0;
var OrderEntity_1 = require("@/lib/adapter/entities/OrderEntity");
var UserEntity_1 = require("@/lib/adapter/entities/UserEntity");
var typeorm_1 = require("typeorm");
var TrackingEntity = /** @class */ (function () {
    function TrackingEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], TrackingEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "int" }),
        __metadata("design:type", Number)
    ], TrackingEntity.prototype, "stage", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], TrackingEntity.prototype, "created_on", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return UserEntity_1.UserEntity; }, function (user) { return user.tracking; }, {
            createForeignKeyConstraints: true,
            eager: true
        }),
        __metadata("design:type", Object)
    ], TrackingEntity.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return OrderEntity_1.OrderEntity; }, function (order) { return order.tracking; }, {
            createForeignKeyConstraints: true,
            eager: true
        }),
        __metadata("design:type", Object)
    ], TrackingEntity.prototype, "order", void 0);
    TrackingEntity = __decorate([
        (0, typeorm_1.Entity)({ name: "tracking" })
    ], TrackingEntity);
    return TrackingEntity;
}());
exports.TrackingEntity = TrackingEntity;
