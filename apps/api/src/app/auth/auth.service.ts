import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { RegisterDto } from '@innoware/api-interfaces';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>, private jwtService: JwtService) {
  }

  async save(dto: RegisterDto) {
    const user = new User();
    user.name = dto.name;
    user.username = dto.username;
    user.password = await hash(dto.password, 10);
    const { password, ...result } = await this.repository.save(user).catch((reason: QueryFailedError) => {
      const { name, message } = reason;
      throw new BadRequestException({ name, message });
    });
    return result;
  }

  async login(username: string, pass: string) {
    const user = await this.repository.findOne({
      where: {
        username
      }
    });
    if (!user) {
      throw new NotFoundException();
    }

    const {password, ...result} = user;

    const match = await compare(pass, password);
    if (!match) {
      throw new NotFoundException();
    }

    return await this.jwtService.signAsync(result, {
      algorithm: 'HS512'
    });
  }
}
