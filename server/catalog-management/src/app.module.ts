import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CatalogModule } from './catalog/catalog.module';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './user/user.entity';
import { Catalog } from './catalog/catalog.entity';
import { Locale } from "./catalog/locale.entity";


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {

        return {
          type: 'mysql',
          host: configService.get<string>('DATABASE_HOST'),
          port: +configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [User, Catalog, Locale],
          synchronize: true, 
          autoLoadEntities: true, 
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    CatalogModule,
  ],
})
export class AppModule {}
