import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Cours } from '../models/Cours';
import { CoursService } from '../services/cours.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css'],
})
export class CoursComponent implements OnInit {
  displayedColumns: string[] = ['codeCours', 'libelleCours', 'salleCours'];
  cours?: MatTableDataSource<Cours>;
  isLoading: boolean = true;
  selectedCours?: Cours;
  coursMenu: any;

  constructor(
    private coursService: CoursService,
    private router: Router,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadListCours();
  }

  loadListCours() {
    this.isLoading = true;
    this.coursService.getCours().subscribe((data) => {
      this.cours = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  setSelectedCours(cours: Cours) {
    this.selectedCours = cours;
  }

  handleEdit() {
    this.navigate(['cours', 'edit', '' + this.selectedCours?.codeCours]);
  }

  deleteCours() {
    this.coursService.deleteCours(this.selectedCours!).subscribe((data) => {
      this.snack.open(
        `Cours:  ${this.selectedCours?.libelleCours} avec le numero: ${this.selectedCours?.codeCours} `,
        undefined,
        { duration: 2000 }
      );
      this.loadListCours();
    });
  }

  handleSupprimer() {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Suprresion cours : ' + this.selectedCours?.codeCours,
        confirm: () => this.deleteCours(),
      },
    });
  }
}
