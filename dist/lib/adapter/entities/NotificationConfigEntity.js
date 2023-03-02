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
exports.NotificationConfigEntity = void 0;
var typeorm_1 = require("typeorm");
var NotificationConfigEntity = /** @class */ (function () {
    function NotificationConfigEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], NotificationConfigEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], NotificationConfigEntity.prototype, "created_on", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], NotificationConfigEntity.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], NotificationConfigEntity.prototype, "desc", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], NotificationConfigEntity.prototype, "is_enabled", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], NotificationConfigEntity.prototype, "is_custom", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false }),
        __metadata("design:type", Boolean)
    ], NotificationConfigEntity.prototype, "is_reusable", void 0);
    NotificationConfigEntity = __decorate([
        (0, typeorm_1.Entity)({ name: "notification_config" })
    ], NotificationConfigEntity);
    return NotificationConfigEntity;
}());
exports.NotificationConfigEntity = NotificationConfigEntity;
