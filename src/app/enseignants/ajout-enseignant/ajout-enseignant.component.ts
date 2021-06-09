import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Enseignant } from 'src/app/models/Enseignant';
import { EnseignantService } from 'src/app/services/enseignant.service';

@Component({
  selector: 'app-ajout-enseignant',
  templateUrl: './ajout-enseignant.component.html',
  styleUrls: ['./ajout-enseignant.component.css'],
})
export class AjoutEnseignantComponent implements OnInit {
  title = '';
  enseignant: Partial<Enseignant> = {};
  isEditMode: boolean = false;

  constructor(
    private ensdService: EnseignantService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.title = "Modifier les données d'un enseignant";
      this.ensdService.getEnseignantById(+id).subscribe(
        (data) => (this.enseignant = data),
        (err) => this.setDefault()
      );
    } else {
      this.title = 'Nouveau enseignant';
      this.setDefault();
    }
  }

  setDefault() {
    this.enseignant = {
      nomEns: '',
      prenomEns: '',
      adrEns: '',
      diplomeEns: '',
    };
  }

  get isNomValid() {
    return this.enseignant.nomEns!.length >= 3;
  }

  get isPrenomValid() {
    return this.enseignant.prenomEns!.length >= 3;
  }

  get isAdrValid() {
    return this.enseignant.adrEns!.length > 0;
  }

  ngOnInit(): void {}

  handleNewEnseignant() {
    console.log({ etud: this.enseignant });
    if (this.isEditMode) {
      this.ensdService
        .modifierEnseignant(this.enseignant as Enseignant)
        .subscribe(
          (data) => {
            this.showMsg('Enseignant a été modifié avec succés !');
            this.router.navigate(['enseignant']);
          },
          (err) => this.showMsg('Oops erreur !', 'danger')
        );
      return;
    }

    this.ensdService.nouveauEnseignant(this.enseignant as Enseignant).subscribe(
      (data) => {
        this.showMsg('Enseignant a été ajouté avec succés !');
        this.router.navigate(['enseignant']);
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
    return !this.isAdrValid || !this.isNomValid || !this.isPrenomValid;
  }
}
