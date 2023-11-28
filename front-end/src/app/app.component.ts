import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion_PFE';
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;
  }
}
