import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  // Evento para iniciar el arrastre
  onDragStart(event: DragEvent) {
    const draggableElement = event.target as HTMLElement;
    event.dataTransfer?.setData('text/plain', draggableElement.id);
    event.dataTransfer!.effectAllowed = 'move';

    // Aseguramos que el objeto se elimina visualmente de su contenedor
    draggableElement.style.position = 'absolute';  // Para que no interfiera con el flujo
    draggableElement.style.zIndex = '1000';  // Hace que se quede en la parte superior durante el arrastre
  }

  // Evento cuando el elemento se arrastra sobre una dropzone
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';

    const draggableElement = document.getElementById('draggable-item') as HTMLElement;
    const dropzone = event.target as HTMLElement;

    // Obtener las coordenadas del mouse dentro de la dropzone
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calcular la posición relativa del mouse dentro de la dropzone
    const rect = dropzone.getBoundingClientRect();
    const offsetX = mouseX - rect.left;
    const offsetY = mouseY - rect.top;

    // Posicionar el elemento arrastrado de acuerdo al mouse dentro de la dropzone
    draggableElement.style.left = `${offsetX - draggableElement.offsetWidth / 2}px`;
    draggableElement.style.top = `${offsetY - draggableElement.offsetHeight / 2}px`;
  }

  // Evento cuando el elemento es soltado sobre una dropzone
  onDrop(event: DragEvent) {
    event.preventDefault();

    const data = event.dataTransfer?.getData('text/plain');
    const draggableElement = document.getElementById(data!) as HTMLElement;
    const dropzone = event.target as HTMLElement;

    // Verificar si la dropzone es válida
    if (dropzone.classList.contains('dropzone1')) {

      // Eliminar el elemento de su zona anterior
      const currentParent = draggableElement.parentElement;
      if (currentParent) {
        currentParent.removeChild(draggableElement);  // Elimina el elemento de su zona original
      }

      // Usamos setTimeout para permitir que el DOM se actualice antes de mover el elemento
      setTimeout(() => {
        // Añadir el elemento a la nueva dropzone
        dropzone.appendChild(draggableElement);

        // Asegurar que el elemento quede con su estilo original
        draggableElement.style.position = 'relative';
        draggableElement.style.left = '0px';  // Resetea la posición
        draggableElement.style.top = '0px';   // Resetea la posición
        draggableElement.style.zIndex = '1';  // Vuelve a la capa original
      }, 0);

      // Mostrar en consola el data-id de la zona donde se soltó
      const dropzoneId = dropzone.getAttribute('data-id');
      console.log('Elemento soltado en la zona de drop con data-id:', dropzoneId);
    }
  }
}
