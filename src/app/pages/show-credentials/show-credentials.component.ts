import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-credentials',
  templateUrl: './show-credentials.component.html',
  styleUrls: ['./show-credentials.component.css'],
})
export class ShowCredentialsComponent implements OnInit {
  userProfile: any;
  errorMessage: string = '';
  isSidebarActive: boolean = false;
  isEditing: boolean = false; 

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  fetchUserProfile() {
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.errorMessage = 'Error al cargar el perfil.';
      },
    });
  }

  editProfile() {
    this.isEditing = true;
  }

  saveChanges() {
    
    this.authService.updateUserProfile(this.userProfile).subscribe({
      next: () => {
        this.isEditing = false;
        console.log('Perfil actualizado con éxito');
      },
      error: (err) => {
        console.error('Error al guardar cambios:', err);
        this.errorMessage = 'Error al guardar los cambios.';
      },
    });
  }

  logOut(): void {
    console.log('Sesión cerrada');
    
  }
}
