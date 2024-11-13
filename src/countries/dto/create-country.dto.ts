import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ example: 'Uzbekistan', description: 'Name of the country' })
  @IsString({ message: 'Country name must be a string' })
  @IsNotEmpty({ message: 'Country name cannot be empty' })
  name: string;
}
