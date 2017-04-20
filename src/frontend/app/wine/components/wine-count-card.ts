import { Component, NgZone } from '@angular/core';
import { WineService } from '../services/wine-service';
import { AuthService } from '../../auth/services/auth-service';

@Component({
  selector: 'wine-count-card',
  templateUrl: './wine-count-card.html'
})
export class WineCountCardComponent {

  bottleCount: number;
  private IsLoggedIn : boolean = false;

  constructor(private wineService: WineService, private authService: AuthService, private zone : NgZone) {
    this.wineService.getWineCount().then( bc => this.bottleCount = bc);
    this.authService.check().subscribe(
        (s : boolean) => { this.zone.run( () => { this.IsLoggedIn = s; } )},
        (f : any) => console.log("Check F: " + f),
        (c : any) => console.log("Check C: " + c)
    );
  }
}
