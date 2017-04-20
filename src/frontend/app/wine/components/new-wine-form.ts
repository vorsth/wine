import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Wine } from '../models/wine';
import { WineService } from '../services/wine-service';
import { AuthService } from '../../auth/services/auth-service';


@Component({
    selector: 'new-wine-form',
    templateUrl: './new-wine-form.html'
})
export class NewWineFormComponent{

    private loggedIn : boolean = false;

    ratings = [
      { value:1, "description": "Terrible Beware Of This One" },
      { value:2, "description": "Drinkable If It's The Only Option" },
      { value:3, "description": "Mediocre. Won't Mind Drinking Again" },
      { value:4, "description": "Good. Would Like To Have This Again" },
      { value:5, "description": "Spectacular! Buy At Any Chance" },
    ];

    model: Wine;    submitted: boolean = false;
  
    constructor(private wineService: WineService, private authService: AuthService, private router: Router) {
        this.model = new Wine(0,"",0,"","","", 0);
        authService.check().subscribe(
            (logInStatus : boolean) => {console.log("WS: success" + logInStatus); this.loggedIn = logInStatus},
            () => console.log("WS: fail"),
            () => console.log("WS: complete"),
        );
    }

    onSubmit(){
        this.submitted = true;
        this.wineService.addWine(this.model);
        this.router.navigate(['/wine']);
    }

    toString(){
        return JSON.stringify(this.model);
    }

}