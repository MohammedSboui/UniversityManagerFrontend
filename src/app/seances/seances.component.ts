import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Seance } from '../models/Seance';
import { SeancesService } from '../services/seances.service';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css'],
})
export class SeancesComponent implements OnInit {
  displayedColumns: string[] = [
    'idSeance',
    'dureSeance',
    'sateSeance',
    'enseignant',
    'salle',
    'groupe',
  ];
  seances?: MatTableDataSource<Seance>;
  isLoading: boolean = true;
  selectedSeance?: Seance;
  seanceMenu: any;

  constructor(
    private seanceService: SeancesService,
    private router: Router,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadListSeance();
  }

  loadListSeance() {
    this.isLoading = true;
    this.seanceService.getSeances().subscribe((data) => {
      this.seances = new MatTableDataSource(data);
      this.isLoading = false;
    });
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  setSelectedSeance(seance: Seance) {
    this.selectedSeance = seance;
  }

  handleEdit() {
    this.navigate(['seance', 'edit', '' + this.selectedSeance?.idSeance]);
  }

  deleteSeance() {
    this.seanceService.deleteSeance(this.selectedSeance!).subscribe((data) => {
      this.snack.open(`Seance:  ${this.selectedSeance?.idSeance}`, undefined, {
        duration: 2000,
      });
      this.loadListSeance();
    });
  }

  handleSupprimer() {
    this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Suprresion seance : ' + this.selectedSeance?.idSeance,
        confirm: () => this.deleteSeance(),
      },
    });
  }
}
