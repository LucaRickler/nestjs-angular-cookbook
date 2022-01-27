import { UnprocessableEntityException } from '@nestjs/common';
import { Unit } from '../models/unit.entity';
import { MockUnits } from '../models/units.mock';
import { DeleteResult } from 'typeorm';
import { CreateUnitDTO } from '../models/create-unit.dto';
import { User } from '../../users/models/user.entity';

// @Injectable()
export class UnitsMockService {
  units: Unit[];
  constructor() {
    this.units = [];
    for (const u of MockUnits) {
      const u2: Unit = Object.create(u);
      u2.id = u.id;
      u2.name = u.name;
      u2.symbol = u.symbol;
      this.units.push(u2);
    }
  }

  async findAll(): Promise<Unit[]> {
    return new Promise<Unit[]> ((resolve, reject) => {
      resolve(this.units);
    });
  }

  async findOneByID(id: number): Promise<Unit | undefined> {
    return new Promise<Unit | undefined>((resolve, reject) => {
      let index = -1;
      for (let i = 0; i < this.units.length; i++) {
        if (this.units[i].id === id) {
          index = i;
          break;
        }
      }
      resolve(index !== -1 ? this.units[index] : undefined);
    });
  }

  async findOneByName(name: string): Promise<Unit | undefined> {
    return new Promise<Unit | undefined>((resolve, reject) => {
      let index = -1;
      for (let i = 0; i < this.units.length; i++) {
        if (this.units[i].name === name) {
          index = i;
          break;
        }
      }
      resolve(index !== -1 ? this.units[index] : undefined);
    });
  }

  async create(createUnitDTO: CreateUnitDTO, user: User): Promise<Unit> {
    return new Promise<Unit>((resolve, reject) => {
      this.findOneByName(createUnitDTO.name).then(async u => {
        if (u) {
          throw new UnprocessableEntityException();
        }
        const unit: Unit = new Unit();
        unit.name = createUnitDTO.name;
        unit.symbol = createUnitDTO.symbol;
        this.units.push(unit);
        resolve(unit);
      }).catch(err => reject(err));
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return new Promise<DeleteResult>((resolve, reject) => {
      this.findOneByID(id).then(unit => {
        if (unit) {
          this.units.splice(this.units.indexOf(unit), 1);
          resolve({ affected: 1, raw: '' });
        } else {
          resolve({ affected: 0, raw: '' });
        }
      }).catch(err => reject(err));
    });
  }
}
