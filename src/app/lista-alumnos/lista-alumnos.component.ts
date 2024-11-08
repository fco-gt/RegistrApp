import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service'; // Importa el servicio de usuarios
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent implements OnInit {
  alumnos: any[] = []; // Para almacenar los alumnos obtenidos de la API

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    // Llamar al servicio para obtener la lista de alumnos al inicializar el componente
    this.usersService.getUsers().subscribe((data) => {
      this.alumnos = data; // Asigna los datos de la API a la variable alumnos
    });
  }

  goToHome() {
    this.router.navigate(['/home']);  // Cambia la ruta si es necesario
  }
}
