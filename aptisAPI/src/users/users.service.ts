import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor() {}
    prisma = new PrismaClient();

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.users.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const users = await this.prisma.users.findMany({
      skip,
      take: limit * 1,
    });
    const total = await this.prisma.users.count();
    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }



  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.users.findUnique({ where: { user_id: id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
  
    const { password, ...updateData } = updateUserDto;
    return this.prisma.users.update({
      where: { user_id: id },
      data: updateData,  
    });
  }
  

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prisma.users.findUnique({ where: { user_id: id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);

    // const passwordMatches = await bcrypt.compare(updatePasswordDto.oldPassword, user.password);
    // if (!passwordMatches) throw new BadRequestException('Old password is incorrect');

    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    return this.prisma.users.update({
      where: { user_id: id },
      data: { password: hashedPassword },
    });
  }

  

  async remove(id: number) {
    const user = await this.prisma.users.findUnique({ where: { user_id: id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    
    return this.prisma.users.delete({ where: { user_id: id } });
  }

  async getStatistics() {
    const totalUsers = await this.prisma.users.count();
    const activeUsers = await this.prisma.users.count({ where: { status: 'active' } });
    return { totalUsers, activeUsers };
  }

  async getDetailUser(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: id },
    })
    if (user){
      return user
    } 
  }
}
