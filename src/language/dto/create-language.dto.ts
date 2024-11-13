import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ example: 'English', description: 'Name of the language' })
  @IsString({ message: 'Language name must be a string' })
  @IsNotEmpty({ message: 'Language name cannot be empty' })
  name: string;
}
