export interface Programa {
  id: number;
  nombre: string;
  descripcion: string;
  duracion_meses: number; 
  nivelAcademicoId: number; 
  version: number; 
  costo: number; 
  fecha_inicio: Date; 
  estado: 'En Planificación' | 'En Curso' | 'Finalizado';
  nivelAcademico:{ nombre: string ,id: number}; 
}