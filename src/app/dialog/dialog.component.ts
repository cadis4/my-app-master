import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>) {}

    onStartQuiz() {
      this.dialogRef.close(true); 
    }
  
    onCancel(): void {
      this.dialogRef.close(); 
    }

 
}
