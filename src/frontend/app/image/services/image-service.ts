import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FileUploader } from 'ng2-file-upload';

import { Wine } from '../../wine/models/wine';
import { UrlService } from '../../shared/services/url-service';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ImageService {

    private _boundary = "AaB03x";

    constructor(private http: Http, private urlService: UrlService) {
    }

    UploadImage(fileName: string, type: string, imageData:any) : Observable<number[]> {
        console.log("ImageService.UploadImage");
        let headers = new Headers({
            'Content-Type': 'mulitpart/form-data; boundary=' + this._boundary
        });
        let options = new RequestOptions({headers: headers});

        var body = "--" + this._boundary + "\r\n" + 
        'Content-Disposition: form-data; name="imageFile"; filename="TestFile.png"\r\n' +
        'Content-Type: application/octet-stream\r\n\r\n' +
        imageData + '\r\n' +
        "--" + this._boundary + '--\r\n';

        return this.http.post(this.urlService.BuildUrl('/image'), imageData, options)
                        .map((res: Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }

}