import mongoose, { HydratedDocument } from 'mongoose';
import { Track } from './track.schema';
export type CommentDocument = HydratedDocument<Comment>;
export declare class Comment {
    username: string;
    text: string;
    track: Track;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, mongoose.Document<unknown, any, Comment> & Omit<Comment & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comment>> & Omit<mongoose.FlatRecord<Comment> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
