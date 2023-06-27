import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-submit',
  templateUrl: './dialog-submit.component.html',
  styleUrls: ['./dialog-submit.component.css'],
})
export class DialogSubmitComponent {

  constructor(
    private dialogRef: MatDialogRef<DialogSubmitComponent>) {}

    onYes() {
      this.dialogRef.close(true); 
    }
  
    onNo(): void {
      this.dialogRef.close(); 
    }
}
