import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { CustomerModule } from './modules/customer/customer.module';
import { SalesModule } from './modules/sales/sales.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true, 
    }),
    
    UsersModule, 
    AuthModule, CustomerModule, SalesModule
  ],
    controllers: [AppController],
    providers: [AppService],
})
  
export class AppModule {}
