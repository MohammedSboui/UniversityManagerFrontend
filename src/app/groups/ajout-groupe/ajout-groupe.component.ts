import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Groupe } from 'src/app/models/Groupe';
import { GroupesService } from 'src/app/services/groupes.service';

@Component({
  selector: 'app-ajout-groupe',
  templateUrl: './ajout-groupe.component.html',
  styleUrls: ['./ajout-groupe.component.css'],
})
export class AjoutGroupeComponent implements OnInit {
  title = '';
  groupe: Partial<Groupe> = {};
  isEditMode: boolean = false;

  constructor(
    private gpeService: GroupesService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.title = "Modifier les données d'un groupe";
      this.gpeService.getGroupeById(+id).subscribe(
        (data) => (this.groupe = data),
        (err) => this.setDefault()
      );
    } else {
      this.title = 'Nouveau groupe';
      this.setDefault();
    }
  }

  setDefault() {
    this.groupe = {
      niveauGroupe: '',
    };
  }

  get isNiveauGroupeValid() {
    return !!this.groupe.niveauGroupe?.length;
  }

  ngOnInit(): void {}

  handleNewGroupe() {
    if (this.isEditMode) {
      this.gpeService.modifierGroupe(this.groupe as Groupe).subscribe(
        (data) => {
          this.showMsg('Groupe a été modifié avec succés !');
          this.router.navigate(['groupe']);
        },
        (err) => this.showMsg('Oops erreur !', 'danger')
      );
      return;
    }

    this.gpeService.ajouterGroupe(this.groupe as Groupe).subscribe(
      (data) => {
        this.showMsg('Groupe a été ajouté avec succés !');
        this.router.navigate(['groupe']);
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
    return !this.isNiveauGroupeValid;
  }
}
