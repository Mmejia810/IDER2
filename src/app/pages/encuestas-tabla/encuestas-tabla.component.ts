import { SurveyService } from './../../services/survey.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Respuesta } from '../../models/surveyModels';


@Component({
  selector: 'app-encuestas-tabla',
  templateUrl: './encuestas-tabla.component.html',
  styleUrls: ['./encuestas-tabla.component.css']
})
export class EncuestasTablaComponent implements OnInit {

  displayedColumns: string[] = [
    'usuario',
    'email',
    'seccion',
    'pregunta',
    'tipoPregunta',
    'respuesta',
    'opciones'
  ];

  dataSource = new MatTableDataSource<any>();

  constructor(private SurveyService: SurveyService) {}

  ngOnInit(): void {
    this.SurveyService.getRespuestas().subscribe((respuestas: Respuesta[]) => {
  this.dataSource.data = respuestas;
});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
