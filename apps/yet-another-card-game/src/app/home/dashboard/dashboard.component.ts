import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateRoomDto } from '../../../../../../libs/api-interfaces/src/lib/create-room.dto';
import { RoomService } from '../services/room.service';
import { GameDto } from '@innoware/api-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'innoware-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RoomService]
})
export class DashboardComponent {
  constructor(private roomService: RoomService, private router: Router) {
  }

  createRoom(dto: CreateRoomDto) {
    this.roomService.create(dto).subscribe(game => this.router.navigateByUrl(`/game/${game.id}`));
  }

  joinRoom(dto: CreateRoomDto) {
    this.roomService.join(dto.name).subscribe(game => this.router.navigateByUrl(`/game/${game.id}`));
  }
}
