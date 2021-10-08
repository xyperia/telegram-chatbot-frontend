import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './delete-confirm.component.html'
})
export class DeleteConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //console.log(this.data);
  }

  delete(ops: number){
    if(ops == 0){
      this.data.isDelete = false;
    } else {
      this.data.isDelete = true;
    }
    this.dialogRef.close(this.data.isDelete);
  }

}
