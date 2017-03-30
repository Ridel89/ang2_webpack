import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class HTTPTestService {
    private options;

    constructor(private _http: Http) { }
    
    public getCurrentTime() {
        return this._http.get('http://date.jsontest.com/')
            .map( (res) => res.json());
    };

    public getCurrentTimeByPromise() {
        return this._http.get('http://date.jsontest.com/')
            .toPromise()
            .then( (res) => res.json());
    };

    public postJson() {
        let json = JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        });
        let params = 'data=' + json;
        let header = new Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');

        return this._http.post('http://jsonplaceholder.typicode.com/posts', params, {
            headers: header
        })
            .map( (res) => res.json());
    };

    public getPosts(){
        this.addHeaders();
        return this._http.get('https://jsonplaceholder.typicode.com/posts'
            , this.options)
            .map( (res: Response) => {
                return res.json();
            }).catch(this.handleError);
    }

    private addHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: headers });
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}