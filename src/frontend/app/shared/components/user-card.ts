import { Component, NgZone } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service';
import { User } from '../../auth/models/user';

@Component({
    selector: 'user-card',
    templateUrl: './user-card.html'
})
export class UserCardComponent {

    private _isLoggedIn : boolean = false;
    private _user : User;

    constructor(private authService: AuthService, private zone: NgZone){
        this.authService.check().subscribe(
            (success : boolean) => { this.zone.run( () => this._isLoggedIn = success )},
            (failure : any) => console.log("Check F: " + failure),
            (complete : any) => console.log("Check C: " + complete)
        );

        this.authService.user().subscribe(
            (user : User) => { this.zone.run( () => {this._user = user;})},
            (failure : any) => console.log("Check F: " + failure),
            (complete : any) => console.log("Check C: " + complete)
        );
    }
}