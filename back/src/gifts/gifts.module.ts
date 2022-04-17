import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gifts } from './entity/gifts.entity';
import { Results } from '../results/entity/results.entity';
import { Items } from '../items/entity/items.entity';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gifts, Results, Items]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [GiftsService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [GiftsController],
  exports: [GiftsService],
})
export class GiftsModule {}
