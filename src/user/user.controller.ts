import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/test')
  getUsers() {
    return {
      users: [
        {
          id: 1,
          username: `Halo ${name}`,
        },
      ],
    };
  }

  @Get('getall')
  async getAllUsers() {
    return await this.userService.getAll();
  }
}
