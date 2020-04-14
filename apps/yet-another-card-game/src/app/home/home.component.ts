import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRoomDto, GameDto } from '@innoware/api-interfaces';
import { RoomService } from './services/room.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from '../shared/components/confirmation-dialog/models/dialog-data';

@Component({
  selector: 'innoware-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RoomService]
})
export class HomeComponent implements OnInit {
  rooms: Observable<GameDto[]>;

  constructor(private roomService: RoomService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.rooms = this.roomService.availableRooms();
  }

  createRoom(dto: CreateRoomDto) {
    this.roomService.create(dto).subscribe(game => this.router.navigateByUrl(`/game/${game.id}`));
  }

  joinRoom(dto: GameDto) {
    const dialog = this.dialog.open<ConfirmationDialogComponent, DialogData<GameDto>, boolean>(ConfirmationDialogComponent, {
      data: {
        title: 'confirmation.labels.title',
        text: 'confirmation.labels.text',
        textParams: dto
      }
    });

    const subs = dialog.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.router.navigateByUrl(`game/${dto.id}`)
          .catch(err => console.error(err))
          .then(v => console.log('navigated', v));
      }
      subs.unsubscribe();
    });
  }
}
