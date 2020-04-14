import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './models/dialog-data';
import { GameDto } from '@innoware/api-interfaces';

@Component({
  selector: 'innoware-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent implements OnInit {
  title: string;
  text: string;
  textParams: GameDto;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<GameDto>) {
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.text = this.data.text;
    this.textParams = this.data.textParams;
  }

}
