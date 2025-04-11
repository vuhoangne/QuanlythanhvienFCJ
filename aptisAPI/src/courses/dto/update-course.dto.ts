import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  title?: string;

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
  status?: string;
}
