import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestDto } from './dto/requests/create-user.request.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { CreateUserResponseDto } from './dto/responses/create-user.response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(request: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    try {
      const hashedPassword = await this.encryptPassword(request.password);
      const user = await this.databaseService.user.create({
        data: {
          email: request.email,
          password: hashedPassword,
        },
      });

      return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException(
          'An error occurred while creating the user',
        );
      }
    }
  }

  async findByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findById(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
