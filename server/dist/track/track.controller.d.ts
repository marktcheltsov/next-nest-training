import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment-dto';
export declare class TrackController {
    private TrackService;
    constructor(TrackService: TrackService);
    create(files: any, dto: CreateTrackDto): Promise<import("./schemas/track.schema").Track>;
    getAll(count: number, offset: number): Promise<import("./schemas/track.schema").Track[]>;
    search(query: string): Promise<import("./schemas/track.schema").Track[]>;
    getOne(id: ObjectId): Promise<import("./schemas/track.schema").Track>;
    delete(id: ObjectId): Promise<import("./schemas/track.schema").Track>;
    addComment(dto: CreateCommentDto): Promise<import("./schemas/comment.schema").Comment>;
    listen(id: ObjectId): Promise<void>;
}
