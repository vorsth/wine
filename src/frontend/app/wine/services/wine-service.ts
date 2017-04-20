import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Wine } from '../models/wine';
import { UrlService } from '../../shared/services/url-service';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class WineService {
  constructor(private http: Http, private urlService: UrlService) { }

  getWineCount(): Promise<number> { 
    return this.http.get(this.urlService.BuildUrl('/wine/metadata'))
               .toPromise()
               .then( response => response.json() as number )
               .catch(this.handleError);
  }

  getAllWines(): Promise<Wine[]>{
    return this.http.get(this.urlService.BuildUrl('/wine'))
               .toPromise()
               .then( response => response.json() as Wine[] )
               .catch(this.handleError);
  }

  getWineDetail(wine_id: number): Promise<any>{
    return this.http.get(this.urlService.BuildUrl('/wine/' + wine_id))
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  addWine(wine: Wine): Promise<any>{
    return this.http.post(this.urlService.BuildUrl('/wine'), wine)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any) : Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
