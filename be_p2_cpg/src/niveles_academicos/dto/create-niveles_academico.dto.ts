
import { ApiProperty } from "node_modules/@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, IsInt,IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateNivelesAcademicoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MaxLength(100, { message: 'El nombre no puede tener mas de 50 caracteres' })
    @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
    readonly nombre: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @MaxLength(2000, { message: 'La descripción no puede tener mas de 200 caracteres' })
    @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
    readonly descripcion: string;
}
