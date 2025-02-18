import { Component } from '@angular/core';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css']
})
export class DraggableComponent {

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', (event.target as HTMLElement).id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    const draggableElement = document.getElementById(data!);
    const dropzone = event.target as HTMLElement;
  
    if (dropzone.classList.contains('dropzone')) {
      dropzone.appendChild(draggableElement!);
  
      const dropzoneId = dropzone.getAttribute('data-id');
      console.log('Elemento soltado en la zona de drop con data-id:', dropzoneId);
    }
  }
  
  
  
}
