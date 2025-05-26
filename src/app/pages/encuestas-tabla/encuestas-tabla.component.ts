import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../services/survey.service';
import { Respuesta } from '../../models/surveyModels';

interface ChartDataset {
  data: number[];
  label?: string;
  backgroundColor?: string[] | string;
  borderColor?: string[] | string;
  borderWidth?: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

@Component({
  selector: 'app-encuestas-tabla',
  templateUrl: './encuestas-tabla.component.html',
  styleUrls: ['./encuestas-tabla.component.css']
})
export class EncuestasTablaComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'email', 'seccion', 'pregunta', 'tipoPregunta', 'respuesta', 'opciones'];

  dataSource = new MatTableDataSource<Respuesta>([]);

  tipoPreguntaChartData!: ChartData;
  respuestasPorUsuarioData!: ChartData;
  respuestasPorSeccionData!: ChartData;
  respuestasPorEmailData!: ChartData;
  opcionesRepetidasData!: ChartData;

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.surveyService.getRespuestas().subscribe((respuestas: Respuesta[]) => {
      this.dataSource.data = respuestas;
      this.generarGraficas(respuestas);
    });
  }

  private generarColoresAleatorios(cantidad: number): string[] {
    const colores: string[] = [];
    for (let i = 0; i < cantidad; i++) {
      const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
      colores.push(color);
    }
    return colores;
  }

  generarGraficas(respuestas: Respuesta[]): void {
    const tipoPreguntaCount: Record<string, number> = {};
    const usuarioCount: Record<string, number> = {};
    const seccionCount: Record<string, number> = {};
    const emailCount: Record<string, number> = {};
    const opcionTextCount: Record<string, number> = {};

    respuestas.forEach(r => {
      tipoPreguntaCount[r.tipoPregunta] = (tipoPreguntaCount[r.tipoPregunta] || 0) + 1;
      usuarioCount[r.usuario] = (usuarioCount[r.usuario] || 0) + 1;
      seccionCount[r.seccion] = (seccionCount[r.seccion] || 0) + 1;
      emailCount[r.email] = (emailCount[r.email] || 0) + 1;

      if (Array.isArray(r.opciones)) {
        r.opciones.forEach(opcionTexto => {
          opcionTextCount[opcionTexto] = (opcionTextCount[opcionTexto] || 0) + 1;
        });
      }
    });

    const coloresTipo = this.generarColoresAleatorios(Object.keys(tipoPreguntaCount).length);
    const coloresUsuario = this.generarColoresAleatorios(Object.keys(usuarioCount).length);
    const coloresSeccion = this.generarColoresAleatorios(Object.keys(seccionCount).length);
    const coloresEmail = this.generarColoresAleatorios(Object.keys(emailCount).length);
    const coloresOpciones = this.generarColoresAleatorios(Object.keys(opcionTextCount).length);

    this.tipoPreguntaChartData = {
      labels: Object.keys(tipoPreguntaCount),
      datasets: [{
        label: 'Tipos de Pregunta',
        data: Object.values(tipoPreguntaCount),
        backgroundColor: coloresTipo
      }]
    };

    this.respuestasPorUsuarioData = {
      labels: Object.keys(usuarioCount),
      datasets: [{
        label: 'Respuestas por Usuario',
        data: Object.values(usuarioCount),
        backgroundColor: coloresUsuario
      }]
    };

    this.respuestasPorSeccionData = {
      labels: Object.keys(seccionCount),
      datasets: [{
        label: 'Respuestas por Sección',
        data: Object.values(seccionCount),
        backgroundColor: coloresSeccion
      }]
    };

    this.respuestasPorEmailData = {
      labels: Object.keys(emailCount),
      datasets: [{
        label: 'Respuestas por Email',
        data: Object.values(emailCount),
        backgroundColor: coloresEmail
      }]
    };

    this.opcionesRepetidasData = {
      labels: Object.keys(opcionTextCount),
      datasets: [{
        label: 'Frecuencia de Opciones Seleccionadas',
        data: Object.values(opcionTextCount),
        backgroundColor: coloresOpciones
      }]
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
