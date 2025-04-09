import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-icon-badge',
  imports: [CommonModule, FormsModule],
  templateUrl: './icon-badge.component.html',
  styleUrl: './icon-badge.component.scss'
})
export class IconBadgeComponent {
  @Input() iconClass: string;
  @Input() variant: 'primary' | 'secondary' | 'custom' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' | 'custom' = 'md';
  @Input() color: string;
  @Input() textColor: string;
  @Input() customSize: string;
  @Input() customHoverColor: string;


  @HostBinding('style.--color') get cssColor(){
    return this.variant === 'custom' ? this.color : null;
  }

  @HostBinding('style.--textColor') get cssTextColor(){
    return this.variant === 'custom' ? this.textColor: null;
  }


  constructor(){
    this.iconClass = 'bi-gear-wide-connected';
    this.color = 'green';
    this.textColor = 'red';
    this.customSize = '';
    this.customHoverColor = '';
  }


  getBadgeClasess(): string{
    let classes = 'badge';

    if(this.variant !== 'custom'){
      classes += ` badge--${this.variant}`;
    }else{
      classes += ' badge--custom';
    }

    if(this.size !== 'custom'){
      classes += ` badge--${this.size}`;
    } else {
      classes += ' badge--custom-size';
    }

    return classes;

  }


}
