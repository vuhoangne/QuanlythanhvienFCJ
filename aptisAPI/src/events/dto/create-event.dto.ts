import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Title of the event',
    example: 'Annual Tech Conference 2025',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Date of the event',
    example: '2025-06-15T00:00:00.000Z',
  })
  @IsDateString()
  event_date: string;

  @ApiProperty({
    description: 'Location of the event (optional)',
    example: 'Main Hall, Tech Center',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'Capacity of the event (optional)',
    example: 500,
    required: false,
  })
  @IsOptional()
  @IsInt()
  capacity?: number;

  @ApiProperty({
    description: 'Description of the event (optional)',
    example: 'A conference bringing together the brightest minds in technology to discuss the latest trends.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
