import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'innoware-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  isSmallerThanMedium = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
    map(({ matches }) => matches),
    shareReplay()
  );

  newRoom: FormGroup;

  roomName: FormControl;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.newRoom = new FormGroup({
      name: new FormControl(null, Validators.required),
      capacity: new FormControl(null, [
        Validators.required,
        Validators.min(3),
        Validators.max(6)
      ])
    });

    this.roomName = new FormControl(null, Validators.required)
  }
}
