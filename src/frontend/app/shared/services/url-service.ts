import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    private ApiUrl: string = "api";

    constructor(){
    }

    public BuildUrl(route: string, params?: any) : string {
      var url = this.ApiUrl + route;
      if (params) {
        var paramsList: string[] = [];
        paramsList.push('wine_id=' + params.wine_id);

        url += '?' + paramsList.join('&');
      }
      console.log("URL:" + url);
      return url;

    }
}