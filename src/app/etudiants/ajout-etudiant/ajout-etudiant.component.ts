import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/models/Etudiant';
import { Groupe } from 'src/app/models/Groupe';
import { EtudiantsService } from 'src/app/services/etudiants.service';

@Component({
  selector: 'app-ajout-etudiant',
  templateUrl: './ajout-etudiant.component.html',
  styleUrls: ['./ajout-etudiant.component.css'],
})
export class AjoutEtudiantComponent implements OnInit {
  title = '';
  etudiant: Partial<Etudiant> = {};
  isEditMode: boolean = false;

  constructor(
    private etudService: EtudiantsService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.title = "Modifier les données d'un étudiant";
      this.etudService.getEutdiantById(+id).subscribe(
        (data) => (this.etudiant = data),
        (err) => this.setDefault()
      );
    } else {
      this.title = 'Nouveau étudiant';
      this.setDefault();
    }
  }

  setDefault() {
    this.etudiant = {
      nomEt: '',
      prenomEt: '',
      adrEt: '',
    };
  }

  get isNomValid() {
    return this.etudiant.nomEt!.length >= 3;
  }

  get isPrenomValid() {
    return this.etudiant.prenomEt!.length >= 3;
  }

  get isAdrValid() {
    return this.etudiant.adrEt!.length > 0;
  }

  ngOnInit(): void {}

  handleNewEtudiant() {
    console.log({ etud: this.etudiant });
    if (this.isEditMode) {
      this.etudService.modifierEtudiant(this.etudiant as Etudiant).subscribe(
        (data) => {
          this.showMsg('Etudiant a été modifié avec succés !');
          this.router.navigate(['etudiant']);
        },
        (err) => this.showMsg('Oops erreur !', 'danger')
      );
      return;
    }

    this.etudService.nouveauEtudiant(this.etudiant as Etudiant).subscribe(
      (data) => {
        this.showMsg('Etudiant a été ajouté avec succés !');
        this.router.navigate(['etudiant']);
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

  handleGroupeChange(groupe: Groupe) {
    console.log({ groupe });
    this.etudiant.groupe = groupe;
  }
}
