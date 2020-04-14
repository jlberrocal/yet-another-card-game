import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateRoomDto } from '@innoware/api-interfaces';

@Component({
  selector: 'innoware-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomFormComponent {
  @Input()
  label: string;

  @Output()
  createRoom = new EventEmitter<CreateRoomDto>();

  form: FormGroup;



  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    })
  }

  submit() {
    this.createRoom.emit(this.form.value);
  }
}
