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
  area_conocimiento: 'Derecho' | 'Educación' | 'Ingeniería' | 'Salud';
  nivelAcademico:{ nombre: string ,id: number}; 
}