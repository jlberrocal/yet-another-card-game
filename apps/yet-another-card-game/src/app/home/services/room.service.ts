import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateRoomDto } from '../../../../../../libs/api-interfaces/src/lib/create-room.dto';
import { Observable } from 'rxjs';
import { GameDto } from '@innoware/api-interfaces';

@Injectable()
export class RoomService {
  private readonly url = `${environment.api}/game`;

  constructor(private http: HttpClient) {
  }

  create(dto: CreateRoomDto): Observable<GameDto> {
    return this.http.post<GameDto>(`${this.url}/create`, dto);
  }

  join(roomName: string): Observable<GameDto> {
    return this.http.patch<GameDto>(`${this.url}/${roomName}/join`, null);
  }
}
