import { AfterViewInit, Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'innoware-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private socket: Socket) {}

  ngAfterViewInit(): void {
    this.socket.emit('message', 'hello world', (r) => {
      console.log(r);
    });
  }
}
