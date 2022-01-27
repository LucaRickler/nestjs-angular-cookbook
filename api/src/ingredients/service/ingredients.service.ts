import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from '../../units/models/unit.entity';
import { UnitsService } from '../../units/service/units.service';
import { DeleteResult, FindConditions, Repository } from 'typeorm';
import { Ingredient } from '../models/ingredient.entity';
import { CreateIngredientDTO } from '../models/create-ingredient.dto';
import { User } from '../../users/models/user.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    private readonly unitsService: UnitsService,
  ) { }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  async findOneByID(id: number): Promise<Ingredient | undefined> {
    return this.ingredientRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<Ingredient | undefined> {
    return this.ingredientRepository.findOne({ where: { name } });
  }

  async create(createIngredientDTO: CreateIngredientDTO, user: User): Promise<Ingredient> {
    if (await this.findOneByName(createIngredientDTO.name)) {
      throw new ConflictException();
    }
    const ingredient: Ingredient = new Ingredient();
    ingredient.name = createIngredientDTO.name;
    const unit: Unit = await this.unitsService.findOneByID(createIngredientDTO.unitId);
    if (!unit) {
      throw new UnprocessableEntityException();
    }
    ingredient.unit = unit;
    ingredient.createUser = user;
    return this.ingredientRepository.save(ingredient);
  }

  async update(id: number, createIngredientDTO: CreateIngredientDTO, user: User): Promise<Ingredient> {
    const ingredient = await this.findOneByID(id);
    if (!ingredient) {
      throw new UnprocessableEntityException();
    }
    if (createIngredientDTO.name) {
      ingredient.name = createIngredientDTO.name;
    }
    if (createIngredientDTO.unitId) {
      const unit: Unit = await this.unitsService.findOneByID(createIngredientDTO.unitId);
      if (!unit) {
        throw new UnprocessableEntityException();
      }
      ingredient.unit = unit;
    }
    ingredient.modifyUser = user;
    return this.ingredientRepository.save(ingredient);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.ingredientRepository.delete({ id } as FindConditions<Ingredient>);
  }
}
