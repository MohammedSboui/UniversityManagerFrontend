import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from 'src/app/models/Cours';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-ajout-cours',
  templateUrl: './ajout-cours.component.html',
  styleUrls: ['./ajout-cours.component.css'],
})
export class AjoutCoursComponent implements OnInit {
  title = '';
  cours: Partial<Cours> = {};
  isEditMode: boolean = false;

  constructor(
    private coursService: CoursService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.title = "Modifier les données d'un cours";
      this.coursService.getCoursById(+id).subscribe(
        (data) => (this.cours = data),
        (err) => this.setDefault()
      );
    } else {
      this.title = 'Nouveau cours';
      this.setDefault();
    }
  }

  setDefault() {
    this.cours = {
      libelleCours: '',
      salleCours: '',
    };
  }

  get isLibelleCoursValid() {
    return this.cours.libelleCours!.length >= 3;
  }

  get isSalleCoursValid() {
    return this.cours.salleCours!.length >= 1;
  }

  ngOnInit(): void {}

  handleNewCours() {
    console.log({ etud: this.cours });
    if (this.isEditMode) {
      this.coursService.modifierCours(this.cours as Cours).subscribe(
        (data) => {
          this.showMsg('Cours a été modifié avec succés !');
          this.router.navigate(['cours']);
        },
        (err) => this.showMsg('Oops erreur !', 'danger')
      );
      return;
    }

    this.coursService.nouveauCours(this.cours as Cours).subscribe(
      (data) => {
        this.showMsg('Cours a été ajouté avec succés !');
        this.router.navigate(['cours']);
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
    return !this.isLibelleCoursValid || !this.isSalleCoursValid;
  }
}
