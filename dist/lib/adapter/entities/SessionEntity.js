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
exports.SessionEntity = void 0;
var transformer_1 = require("../transformer");
var typeorm_1 = require("typeorm");
var UserEntity_1 = require("./UserEntity");
var SessionEntity = /** @class */ (function () {
    function SessionEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], SessionEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", unique: true }),
        __metadata("design:type", String)
    ], SessionEntity.prototype, "session_token", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "uuid" }),
        __metadata("design:type", String)
    ], SessionEntity.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", transformer: transformer_1.transformer.date }),
        __metadata("design:type", String)
    ], SessionEntity.prototype, "expires", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return UserEntity_1.UserEntity; }, function (user) { return user.sessions; }),
        __metadata("design:type", Object)
    ], SessionEntity.prototype, "user", void 0);
    SessionEntity = __decorate([
        (0, typeorm_1.Entity)({ name: "sessions" })
    ], SessionEntity);
    return SessionEntity;
}());
exports.SessionEntity = SessionEntity;
