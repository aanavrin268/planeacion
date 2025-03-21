import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { gsap } from 'gsap';


@Component({
  selector: 'app-dash-reports',
  imports: [CommonModule],
  templateUrl: './dash-reports.component.html',
  styleUrl: './dash-reports.component.scss'
})
export class DashReportsComponent {




  cards: number[] = [];
  nextCardId = 1;


  constructor(){}

 

  addCard() {
    this.cards.push(this.nextCardId);
    this.nextCardId++;
    this.animateCardAppearance(this.cards.length - 1);
  }

  moveCardToBottom(cardId: number) {
    const index = this.cards.indexOf(cardId);
    if (index !== -1) {
      this.cards.splice(index, 1);
      this.cards.unshift(cardId);
      this.animateCardMovement(cardId);
    }
  }

  animateCardAppearance(index: number) {
    gsap.from(`.card:nth-child(${index + 1})`, {
      opacity: 0,
      y: -50,
      scale: 0.8,
      rotation: -10,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  }

  animateCardMovement(cardId: number) {
    const cardElement = document.querySelector(`.card[data-card-id="${cardId}"]`);
    if (cardElement) {
      gsap.to(cardElement, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }

  
}



