import {IHistorical} from './historical.interface';
import {IProfile} from './profile.interface';

export interface IPhaseForm {


  // Debe actualizar la historia
  updateHistory(history: IHistorical): void;

  // Debe crear la nueva historia si corresponde
  createHistory(history: IHistorical): void;

  // Debe actualizar el perfil
  updateProfile(profile: IProfile): void;


  // Cierra el modal
  close(): void;

}
