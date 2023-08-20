import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { KnexModule } from 'nest-knexjs';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'better-sqlite3',
          connection: {
            filename: './data/dev.db',
          },
          log: {
            error(m) {
              console.log(m);
            },
          },
        },
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService, UserService, JwtStrategy],
})
export class AppModule {}
