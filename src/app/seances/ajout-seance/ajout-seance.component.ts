import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from 'src/app/models/Cours';
import { Enseignant } from 'src/app/models/Enseignant';
import { Groupe } from 'src/app/models/Groupe';
import { Salle } from 'src/app/models/Salle';
import { Seance } from 'src/app/models/Seance';
import { SeancesService } from 'src/app/services/seances.service';

@Component({
  selector: 'app-ajout-seance',
  templateUrl: './ajout-seance.component.html',
  styleUrls: ['./ajout-seance.component.css'],
})
export class AjoutSeanceComponent implements OnInit {
  title = '';
  seance: Partial<Seance> = {};
  isEditMode: boolean = false;

  constructor(
    private seanceService: SeancesService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.title = "Modifier les données d'une seqnce";
      this.seanceService.getSeanceById(+id).subscribe(
        (data) => (this.seance = data),
        (err) => this.setDefault()
      );
    } else {
      this.title = 'Nouvelle seance';
      this.setDefault();
    }
  }

  setDefault() {
    this.seance = {
      dureSeance: 0,
      sateSeance: 'Mercredi',
    };
  }

  get isDureValid() {
    return this.seance.dureSeance! >= 1;
  }

  get isSateSeanceValid() {
    return [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ].includes(this.seance.sateSeance!);
  }

  ngOnInit(): void {}

  handleNewSeance() {
    console.log({ etud: this.seance });
    if (this.isEditMode) {
      this.seanceService.modifierSeance(this.seance as Seance).subscribe(
        (data) => {
          this.showMsg('Seance a été modifié avec succés !');
          this.router.navigate(['seance']);
        },
        (err) => this.showMsg('Oops erreur !', 'danger')
      );
      return;
    }

    this.seanceService.nouveauSeance(this.seance as Seance).subscribe(
      (data) => {
        this.showMsg('Seance a été ajouté avec succés !');
        this.router.navigate(['seance']);
      },
      (err) => this.showMsg('Oops erreur !', 'danger')
    );
  }

  showMsg(msg: string, level: string = 'success') {
    this.snackbar.open(msg, undefined, {
      panelClass: `snack__${level}`,
      duration: 2000,
    });
  }

  get isDisabled() {
    return !this.isDureValid || !this.isSateSeanceValid;
  }

  handleGroupeChange(groupe: Groupe) {
    console.log({ groupe });
    this.seance.groupe = groupe;
  }

  handleEnseignantChange(ens: Enseignant) {
    this.seance.enseignant = ens;
  }

  handleSalleChange(salle: Salle) {
    this.seance.salle = salle;
  }

  handleCoursChange(cours: Cours) {
    this.seance.cours = cours;
  }
}
