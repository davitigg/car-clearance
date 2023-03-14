import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchDisplay = false;

  toggleSearch() {
    this.searchDisplay = true;
  }
  closeSearch() {
    this.searchDisplay = false;
  }
}
