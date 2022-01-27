import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Unit } from '../models/unit.entity';
import { Repository, DeleteResult, FindConditions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUnitDTO } from '../models/create-unit.dto';
import { User } from '../../users/models/user.entity';

@Injectable()
export class UnitsService {

  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) { }

  async findAll(): Promise<Unit[]> {
    return this.unitRepository.find();
  }

  async findOneByID(id: number): Promise<Unit | undefined> {
    return this.unitRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<Unit | undefined> {
    return this.unitRepository.findOne({ where: { name } });
  }

  async create(createUnitDTO: CreateUnitDTO, user: User): Promise<Unit> {
    if (await this.findOneByName(createUnitDTO.name)) {
      throw new ConflictException();
    }
    const unit: Unit = new Unit();
    unit.name = createUnitDTO.name;
    unit.symbol = createUnitDTO.symbol;
    unit.createUser = user;
    return this.unitRepository.save(unit);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.unitRepository.delete({ id } as FindConditions<Unit>);
  }
}
