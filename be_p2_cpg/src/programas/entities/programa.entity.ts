import { NivelesAcademico } from "src/niveles_academicos/entities/niveles_academico.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
export enum EstadoPrograma {
    EN_PLANIFICACION = 'En Planificación',
    EN_CURSO = 'En Curso',
    FINALIZADO = 'Finalizado'
}
@Entity('programas')
export class Programa {
    @PrimaryGeneratedColumn('identity')
    id: number;
    
    @Column('integer')
    id_nivel_academico: number;
    
    @Column('varchar', { length: 100})
    nombre: string;

    @Column('varchar', { length: 2000})
    descripcion: string;

    @Column('integer')
    version: number;

    @Column('integer')
    duracion_meses: number;

    @Column('decimal', { precision: 10, scale: 2 })
    costo: number;

    @Column('date')
    fecha_inicio: Date;

    @Column({type: "enum", enum: EstadoPrograma})
    estado: EstadoPrograma;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModicicaion: Date;

    @DeleteDateColumn({ name: 'fecha_eliminacion' })
    fechaEliminacion: Date;

    @ManyToOne(() => NivelesAcademico, (nivelAcademico) => nivelAcademico.programas)
    @JoinColumn({ name: 'id_nivel_academico' })
    nivelAcademico: NivelesAcademico;
}
