import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthClass, AuthScheam } from './Schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './jwtcostants/jwt.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthClass.name,
        schema: AuthScheam,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: 'huzaifa',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
