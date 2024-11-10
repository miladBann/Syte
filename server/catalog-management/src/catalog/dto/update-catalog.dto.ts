import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class UpdateCatalogDto {
  @IsOptional()
  @IsBoolean()
  is_primary?: boolean;

  @IsOptional()
  @IsArray()
  locales?: string[];

  @IsOptional()
  @IsString()
  indexed_at?: string;
}
