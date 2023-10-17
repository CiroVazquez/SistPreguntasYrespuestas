import { Pregunta } from "./pregunta";
import { Usuario } from './usuario';

export class Cuestionario{
  id?: number;
  nombre?: string;
  descripcion?: string;
  listPreguntas?: Pregunta[];
  fechaCreacion?: Date;
  usuario?: Usuario;

  constructor(usuario:Usuario, idCuestionario: number, nombre: string, descripcion:string, listPregunta: Pregunta[], fechaCreacion: Date){
    this.id = idCuestionario;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.listPreguntas = listPregunta;
    this.fechaCreacion = fechaCreacion;
    this.usuario = usuario;
    }
  }
