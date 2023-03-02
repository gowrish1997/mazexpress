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
exports.NotificationEntity = exports.NotificationStatus = void 0;
var typeorm_1 = require("typeorm");
var UserEntity_1 = require("@/lib/adapter/entities/UserEntity");
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["DL"] = "deleted";
    NotificationStatus["RD"] = "read";
    NotificationStatus["UN"] = "unread";
})(NotificationStatus = exports.NotificationStatus || (exports.NotificationStatus = {}));
var NotificationEntity = /** @class */ (function () {
    function NotificationEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], NotificationEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], NotificationEntity.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], NotificationEntity.prototype, "created_on", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: NotificationStatus,
            default: NotificationStatus.UN,
        }),
        __metadata("design:type", String)
    ], NotificationEntity.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp", nullable: true, default: null }),
        __metadata("design:type", String)
    ], NotificationEntity.prototype, "read_on", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], NotificationEntity.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return UserEntity_1.UserEntity; }, function (user) { return user.notifications; }),
        __metadata("design:type", Object)
    ], NotificationEntity.prototype, "users", void 0);
    NotificationEntity = __decorate([
        (0, typeorm_1.Entity)({ name: "notifications" })
    ], NotificationEntity);
    return NotificationEntity;
}());
exports.NotificationEntity = NotificationEntity;
