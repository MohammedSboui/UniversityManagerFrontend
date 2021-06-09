import { UniversitesService } from './../../services/universites.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Universite } from 'src/app/models/Universite';

@Component({
  selector: 'app-ajout-universite',
  templateUrl: './ajout-universite.component.html',
  styleUrls: ['./ajout-universite.component.css'],
})
export class AjoutUniversiteComponent implements OnInit {
  title = '';
  universite: Partial<Universite> = {};
  isEditMode: boolean = false;

  constructor(
    private univService: UniversitesService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.title = "Modifier les données d'un université";
      this.univService.getUniversiteById(+id).subscribe(
        (data) => (this.universite = data),
        (err) => this.setDefault()
      );
    } else {
      this.title = 'Nouveau université';
      this.setDefault();
    }
  }

  setDefault() {
    this.universite = {
      nomUni: '',
      adresseSite: '',
    };
  }

  get isAdresseSiteValid() {
    return this.universite.adresseSite!.length >= 3;
  }

  get isNomUriValid() {
    return this.universite.nomUni!.length >= 3;
  }

  ngOnInit(): void {}

  handleNewUniversite() {
    if (this.isEditMode) {
      this.univService
        .modifierUniversite(this.universite as Universite)
        .subscribe(
          (data) => {
            this.showMsg('Université a été modifié avec succés !');
            this.router.navigate(['universite']);
          },
          (err) => this.showMsg('Oops erreur !', 'danger')
        );
      return;
    }

    this.univService.nouveauUniversite(this.universite as Universite).subscribe(
      (data) => {
        this.showMsg('Université a été ajouté avec succés !');
        this.router.navigate(['universite']);
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
    return !this.isAdresseSiteValid || !this.isNomUriValid;
  }
}
