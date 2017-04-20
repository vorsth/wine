import { Component, NgZone } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service';

@Component({
    selector: 'user-card',
    templateUrl: './user-card.html'
})
export class UserCardComponent {

    private IsLoggedIn : boolean = false;

    constructor(private authService: AuthService, private zone: NgZone){
        this.authService.check().subscribe(
            (success : boolean) => { this.zone.run( () => this.IsLoggedIn = success )},
            (failure : any) => console.log("Check F: " + failure),
            (complete : any) => console.log("Check C: " + complete)
        );
    }
}