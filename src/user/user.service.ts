import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async getAll() {
    const users = await this.knex.table('users');
    return { users };
  }

  async findOne(username: string) {
    const users = await this.knex
      .from<User>('users')
      .select('*')
      .where({ username });
    return users[0];
  }
}
