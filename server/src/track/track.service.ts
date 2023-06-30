import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from './schemas/track.schema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment-dto';
import { FileServices, FileType } from 'src/file/file.services';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileServices: FileServices,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileServices.createFiles(FileType.AUDIO, audio[0]);
    const picturePath = this.fileServices.createFiles(
      FileType.IMAGE,
      picture[0],
    );
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const track = await this.trackModel.find().skip(offset).limit(count);
    return track;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findByIdAndRemove(id);
    return track;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentModel.create({ ...dto });
    const track = await this.trackModel.findByIdAndUpdate(
      dto.trackId,
      { $addToSet: { comments: comment } },
      { new: true },
    );
    return comment;
  }
  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

  async search(query: string): Promise<Track[]> {
    console.log(query);
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
}
