import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ClassService } from '../service/classes.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user: any;
  public classes: any;
  qrCodeUrl: string = ''; // Guardar la URL del QR
  selectedClass: any = null; // Guardar la clase seleccionada
  isModalOpen: boolean = false; // Estado para controlar el modal

  constructor(
    private authService: AuthService,
    private classService: ClassService,
    private router: Router,
    private barcodeScanner: BarcodeScanner // Inyectar el servicio de escáner
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getClasses();
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  irAListaAlumnos(): void {
    this.router.navigate(['/lista-alumnos']);
  }

  getUserData(): void {
    const userData = this.authService.getUserData();
    this.user = userData;
    console.log(this.user);
  }

  openCamera() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log('Escaneo cancelado');
        return;
      }

      console.log('Código escaneado:', barcodeData.text);

      // Parsear el JSON del QR
      const qrData = JSON.parse(barcodeData.text);

      // Agregar el student_id del usuario autenticado
      const attendanceData = {
        class_id: qrData.class_id,
        timestamp: qrData.timestamp,
        student_id: this.user.id, // Agrega el ID del estudiante desde la sesión
      };

      // Enviar los datos a la API para registrar la asistencia
      this.classService.attendClass(attendanceData).subscribe(
        (response) => {
          console.log('Asistencia registrada:', response);
          alert('Asistencia registrada exitosamente');
        },
        (error) => {
          console.error('Error al registrar la asistencia:', error);
          alert('No se pudo registrar la asistencia');
        }
      );
    }).catch((err) => {
      console.error('Error al abrir la cámara:', err);
      alert('Error al abrir la cámara');
    });
  }


  generateQR(classId: string): void {
    const data = {
      class_id: classId,
    };
    this.classService.generateQRCode(data).subscribe((response) => {
      this.qrCodeUrl = response.url; // Obtén la URL del QR desde la respuesta
      this.selectedClass = this.classes.find((cls: any) => cls.id === classId); // Guarda la clase seleccionada
      this.isModalOpen = true; // Abre el modal
    });
  }

  closeModal(): void {
    this.isModalOpen = false; // Cierra el modal
    this.qrCodeUrl = ''; // Limpia la URL al cerrar
  }

  getClasses(): void {
    this.classService.getClasses('classes').subscribe((data) => {
      const classes = data.classes;
      console.log(classes);
      const filteredClasses = classes.filter(
        (c: any) => c.teacher_id === this.user.id
      );
      this.classes = filteredClasses;
    });
  }
}
