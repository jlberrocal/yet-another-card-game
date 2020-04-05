import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateRoomDto } from '../../../../../../libs/api-interfaces/src/lib/create-room.dto';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'innoware-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RoomService]
})
export class DashboardComponent {
  constructor(private roomService: RoomService) {
  }

  createRoom(dto: CreateRoomDto) {
    this.roomService.create(dto).subscribe(console.log);
  }

  joinRoom(dto: CreateRoomDto) {
    this.roomService.join(dto.name).subscribe(console.log);
  }
}
