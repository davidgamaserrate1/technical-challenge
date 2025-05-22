// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './respository/user.repository';

@Injectable()
export class UsersService {
  private userRepository: UserRepository;

  constructor(private dataSource: DataSource) {
    this.userRepository = new UserRepository(dataSource);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneById(id);

    if (!user) throw new Error('Usuário não encontrado');
    
    return user
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async create(data: { name: string; email: string; password: string }) {
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      throw new Error('E-mail já está em uso por outro usuário');
    }

    return await this.userRepository.create(data);
  }

  async update(id: number, data: { name?: string; email?: string; password?: string; active?: boolean }) {
    const user = await this.findOneById(id);
    if (!user) throw new Error( 'Usuário não encontrado')

    if (data.email) {
      const existingUser = await this.findByEmail(data.email);

      if (existingUser && existingUser.id !== id) {
        throw new Error('E-mail já está em uso por outro usuário');
      }
    }

    const updatedData = {
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      password: data.password ? await bcrypt.hash(data.password, 10) : user.password,
      active: data.active ?? user.active,
    };

    return await this.userRepository.update(id, updatedData);
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    if (!user) throw new Error('Usuário não encontrado');

    await this.userRepository.remove(id);
  }
}
