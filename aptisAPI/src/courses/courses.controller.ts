import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll(@Query() query: { search?: string; status?: string; page?: number; size?: number }) {
    const page = query.page || 1;
    const size = query.size || 10;
    return this.coursesService.findAll({ ...query, page, size });
  }

  

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }

  @Get('statistics')
  getStatistics() {
    return this.coursesService.getStatistics();
  }

  @Get('with-certificates')
  getCoursesWithCertificates() {
    return this.coursesService.getCoursesWithCertificates();
  }

  @Get('with-feedback')
  getCoursesWithFeedback() {
    return this.coursesService.getCoursesWithFeedback();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOneCourse(+id);
  }
}
