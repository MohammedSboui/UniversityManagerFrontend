import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonneService } from './services/personne.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContentComponent } from './layout/content/content.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EtudiantsComponent } from './etudiants/etudiants.component';
import { AjoutEtudiantComponent } from './etudiants/ajout-etudiant/ajout-etudiant.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { GroupsComponent } from './groups/groups.component';
import { AjoutGroupeComponent } from './groups/ajout-groupe/ajout-groupe.component';
import { GroupesSelectComponent } from './groupes-select/groupes-select.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { AjoutEnseignantComponent } from './enseignants/ajout-enseignant/ajout-enseignant.component';
import { DepartementsComponent } from './departements/departements.component';
import { AjoutDepartementComponent } from './departements/ajout-departement/ajout-departement.component';
import { UniversitesComponent } from './universites/universites.component';
import { AjoutUniversiteComponent } from './universites/ajout-universite/ajout-universite.component';
import { SallesComponent } from './salles/salles.component';
import { AjoutSalleComponent } from './salles/ajout-salle/ajout-salle.component';
import { CoursComponent } from './cours/cours.component';
import { AjoutCoursComponent } from './cours/ajout-cours/ajout-cours.component';
import { SeancesComponent } from './seances/seances.component';
import { AjoutSeanceComponent } from './seances/ajout-seance/ajout-seance.component';
import { EnsignantSelectComponent } from './ensignant-select/ensignant-select.component';
import { SalleSelectComponent } from './salle-select/salle-select.component';
import { CoursSelectComponent } from './cours-select/cours-select.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    EtudiantsComponent,
    AjoutEtudiantComponent,
    ConfirmComponent,
    GroupsComponent,
    AjoutGroupeComponent,
    GroupesSelectComponent,
    EnseignantsComponent,
    AjoutEnseignantComponent,
    DepartementsComponent,
    AjoutDepartementComponent,
    UniversitesComponent,
    AjoutUniversiteComponent,
    SallesComponent,
    AjoutSalleComponent,
    CoursComponent,
    AjoutCoursComponent,
    SeancesComponent,
    AjoutSeanceComponent,
    EnsignantSelectComponent,
    SalleSelectComponent,
    CoursSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  providers: [PersonneService],
  bootstrap: [AppComponent],
})
export class AppModule {}
