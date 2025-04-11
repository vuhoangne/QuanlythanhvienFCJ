import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor() {}
  prisma = new PrismaClient();

  create(createEventDto: CreateEventDto) {
    const formattedDate = new Date(createEventDto.event_date.replace(' ', 'T') + 'Z'); 
    return this.prisma.events.create({
      data: {
        ...createEventDto,
        event_date: formattedDate,
      },
    });
  }

  async findAll(query: { search?: string; date?: string; page: number; size: number }) {
    const { search, date, page, size } = query;
    const filters: any = {};

    if (search) {
      filters.title = { contains: search, mode: 'insensitive' };
    }

    if (date) {
      filters.event_date = {
        gte: new Date(date), 
      };
    }

    const events = await this.prisma.events.findMany({
      where: filters,
      skip: (page - 1) * size,
      take: size * 1,
    });

    const total = await this.prisma.events.count({
      where: filters,
    });

    return {
      data: events,
      total: total,
    };
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    const eventDate = updateEventDto.event_date;
    const formattedDate = eventDate ? new Date(eventDate) : undefined;
  
    if (formattedDate && isNaN(formattedDate.getTime())) {
      throw new Error("Invalid event date");
    }
  
    return this.prisma.events.update({
      where: { event_id: id },
      data: {
        ...updateEventDto,
        event_date: formattedDate, 
      },
    });
  }
  
  
  remove(id: number) {
    return this.prisma.events.delete({
      where: { event_id: id },
    });
  }

  async getStatistics() {
    const totalEvents = await this.prisma.events.count();
    const upcomingEvents = await this.prisma.events.count({
      where: { event_date: { gte: new Date() } },
    });
    const pastEvents = await this.prisma.events.count({
      where: { event_date: { lt: new Date() } },
    });

    return {
      totalEvents,
      upcomingEvents,
      pastEvents,
    };
  }

  getEventsWithRegistrations() {
    return this.prisma.events.findMany({
      where: {
        registrations: {
          some: {},
        },
      },
      include: {
        registrations: true,
      },
    });
  }

  findUniue(id: number) {
    return this.prisma.events.findUnique({
      where: { event_id: id },
    });
  }
}
