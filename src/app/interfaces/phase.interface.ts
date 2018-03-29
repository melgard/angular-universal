import {PhaseTypeEnum} from '@app/models/enums/phase-type.enum';

export interface IPhase {
  id?: number;
  name: string;
  label: string;
  value: boolean;
  semaforo?: string;
  order: number;
  type: PhaseTypeEnum;
  parent_id: number;
  parent: any;
  subPhases: IPhase[];
  timeline_id: number;
  timeline: any;
  historical?: any[];
}
