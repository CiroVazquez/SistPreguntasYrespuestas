import { RespuestaCuestionarioDetalle } from "./respuestaCuestionarioDetalle";


export class RespuestaCuestionario{
    id?:number;
    CuestionarioId?: number;
    fecha?: Date ;
    nombreParticipante?: any;                       
    listRtaCuestionarioDetalle?: RespuestaCuestionarioDetalle[];
}