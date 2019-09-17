import { Component,ViewChild,TemplateRef } from '@angular/core';
import {GetuserdataService} from './service/getuserdata.service';
import { MatTableDataSource,MatSort,MatPaginator,MatTable } from '@angular/material';
import {Sort} from '@angular/material/sort';
import {MatDialog,MatDialogConfig,MatDialogRef} from '@angular/material';
import {AddDataComponent} from './component/add-data/add-data.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  title = 'mytableApp';
  listData: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  name:string;
  email:string;
  username:string;
  website:string;
  editedName:string;
  editedobj:{};

  @ViewChild(MatTable,{static:true}) table:MatTable<any>;

  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild('addData',{static:true}) addDatadialog:TemplateRef<any>;
  @ViewChild('editData',{static:true}) editDatadialog:TemplateRef<any>;
  searchKey: string;
  isOpen:false;
  data:any[]=[];
  dummydata:any[]=[];


 datasource:any[]=[];
 displayedColumns: string[] = ['select','Name','Email','UserName','Website','actions'];

  constructor(public getUser:GetuserdataService,public matdialog:MatDialog)
  {
    this.getUser.getUserData().subscribe((res)=>{
      this.datasource.push(res);
      console.log("The DataSource is",this.datasource[0])
      for(let i=0;i<this.datasource[0].length;i++)
      {
        this.dummydata.push(this.datasource[0][i])
      }
      this.listData = new MatTableDataSource(this.dummydata);
      this.listData.sort = this.sort;
      console.log("THe Both Data are",this.datasource,this.dummydata);
      this.listData.paginator = this.paginator;

    })
    
}

//open pop up
openPopup()
{
  console.log("The Pop up is called");
  const dialogopen=new MatDialogConfig();
  dialogopen.disableClose=true;
  dialogopen.autoFocus=true;
  this.matdialog.open(this.addDatadialog,dialogopen);

}

onSearchClear() {
  this.searchKey = "";
  this.applyFilter();
}

applyFilter() {
  this.listData.filter = this.searchKey.trim().toLowerCase();
}

//add data to dataSource
onSubmit(f)
{
  console.log("The Value to be Added",f["value"]);
  this.datasource[0].push(f["value"]);
  
  console.log("The DataSource After add",this.datasource[0]);
  this.listData = new MatTableDataSource(this.datasource[0]);

  this.table.renderRows();
  this.listData.paginator = this.paginator;

  this.matdialog.closeAll();


}


onEdit(f)
{
  this.name=f.name;
  this.editedName=f.name;
  this.email=f.email;
  this.editedobj=f;
  this.username=f.username;
  this.website=f.website;
  
  console.log("The Edit value is",this.editedobj)
  console.log("The Pop up is called");
  const dialogopen=new MatDialogConfig();
  dialogopen.disableClose=true;
  dialogopen.autoFocus=true;
 
  this.matdialog.open(this.editDatadialog,dialogopen);
}

//Save Edited Data
onEditData(ele)
{
  console.log("The Edited Value is",ele["value"].name);
  this.datasource[0].forEach((element)=>{
    if(element.name == this.editedName)
    {
      console.log("The Element name before update",element);
      console.log("The Edited Value is",this.name);
      element.name=ele["value"].name;
      element.email=ele["value"].email;
      element.username=ele["value"].username;
      element.website=ele["value"].website;
      console.log("The Element name after Update",element.name);
    }
  })
  this.matdialog.closeAll();

  
}

//delete the data
ondelete(rowData){
  this.data=this.dummydata;
  console.log("The Data",this.data,this.datasource[0])
  console.log("The Row Data",rowData.id)
  console.log("THe Data to be Deleted is",this.datasource[0][rowData.id]);
  this.datasource=[];
  this.datasource=this.data.filter((ele)=>{
    return ele.id !== rowData.id;
  })
  console.log("The DataSource is",this.datasource);
}

//delete
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.datasource.length;
  return numSelected === numRows;
}
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.datasource.forEach(row => this.selection.select(row));
}

removeSelectedRows(row) {

  this.data=this.datasource[0];
  this.selection.selected.forEach(item => {
    console.log("The data is",this.data,item.id);
   let index: number = this.data.findIndex(d => d.id === item.id);
   console.log("The Index is",index);
    console.log(this.data.findIndex(d => d!= item));
    console.log(this.data.splice(index,1));
    this.datasource=[];
    for(let i=0;i<this.data.length;i++)
    {
      this.datasource.push(this.data[i]);
    }
    

    
  });
  console.log("The Data After Deletion is",this.data,this.datasource);
  this.selection = new SelectionModel<Element>(true, []);
}
}

