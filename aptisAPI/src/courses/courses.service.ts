import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor() {}
  prisma = new PrismaClient();

  create(createCourseDto: CreateCourseDto) {
    return this.prisma.courses.create({
      data: createCourseDto,
    });
  }

  async findAll(query: { search?: string; status?: string; page: number; size: number }) {
    const { search, status, page, size } = query;
    const filters: any = {};

    if (search) {
      filters.title = { contains: search, mode: 'insensitive' };
    }

    if (status) {
      filters.status = status;
    }

    const courses = await this.prisma.courses.findMany({
      where: filters,
      skip: (page - 1) * size,
      take: size * 1,
    });

    const total = await this.prisma.courses.count({
      where: filters,
    });

    return {
      data: courses,
      total: total,
    };
  }

  

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.courses.update({
      where: { course_id: id },
      data: updateCourseDto,
    });
  }

  remove(id: number) {
    return this.prisma.courses.delete({
      where: { course_id: id },
    });
  }

  async getStatistics() {
    const totalCourses = await this.prisma.courses.count();
    const activeCourses = await this.prisma.courses.count({
      where: { status: 'active' },
    });
    const inactiveCourses = await this.prisma.courses.count({
      where: { status: 'inactive' },
    });

    return {
      totalCourses,
      activeCourses,
      inactiveCourses,
    };
  }

  getCoursesWithCertificates() {
    return this.prisma.courses.findMany({
      where: {
        user_certificates: {
          some: {},
        },
      },
      include: {
        user_certificates: true,
      },
    });
  }

  getCoursesWithFeedback() {
    return this.prisma.courses.findMany({
      where: {
        user_feedbacks: {
          some: {},
        },
      },
      include: {
        user_feedbacks: true,
      },
    });
  }

  findOneCourse(id: number) {
    return this.prisma.courses.findUnique({
      where: { course_id: id },
    });
  }
}
