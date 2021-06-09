import { Groupe } from './Groupe';

export interface Etudiant {
  numEt?: number;
  nomEt: string;
  prenomEt: string;
  adrEt: string;
  groupe?: Groupe;
}
