import { HttpClient } from '@angular/common/http';
import { Injectable ,Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../../environments/environment';

function _window(): any {
  // return the global native browser window object
  return window;
}


@Injectable({
  providedIn: 'root'
})
export class PaysService {
baseUrl:any=environment.url;
visible: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object,private http: HttpClient) { 
    this.visible = false;
  }


  order_id(payload:any) {

    return this.http.post(`${this.baseUrl}/orderPayment`,payload);
   }
   verify(params){
    return this.http.post(`${this.baseUrl}/verifyPayment`,params);
   }


   get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }
}
