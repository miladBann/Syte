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
exports.Catalog = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const locale_entity_1 = require("./locale.entity");
let Catalog = class Catalog {
};
exports.Catalog = Catalog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Catalog.prototype, "catalog_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.catalogs, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Catalog.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Catalog.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['fashion', 'home', 'general'] }),
    __metadata("design:type", String)
], Catalog.prototype, "vertical", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Catalog.prototype, "is_primary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Catalog.prototype, "indexed_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => locale_entity_1.Locale, (locale) => locale.catalog, { cascade: true }),
    __metadata("design:type", Array)
], Catalog.prototype, "locales", void 0);
exports.Catalog = Catalog = __decorate([
    (0, typeorm_1.Entity)('catalogs')
], Catalog);
//# sourceMappingURL=catalog.entity.js.map