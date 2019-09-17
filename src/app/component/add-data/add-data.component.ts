import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig,MatDialogRef} from '@angular/material';
import {AppComponent} from '../../app.component';
import {GetuserdataService} from '../../service/getuserdata.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  name:string;
  email:string;
  username:string;
  website:string;
  constructor(public dialogRef:MatDialogRef<AddDataComponent>,public getData:GetuserdataService) { }

  ngOnInit() {
  }
  onSubmit(f)
  {
    this.getData.addtoData(f);
    console.log("The Form value is",f["value"]);
    if(f["value"])
    {
      console.log("Add insdie the method");
      
    }
    this.onClose();
    
    
  }

  onClose()
  {
    this.dialogRef.close();
  }
}
