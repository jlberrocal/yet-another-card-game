import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import {SocketIoModule} from 'ngx-socket-io';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, SocketIoModule.forRoot({
    url: environment.socket
  })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
