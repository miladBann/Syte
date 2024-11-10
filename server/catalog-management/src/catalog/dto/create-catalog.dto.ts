import {IsOptional, IsString, IsNumber, IsEnum, IsBoolean, IsArray } from 'class-validator';

export class CreateCatalogDto {
  @IsNumber()
  user_id: number; 
  
  @IsString()
  name: string;

  @IsEnum(['fashion', 'home', 'general'])
  vertical: string;

  @IsBoolean()
  is_primary: boolean;

  @IsArray()
  locales: string[];

  @IsOptional()
  @IsString()
  indexed_at?: string;

}
