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
exports.UserEntity = exports.UserGender = void 0;
var NotificationEntity_1 = require("./NotificationEntity");
var OrderEntity_1 = require("@/lib/adapter/entities/OrderEntity");
var SessionEntity_1 = require("@/lib/adapter/entities/SessionEntity");
var AccountEntity_1 = require("./AccountEntity");
var AddressEntity_1 = require("./AddressEntity");
var typeorm_1 = require("typeorm");
var typeorm_2 = require("typeorm");
var transformer_1 = require("../transformer");
var TrackingEntity_1 = require("./TrackingEntity");
var UserGender;
(function (UserGender) {
    UserGender["MALE"] = "m";
    UserGender["FEMALE"] = "f";
    UserGender["OTHER"] = "o";
    UserGender["UNKNOWN"] = "u";
})(UserGender = exports.UserGender || (exports.UserGender = {}));
var UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    __decorate([
        (0, typeorm_2.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], UserEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], UserEntity.prototype, "first_name", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], UserEntity.prototype, "created_on", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], UserEntity.prototype, "last_name", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "varchar", unique: true }),
        __metadata("design:type", String)
    ], UserEntity.prototype, "email", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "varchar", nullable: true, transformer: transformer_1.transformer.date }),
        __metadata("design:type", Object)
    ], UserEntity.prototype, "email_verified", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], UserEntity.prototype, "password", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "varchar", default: "default_user.png" }),
        __metadata("design:type", String)
    ], UserEntity.prototype, "avatar_url", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "int", nullable: true, default: null, width: 3 }),
        __metadata("design:type", Object)
    ], UserEntity.prototype, "age", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "int", width: 9, nullable: true, default: null }),
        __metadata("design:type", Number)
    ], UserEntity.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "enum", enum: UserGender, default: UserGender.UNKNOWN }),
        __metadata("design:type", String)
    ], UserEntity.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], UserEntity.prototype, "is_admin", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "boolean", default: true }),
        __metadata("design:type", Boolean)
    ], UserEntity.prototype, "is_notifications_enabled", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: "varchar", nullable: true, default: null }),
        __metadata("design:type", Object)
    ], UserEntity.prototype, "default_address", void 0);
    __decorate([
        (0, typeorm_2.OneToMany)(function () { return SessionEntity_1.SessionEntity; }, function (session) { return session.user; }),
        __metadata("design:type", Array)
    ], UserEntity.prototype, "sessions", void 0);
    __decorate([
        (0, typeorm_2.OneToMany)(function () { return AccountEntity_1.AccountEntity; }, function (account) { return account.user; }),
        __metadata("design:type", Array)
    ], UserEntity.prototype, "accounts", void 0);
    __decorate([
        (0, typeorm_2.OneToMany)(function () { return AddressEntity_1.AddressEntity; }, function (address) { return address.user; }),
        __metadata("design:type", Array)
    ], UserEntity.prototype, "addresses", void 0);
    __decorate([
        (0, typeorm_2.OneToMany)(function () { return OrderEntity_1.OrderEntity; }, function (order) { return order.user; }),
        __metadata("design:type", Array)
    ], UserEntity.prototype, "orders", void 0);
    __decorate([
        (0, typeorm_2.OneToMany)(function () { return TrackingEntity_1.TrackingEntity; }, function (tracking) { return tracking.user; }),
        __metadata("design:type", Array)
    ], UserEntity.prototype, "tracking", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return NotificationEntity_1.NotificationEntity; }, function (notification) { return notification.users; }),
        __metadata("design:type", Array)
    ], UserEntity.prototype, "notifications", void 0);
    UserEntity = __decorate([
        (0, typeorm_2.Entity)({ name: "users" })
    ], UserEntity);
    return UserEntity;
}());
exports.UserEntity = UserEntity;
