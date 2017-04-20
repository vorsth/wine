import { Component } from '@angular/core';
import { WineService } from '../services/wine-service';
import { Wine } from '../models/wine';

@Component({
    selector: 'wine-list',
    templateUrl: './wine-list.html'
})
export class WineListComponent{

    private wines: Wine[];

    constructor(private wineService: WineService){
        this.wineService.getAllWines().then( wines => this.wines = wines);
    }
}