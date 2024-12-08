import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {
  create(createRoleDto: { name: string; }) {
    throw new Error('Method not implemented.');
  }
  findOne(roleId: string) {
    throw new Error('Method not implemented.');
  }
  remove(roleId: string) {
    throw new Error('Method not implemented.');
  }
}
