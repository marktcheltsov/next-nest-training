/// <reference types="multer" />
export declare enum FileType {
    AUDIO = "audio",
    IMAGE = "image"
}
export declare class FileServices {
    createFiles(type: FileType, file: Express.Multer.File): string;
    removiFile(fileName: string): void;
}
