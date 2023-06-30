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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const track_schema_1 = require("./schemas/track.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
const file_services_1 = require("../file/file.services");
let TrackService = exports.TrackService = class TrackService {
    constructor(trackModel, commentModel, fileServices) {
        this.trackModel = trackModel;
        this.commentModel = commentModel;
        this.fileServices = fileServices;
    }
    async create(dto, picture, audio) {
        const audioPath = this.fileServices.createFiles(file_services_1.FileType.AUDIO, audio[0]);
        const picturePath = this.fileServices.createFiles(file_services_1.FileType.IMAGE, picture[0]);
        const track = await this.trackModel.create(Object.assign(Object.assign({}, dto), { listens: 0, audio: audioPath, picture: picturePath }));
        return track;
    }
    async getAll(count = 10, offset = 0) {
        const track = await this.trackModel.find().skip(offset).limit(count);
        return track;
    }
    async getOne(id) {
        const track = await this.trackModel.findById(id).populate('comments');
        return track;
    }
    async delete(id) {
        const track = await this.trackModel.findByIdAndRemove(id);
        return track;
    }
    async addComment(dto) {
        const comment = await this.commentModel.create(Object.assign({}, dto));
        const track = await this.trackModel.findByIdAndUpdate(dto.trackId, { $addToSet: { comments: comment } }, { new: true });
        return comment;
    }
    async listen(id) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        track.save();
    }
    async search(query) {
        console.log(query);
        const tracks = await this.trackModel.find({
            name: { $regex: new RegExp(query, 'i') },
        });
        return tracks;
    }
};
exports.TrackService = TrackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(track_schema_1.Track.name)),
    __param(1, (0, mongoose_2.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        file_services_1.FileServices])
], TrackService);
//# sourceMappingURL=track.service.js.map