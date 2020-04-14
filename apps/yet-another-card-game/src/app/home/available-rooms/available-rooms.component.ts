import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { listAnimation } from '../../utils/list-animation';
import { DetailedGame } from './models/detailed-game';
import { GameDto } from '@innoware/api-interfaces';

@Component({
  selector: 'innoware-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listAnimation]
})
export class AvailableRoomsComponent {
  @Input()
  rooms$: Observable<DetailedGame[]>;

  @Output()
  joinRoom = new EventEmitter<GameDto>()

  toggleRoom(room: DetailedGame, rooms: DetailedGame[]) {
    rooms.forEach(r => {
      if (r !== room) {
        r.details = false;
      } else {
        r.details = !r.details;
      }
    });
  }

  join(event: MouseEvent, room: DetailedGame) {
    event.stopPropagation();
    this.joinRoom.emit(room);
  }
}
