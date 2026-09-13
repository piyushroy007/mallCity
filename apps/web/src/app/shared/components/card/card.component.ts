import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() imageUrl: string = '';
  @Input() content: string = '';
  @Input() badge: string = '';

  onImageError(event: any) {
    event.target.src = 'assets/images/m1.jpg'; // fallback
  }
}
