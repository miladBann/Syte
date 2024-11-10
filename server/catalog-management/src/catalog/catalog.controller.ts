import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  async findAll(@Query('search') search?: string, @Query('multiLocale') multiLocale?: boolean) {
    if (search || multiLocale !== undefined) {
      return await this.catalogService.findWithFilters(search, multiLocale);
    }
    return await this.catalogService.findAll();
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number) {
    const catalogs = await this.catalogService.findByUserId(userId);
    if (!catalogs || catalogs.length === 0) {
      throw new NotFoundException(`No catalogs found for user with ID ${userId}`);
    }
    return catalogs;
  }

  @Post()
  async create(@Body() createCatalogDto: CreateCatalogDto) {
    return await this.catalogService.createCatalog(createCatalogDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCatalogDto: UpdateCatalogDto
  ) {
    const updatedCatalog = await this.catalogService.updateCatalog(id, updateCatalogDto);
    if (!updatedCatalog) {
      throw new NotFoundException(`Catalog with ID ${id} not found`);
    }
    return updatedCatalog;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.catalogService.deleteCatalog(id);
    return { message: `Catalog with ID ${id} deleted successfully` };
  }

  @Delete()
  async deleteBulk(@Body('ids') ids: number[]) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestException('Please provide an array of IDs to delete');
    }
    await this.catalogService.deleteBulk(ids);
    return { message: `${ids.length} catalogs deleted successfully` };
  }
}
