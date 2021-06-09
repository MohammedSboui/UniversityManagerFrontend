import { Universite } from './Universite';

export interface Departement {
  codeDep: number;
  libelleDep: string;
  universite: Universite;
}
