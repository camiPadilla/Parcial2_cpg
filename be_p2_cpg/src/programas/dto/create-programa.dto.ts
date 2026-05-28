import { isNoSubstitutionTemplateLiteral } from "typescript";
import { EstadoPrograma } from "../entities/programa.entity";
import { ApiProperty } from "node_modules/@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, IsInt,IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateProgramaDto {
    @IsNotEmpty({message: 'El id del nivel académico es obligatorio'})
    @IsInt({ message: 'El costo debe ser un número' })
    @ApiProperty()
    readonly id_nivel_academico: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MaxLength(50, { message: 'El nombre no puede tener mas de 50 caracteres' })
    @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
    readonly nombre: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @MaxLength(200, { message: 'La descripción no puede tener mas de 200 caracteres' })
    @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
    readonly descripcion: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'La versión es obligatoria' })
    @IsInt({ message: 'El costo debe ser un número' })
    readonly version: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'La duración en meses es obligatoria' })
    @IsInt({ message: 'El costo debe ser un número' })
    readonly duracion_meses: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El costo es obligatorio' })
    @IsInt({ message: 'El costo debe ser un número' })
    readonly costo: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
    readonly fecha_inicio: Date;

    @ApiProperty()
    @IsNotEmpty({ message: 'El estado es obligatorio' })
    readonly estado: EstadoPrograma;
}
