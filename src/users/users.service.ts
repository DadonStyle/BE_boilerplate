import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    this.logger.log('Creating new user');

    if (userData.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });
      if (existingUser) {
        this.logger.warn(
          `Attempt to create user with existing email: ${userData.email}`,
        );
        throw new ConflictException('Email already exists');
      }
    }

    try {
      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user);
      this.logger.log(`User created with ID: ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    const users = await this.userRepository.find();
    this.logger.log(`Found ${users.length} users`);
    return users;
  }

  async findOne(id: number): Promise<User> {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`);

    await this.findOne(id);

    if (updateData.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateData.email },
      });
      if (existingUser && existingUser.id !== id) {
        this.logger.warn(
          `Attempt to update user ${id} with existing email: ${updateData.email}`,
        );
        throw new ConflictException('Email already exists');
      }
    }

    try {
      await this.userRepository.update(id, updateData);
      const updatedUser = await this.findOne(id);
      this.logger.log(`User with ID ${id} updated successfully`);
      return updatedUser;
    } catch (error) {
      this.logger.error(
        `Failed to update user with ID ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing user with ID: ${id}`);
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    this.logger.log(`User with ID ${id} removed successfully`);
  }
}
