import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComparisonComponent} from './page-comparison.component';
import {HttpClientModule} from "@angular/common/http";
import {PageComparisonRowComponent} from "./page-comparison-row/page-comparison-row.component";
import {JobGroupRestService} from "../setup-dashboard/service/rest/job-group-rest.service";

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  declarations: [PageComparisonComponent, PageComparisonRowComponent],
  providers: [
    { provide: 'components', useValue: [PageComparisonComponent], multi: true}, JobGroupRestService
  ],
  entryComponents: [PageComparisonComponent]
})
export class PageComparisonModule { }