import { Cours } from './Cours';
import { Enseignant } from './Enseignant';
import { Groupe } from './Groupe';
import { Salle } from './Salle';

export interface Seance {
  idSeance: number;
  dureSeance: number;
  sateSeance: string;
  enseignant: Enseignant;
  salle: Salle;
  groupe: Groupe;
  cours: Cours;
}
