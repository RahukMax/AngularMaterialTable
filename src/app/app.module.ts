import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import {GetuserdataService} from './service/getuserdata.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { AddDataComponent } from './component/add-data/add-data.component';
import {MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AddDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  providers: [GetuserdataService],
  entryComponents:[AddDataComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
