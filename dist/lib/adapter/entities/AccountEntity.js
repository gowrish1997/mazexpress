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
exports.AccountEntity = void 0;
var typeorm_1 = require("typeorm");
var transformer_1 = require("../transformer");
var UserEntity_1 = require("@/lib/adapter/entities/UserEntity");
var AccountEntity = /** @class */ (function () {
    function AccountEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], AccountEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], AccountEntity.prototype, "created_on", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], AccountEntity.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], AccountEntity.prototype, "provider", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], AccountEntity.prototype, "provider_account_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], AccountEntity.prototype, "refresh_token", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], AccountEntity.prototype, "access_token", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            type: "bigint",
            transformer: transformer_1.transformer.bigint,
        }),
        __metadata("design:type", Object)
    ], AccountEntity.prototype, "expires_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], AccountEntity.prototype, "token_type", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], AccountEntity.prototype, "scope", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], AccountEntity.prototype, "id_token", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], AccountEntity.prototype, "session_state", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], AccountEntity.prototype, "oauth_token_secret", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
        __metadata("design:type", Object)
    ], AccountEntity.prototype, "oauth_token", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return UserEntity_1.UserEntity; }, function (user) { return user.accounts; }, {
            createForeignKeyConstraints: true,
        }),
        __metadata("design:type", Object)
    ], AccountEntity.prototype, "user", void 0);
    AccountEntity = __decorate([
        (0, typeorm_1.Entity)({ name: "accounts" })
    ], AccountEntity);
    return AccountEntity;
}());
exports.AccountEntity = AccountEntity;
