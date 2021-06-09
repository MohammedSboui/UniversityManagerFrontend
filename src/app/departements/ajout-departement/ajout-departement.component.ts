import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/models/Departement';
import { DepartementsService } from 'src/app/services/departements.service';

@Component({
  selector: 'app-ajout-departement',
  templateUrl: './ajout-departement.component.html',
  styleUrls: ['./ajout-departement.component.css'],
})
export class AjoutDepartementComponent implements OnInit {
  title = '';
  departement: Partial<Departement> = {};
  isEditMode: boolean = false;

  constructor(
    private departService: DepartementsService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.title = "Modifier les données d'un enseignant";
      this.departService.getDepartementById(+id).subscribe(
        (data) => (this.departement = data),
        (err) => this.setDefault()
      );
    } else {
      this.title = 'Nouveau enseignant';
      this.setDefault();
    }
  }

  setDefault() {
    this.departement = {
      libelleDep: '',
    };
  }

  get isLibelleDepValid() {
    return this.departement.libelleDep!.length >= 3;
  }

  ngOnInit(): void {}

  handleNewDepartement() {
    console.log({ etud: this.departement });
    if (this.isEditMode) {
      this.departService
        .modifierDepartement(this.departement as Departement)
        .subscribe(
          (data) => {
            this.showMsg('Departement a été modifié avec succés !');
            this.router.navigate(['departement']);
          },
          (err) => this.showMsg('Oops erreur !', 'danger')
        );
      return;
    }

    this.departService
      .nouveauDepartement(this.departement as Departement)
      .subscribe(
        (data) => {
          this.showMsg('Departement a été ajouté avec succés !');
          this.router.navigate(['departement']);
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
    return !this.isLibelleDepValid;
  }
}
