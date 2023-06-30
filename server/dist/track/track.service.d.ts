import { Track, TrackDocument } from './schemas/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment-dto';
import { FileServices } from 'src/file/file.services';
export declare class TrackService {
    private trackModel;
    private commentModel;
    private fileServices;
    constructor(trackModel: Model<TrackDocument>, commentModel: Model<CommentDocument>, fileServices: FileServices);
    create(dto: CreateTrackDto, picture: any, audio: any): Promise<Track>;
    getAll(count?: number, offset?: number): Promise<Track[]>;
    getOne(id: ObjectId): Promise<Track>;
    delete(id: ObjectId): Promise<Track>;
    addComment(dto: CreateCommentDto): Promise<Comment>;
    listen(id: ObjectId): Promise<void>;
    search(query: string): Promise<Track[]>;
}
