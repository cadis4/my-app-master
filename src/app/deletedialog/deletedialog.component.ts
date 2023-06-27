import { Component, Input} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.css']
})
export class DeletedialogComponent {

  @Input() message: string = "";

  constructor(
    public dialogRef: MatDialogRef<DeletedialogComponent>
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onClickSubmit() {
    this.dialogRef.close(true);
  }
}