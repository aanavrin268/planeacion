import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  ciudad: string;
  pais: string;
  telefono: string;
  empresa: string;
  puesto: string;
  salario: number;
}

@Component({
  selector: 'app-table1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table1.component.html',
  styleUrl: './table1.component.scss'
})
export class Table1Component implements OnInit {
  usuarios: Usuario[] = [];
  columnas: {key: string, title: string}[] = [
    { key: 'id', title: 'ID' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'apellido', title: 'Apellido' },
    { key: 'email', title: 'Email' },
    { key: 'ciudad', title: 'Ciudad' },
    { key: 'pais', title: 'País' },
    { key: 'telefono', title: 'Teléfono' },
    { key: 'empresa', title: 'Empresa' },
    { key: 'puesto', title: 'Puesto' },
    { key: 'salario', title: 'Salario' }
  ];
  
  columnaDrag: number | null = null;
  
  ngOnInit() {
    this.cargarDatos();
  }
  
  cargarDatos() {
    this.usuarios = [
      { id: 1, nombre: 'Ana', apellido: 'García', email: 'ana.garcia@email.com', ciudad: 'Madrid', pais: 'España', telefono: '612-345-678', empresa: 'TechSolutions', puesto: 'Desarrollador Frontend', salario: 45000 },
      { id: 2, nombre: 'Carlos', apellido: 'Rodríguez', email: 'carlos.rodriguez@email.com', ciudad: 'Barcelona', pais: 'España', telefono: '623-456-789', empresa: 'DataSystems', puesto: 'Analista de Datos', salario: 52000 },
      { id: 3, nombre: 'Lucía', apellido: 'Martínez', email: 'lucia.martinez@email.com', ciudad: 'Valencia', pais: 'España', telefono: '634-567-890', empresa: 'WebDevelopment', puesto: 'Diseñador UX/UI', salario: 48000 },
      { id: 4, nombre: 'Miguel', apellido: 'López', email: 'miguel.lopez@email.com', ciudad: 'Sevilla', pais: 'España', telefono: '645-678-901', empresa: 'CloudServices', puesto: 'DevOps Engineer', salario: 55000 },
      { id: 5, nombre: 'Laura', apellido: 'Fernández', email: 'laura.fernandez@email.com', ciudad: 'Bilbao', pais: 'España', telefono: '656-789-012', empresa: 'MobileTech', puesto: 'Desarrollador Mobile', salario: 50000 },
      { id: 6, nombre: 'Pablo', apellido: 'Sánchez', email: 'pablo.sanchez@email.com', ciudad: 'Zaragoza', pais: 'España', telefono: '667-890-123', empresa: 'AISolutions', puesto: 'Ingeniero IA', salario: 60000 },
      { id: 7, nombre: 'Elena', apellido: 'Díaz', email: 'elena.diaz@email.com', ciudad: 'Málaga', pais: 'España', telefono: '678-901-234', empresa: 'SecuritySystems', puesto: 'Especialista en Ciberseguridad', salario: 58000 },
      { id: 8, nombre: 'Daniel', apellido: 'Pérez', email: 'daniel.perez@email.com', ciudad: 'Murcia', pais: 'España', telefono: '689-012-345', empresa: 'NetworkSolutions', puesto: 'Administrador de Redes', salario: 46000 },
      { id: 9, nombre: 'Sara', apellido: 'González', email: 'sara.gonzalez@email.com', ciudad: 'Granada', pais: 'España', telefono: '690-123-456', empresa: 'DataAnalytics', puesto: 'Data Scientist', salario: 62000 },
      { id: 10, nombre: 'Javier', apellido: 'Hernández', email: 'javier.hernandez@email.com', ciudad: 'Alicante', pais: 'España', telefono: '601-234-567', empresa: 'SoftwareConsulting', puesto: 'Consultor de Software', salario: 54000 }
    ];
  }
  
  iniciarDrag(index: number): void {
    this.columnaDrag = index;
  }
  
  soltarColumna(index: number): void {
    if (this.columnaDrag !== null && this.columnaDrag !== index) {
      const columnaArrastrada = this.columnas[this.columnaDrag];
      this.columnas.splice(this.columnaDrag, 1);
      this.columnas.splice(index, 0, columnaArrastrada);
    }
    this.columnaDrag = null;
  }
  
  permitirSoltar(event: DragEvent): void {
    event.preventDefault();
  }
  
  obtenerValorCelda(usuario: Usuario, key: string): any {
    return usuario[key as keyof Usuario];
  }
}