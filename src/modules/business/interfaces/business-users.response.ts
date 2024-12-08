import { UserResponseDto } from '../../auth/dtos/user.response.dto';

export interface BusinessUsersResponse {
    users: UserResponseDto[];
    total: number;
    page: number;
    totalPages: number;
}