import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateRoomDto, GameDto } from '@innoware/api-interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class RoomService {
  private readonly url = `${environment.api}/game`;

  constructor(private http: HttpClient) {
  }

  availableRooms(): Observable<GameDto[]> {
    return this.http.get<GameDto[]>(this.url);
  }

  create(dto: CreateRoomDto): Observable<GameDto> {
    return this.http.post<GameDto>(`${this.url}/create`, dto);
  }

  join(roomName: string): Observable<GameDto> {
    return this.http.patch<GameDto>(`${this.url}/${roomName}/join`, null);
  }
}
