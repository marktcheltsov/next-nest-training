import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment-dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  constructor(private TrackService: TrackService) {}
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;
    return this.TrackService.create(dto, picture, audio);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.TrackService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.TrackService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.TrackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.TrackService.delete(id);
  }
  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.TrackService.addComment(dto);
  }
  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.TrackService.listen(id);
  }
}
