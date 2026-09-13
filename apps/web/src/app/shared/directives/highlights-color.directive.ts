import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightsColor]',
})
export class HighlightsColorDirective {
  @Input() appHighlightsColor: string = '#30dd95';
  private originalColor: string = '';

  constructor(private el: ElementRef) {
    this.originalColor = this.el.nativeElement.style.color;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlightsColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.originalColor);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
    this.el.nativeElement.style.transition = 'color 0.2s ease-in-out';
  }
}
