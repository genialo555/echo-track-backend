import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';
import { UserResponseDto } from '../auth/dtos/user.response.dto';

@Injectable()
export class BusinessService {
    [x: string]: any;
    constructor(private readonly usersService: UsersService) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        try {
            const user = await this.usersService.create(createUserDto);
            return new UserResponseDto(user);
        } catch (error) {
            this.handleError('Failed to create business user', error);
            throw new InternalServerErrorException('Failed to create business user');
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        try {
            const updatedUser = await this.usersService.update(id, updateUserDto);
            return new UserResponseDto(updatedUser);
        } catch (error) {
            this.handleError('Failed to update business user', error);
            throw new InternalServerErrorException('Failed to update business user');
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await this.usersService.remove(id);
        } catch (error) {
            this.handleError('Failed to delete business user', error);
            throw new InternalServerErrorException('Failed to delete business user');
        }
    }

    async getAllUsers(page: number = 1, limit: number = 10): Promise<{
        users: UserResponseDto[];
        total: number;
        page: number;
        totalPages: number;
    }> {
        try {
            const paginatedResult = await this.usersService.findAll(page, limit);
            
            return {
                users: paginatedResult.users, // Users are already transformed in UsersService
                total: paginatedResult.total,
                page: paginatedResult.page,
                totalPages: paginatedResult.totalPages
            };
        } catch (error) {
            this.handleError('Failed to get all business users', error);
            throw new InternalServerErrorException('Failed to get all business users');
        }
    }
}