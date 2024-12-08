import { IsEmail, IsString, IsOptional, IsArray, IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../database/common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  @IsString()
  email!: string;  // Note the '!' operator to indicate this is required

  @ApiProperty({ description: 'User password' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ description: 'User first name', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ description: 'User last name', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ description: 'User roles', type: [String], enum: Role })
  @IsArray()
  @IsEnum(Role, { each: true })
  roles!: Role[];
}

// Type for the service layer
export interface CreateUserData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roles: Role[];
}