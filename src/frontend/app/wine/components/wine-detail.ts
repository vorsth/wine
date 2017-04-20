import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Wine, Comment } from '../models/wine';
import { WineService } from '../services/wine-service';
import { Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'wine-detail',
    templateUrl: './wine-detail.html'
})
export class WineDetailComponent implements OnInit {

    wine: Wine;
    comments: Comment[];

    ngOnInit() : void {
        this.route.params
            .switchMap( (params: Params) => this.wineService.getWineDetail(+params['id']))
            .subscribe( result => {
                this.wine = result.wine as Wine;
                this.comments = result.comments as Comment[];
            });
    }

    constructor(private route: ActivatedRoute, private wineService: WineService){
        this.wine = new Wine(0,"",0,"","","",0, "");
        this.comments = [];
    }
}