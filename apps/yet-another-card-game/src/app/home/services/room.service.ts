import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateRoomDto } from '../../../../../../libs/api-interfaces/src/lib/create-room.dto';
import { Observable } from 'rxjs';

@Injectable()
export class RoomService {
  private readonly url = `${environment.api}/game`;

  constructor(private http: HttpClient) {
  }

  create(dto: CreateRoomDto): Observable<any> {
    return this.http.post(`${this.url}/create`, dto);
  }

  join(roomName: string): Observable<any> {
    return this.http.patch(`${this.url}/${roomName}/join`, null);
  }
}
