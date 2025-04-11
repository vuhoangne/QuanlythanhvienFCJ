import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(@Query() query: { search?: string; date?: string; page?: number; size?: number }) {
    const page = query.page || 1;
    const size = query.size || 10;
    return this.eventsService.findAll({ ...query, page, size });
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }

  @Get('statistics')
  getStatistics() {
    return this.eventsService.getStatistics();
  }

  @Get('with-registrations')
  getEventsWithRegistrations() {
    return this.eventsService.getEventsWithRegistrations();
  }
  
  @Get(':id')
  findUniue(@Param('id') id: string) {
    return this.eventsService.findUniue(+id);
  }
}
