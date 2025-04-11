import { IsString, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  instructor?: string;

  @IsEnum(['active', 'inactive'])
  @IsOptional()
  status: string;
}
