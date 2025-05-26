import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module'; // Mantén esta importación
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { EncuestasTablaComponent } from './pages/encuestas-tabla/encuestas-tabla.component';
import { ConfirmarEliminarDialogComponent } from './components/confirmar-eliminar-dialog/confirmar-eliminar-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';







@NgModule({
  declarations: [
    AppComponent,
    ConfirmarEliminarDialogComponent,








     // No incluyas InputFieldComponent aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule, // Asegúrate de importar el SharedModule
    FormsModule,
    MatSnackBarModule,  // Incluir MatSnackBarModule
    MatButtonModule,    // Incluir MatButtonModule si usas botones
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
