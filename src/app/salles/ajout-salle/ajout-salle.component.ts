import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Salle } from 'src/app/models/Salle';
import { SallesService } from 'src/app/services/salles.service';

@Component({
  selector: 'app-ajout-salle',
  templateUrl: './ajout-salle.component.html',
  styleUrls: ['./ajout-salle.component.css'],
})
export class AjoutSalleComponent implements OnInit {
  title = '';
  salle: Partial<Salle> = {};
  isEditMode: boolean = false;

  constructor(
    private salleService: SallesService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.title = "Modifier les données d'une salle";
      this.salleService.getSalleById(+id).subscribe(
        (data) => (this.salle = data),
        (err) => this.setDefault()
      );
    } else {
      this.title = 'Nouvelle salle';
      this.setDefault();
    }
  }

  setDefault() {
    this.salle = {
      nomSalle: '',
      cpctSalle: 0,
    };
  }

  get isNomValid() {
    return this.salle.nomSalle!.length >= 3;
  }

  get isCpctValid() {
    return this.salle.cpctSalle! > 0;
  }

  ngOnInit(): void {}

  handleNewSalle() {
    console.log({ etud: this.salle });
    if (this.isEditMode) {
      this.salleService.modifierSalle(this.salle as Salle).subscribe(
        (data) => {
          this.showMsg('Salle a été modifié avec succés !');
          this.router.navigate(['salle']);
        },
        (err) => this.showMsg('Oops erreur !', 'danger')
      );
      return;
    }

    this.salleService.nouveauSalle(this.salle as Salle).subscribe(
      (data) => {
        this.showMsg('Salle a été ajouté avec succés !');
        this.router.navigate(['salle']);
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
    return !this.isCpctValid || !this.isNomValid;
  }
}
