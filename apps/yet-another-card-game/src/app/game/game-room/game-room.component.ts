import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { Card, SocketEvents, UserDto } from '@innoware/api-interfaces';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ifProd } from '../../shared/rxjs-operators/if-prod';
import { delayedConcat } from '../../shared/rxjs-operators/delayed-concat';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'innoware-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameRoomComponent implements OnInit, OnDestroy {
  cards = new BehaviorSubject<Card[]>([]);

  private subscriptions = new Subscription();
  private socket: Socket;
  private readonly user: UserDto;
  readonly isHandSet$: Observable<boolean>

  constructor(private route: ActivatedRoute,
              private jwt: JwtHelperService,
              private snackBar: MatSnackBar,
              private breakpointObserver: BreakpointObserver) {
    const token = jwt.tokenGetter();
    this.user = jwt.decodeToken(token);
    this.isHandSet$ = this.breakpointObserver
      .observe(Breakpoints.HandsetLandscape)
      .pipe(
        map(({ matches }) => matches),
        shareReplay()
      )
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(({ id }: any) => {
          this.socket = new Socket({
            url: `${environment.socket}/game-${id}`
          });
          this.socket.on('connect_error', () => alert('failed to connect'))
          return id;
        })
      )
      .subscribe(roomId => this.afterSocketCreation(roomId));
  }

  afterSocketCreation(roomId: string) {
    const data = {
      ...this.user,
      room: roomId
    };

    this.socket.emit(SocketEvents.JOIN, data);

    this.subscriptions.add(
      this.socket.fromEvent(SocketEvents.READY2DEAL)
        .subscribe(() => this.emitDealEvent(roomId))
    );

    this.subscriptions.add(
      this.socket.fromEvent(SocketEvents.CARD)
        .pipe(ifProd(delayedConcat(500)))
        .subscribe((resp: Card) => {
          const {value} = this.cards;
          this.cards.next([...value, resp])
        })
    );
  }

  private emitDealEvent(roomId: string) {
    const snackBarRef = this.snackBar.open('Message archived', 'deal', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
    const subs = snackBarRef.onAction().subscribe(() => {
      this.socket.emit(SocketEvents.DEAL, roomId);
      subs.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
