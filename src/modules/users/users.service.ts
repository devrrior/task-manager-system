import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestDto } from './dto/requests/create-user.request.dto';
import { CreateUserResponseDto } from './dto/responses/create-user.response.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { encryptPassword } from './utils/bcryptUtils';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async create(request: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    try {
      const hashedPassword = await encryptPassword(request.password);
      const user = await this.userRepository.save({
        email: request.email,
        password: hashedPassword,
      });

      return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException(
          'An error occurred while creating the user',
        );
      }
    }
  }

  async findOneAndEnsureExistByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneAndEnsureExistById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
