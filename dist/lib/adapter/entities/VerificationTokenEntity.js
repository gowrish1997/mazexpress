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
exports.VerificationTokenEntity = void 0;
var transformer_1 = require("../transformer");
var typeorm_1 = require("typeorm");
var VerificationTokenEntity = /** @class */ (function () {
    function VerificationTokenEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], VerificationTokenEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], VerificationTokenEntity.prototype, "token", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar" }),
        __metadata("design:type", String)
    ], VerificationTokenEntity.prototype, "identifier", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", transformer: transformer_1.transformer.date }),
        __metadata("design:type", String)
    ], VerificationTokenEntity.prototype, "expires", void 0);
    VerificationTokenEntity = __decorate([
        (0, typeorm_1.Entity)({ name: "verification_tokens" })
    ], VerificationTokenEntity);
    return VerificationTokenEntity;
}());
exports.VerificationTokenEntity = VerificationTokenEntity;
