import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Salle } from '../models/Salle';
import { SallesService } from '../services/salles.service';

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css'],
})
export class SallesComponent implements OnInit {
  displayedColumns: string[] = ['numSalle', 'nomSalle', 'cpctSalle'];
  salles?: MatTableDataSource<Salle>;
  isLoading: boolean = true;
  selectedSalle?: Salle;
  salleMenu: any;

  constructor(
    private salleService: SallesService,
    private router: Router,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadListSalle();
  }

  loadListSalle() {
    this.isLoading = true;
    this.salleService.getSalles().subscribe((data) => {
      this.salles = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  setSelectedSalle(salle: Salle) {
    this.selectedSalle = salle;
  }

  handleEdit() {
    this.navigate(['salle', 'edit', '' + this.selectedSalle?.numSalle]);
  }

  deleteSalle() {
    this.salleService.deleteSalle(this.selectedSalle!).subscribe((data) => {
      this.snack.open(
        `Salle:  ${this.selectedSalle?.nomSalle} avec le numero: ${this.selectedSalle?.numSalle}`,
        undefined,
        { duration: 2000 }
      );
      this.loadListSalle();
    });
  }

  handleSupprimer() {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Suprresion salle : ' + this.selectedSalle?.numSalle,
        confirm: () => this.deleteSalle(),
      },
    });
  }
}
