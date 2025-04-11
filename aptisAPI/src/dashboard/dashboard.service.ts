import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DashboardService {
  private prisma = new PrismaClient();

  async getStatistics() {
    const totalCourses = await this.prisma.courses.count();
    const totalActiveCourses = await this.prisma.courses.count({ where: { status: 'active' } });
    const totalInactiveCourses = await this.prisma.courses.count({ where: { status: 'inactive' } });

    const totalUsers = await this.prisma.users.count();
    const activeUsers = await this.prisma.users.count({ where: { status: 'active' } });
    const inactiveUsers = await this.prisma.users.count({ where: { status: 'inactive' } });
    const totalAdmins = await this.prisma.users.count({ where: { role: 'admin' } });
    const totalRegularUsers = await this.prisma.users.count({ where: { role: 'user' } });

    const totalCoursesWithCertificates = await this.prisma.courses.count({
      where: {
        user_certificates: {
          some: {},
        },
      },
    });

    const totalCoursesWithFeedback = await this.prisma.courses.count({
      where: {
        user_feedbacks: {
          some: {},
        },
      },
    });

    const totalEvents = await this.prisma.events.count();
    const totalRegistrations = await this.prisma.registrations.count();

    return {
      totalCourses,
      totalActiveCourses,
      totalInactiveCourses,
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalAdmins,
      totalRegularUsers,
      totalCoursesWithCertificates,
      totalCoursesWithFeedback,
      totalEvents,
      totalRegistrations,
    };
  }
}
