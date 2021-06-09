import { UniversitesComponent } from './universites/universites.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutDepartementComponent } from './departements/ajout-departement/ajout-departement.component';
import { DepartementsComponent } from './departements/departements.component';
import { AjoutEnseignantComponent } from './enseignants/ajout-enseignant/ajout-enseignant.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { AjoutEtudiantComponent } from './etudiants/ajout-etudiant/ajout-etudiant.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { AjoutGroupeComponent } from './groups/ajout-groupe/ajout-groupe.component';
import { GroupsComponent } from './groups/groups.component';
import { AjoutUniversiteComponent } from './universites/ajout-universite/ajout-universite.component';
import { SallesComponent } from './salles/salles.component';
import { AjoutSalleComponent } from './salles/ajout-salle/ajout-salle.component';
import { CoursComponent } from './cours/cours.component';
import { AjoutCoursComponent } from './cours/ajout-cours/ajout-cours.component';
import { SeancesComponent } from './seances/seances.component';
import { AjoutSeanceComponent } from './seances/ajout-seance/ajout-seance.component';

const routes: Routes = [
  {
    path: 'etudiant',
    children: [
      { path: '', component: EtudiantsComponent },
      { path: 'nouveau', component: AjoutEtudiantComponent },
      { path: 'edit/:id', component: AjoutEtudiantComponent },
    ],
  },
  {
    path: 'groupe',
    children: [
      { path: '', component: GroupsComponent },
      { path: 'nouveau', component: AjoutGroupeComponent },
      { path: 'edit/:id', component: AjoutGroupeComponent },
    ],
  },
  {
    path: 'enseignant',
    children: [
      { path: '', component: EnseignantsComponent },
      { path: 'nouveau', component: AjoutEnseignantComponent },
      { path: 'edit/:id', component: AjoutEnseignantComponent },
    ],
  },
  {
    path: 'departement',
    children: [
      { path: '', component: DepartementsComponent },
      { path: 'nouveau', component: AjoutDepartementComponent },
      { path: 'edit/:id', component: AjoutDepartementComponent },
    ],
  },
  {
    path: 'universite',
    children: [
      { path: '', component: UniversitesComponent },
      { path: 'nouveau', component: AjoutUniversiteComponent },
      { path: 'edit/:id', component: AjoutUniversiteComponent },
    ],
  },
  {
    path: 'salle',
    children: [
      { path: '', component: SallesComponent },
      { path: 'nouveau', component: AjoutSalleComponent },
      { path: 'edit/:id', component: AjoutSalleComponent },
    ],
  },
  {
    path: 'cours',
    children: [
      { path: '', component: CoursComponent },
      { path: 'nouveau', component: AjoutCoursComponent },
      { path: 'edit/:id', component: AjoutCoursComponent },
    ],
  },
  {
    path: 'seance',
    children: [
      { path: '', component: SeancesComponent },
      { path: 'nouveau', component: AjoutSeanceComponent },
      { path: 'edit/:id', component: AjoutSeanceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
