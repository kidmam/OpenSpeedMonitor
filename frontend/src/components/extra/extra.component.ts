import { Component, OnInit } from '@angular/core';
import { ExtraService } from "./extra.service";


@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css'],
  providers: [ExtraService]
})
export class ExtraComponent implements OnInit {

  browsers: string;
  systems: string;

  constructor(private extraService: ExtraService) { }

  ngOnInit() {
  }

  showBrowsers() {
    this.extraService.getBrowsers().subscribe(data => this.browsers = JSON.stringify(data, null, 2));
  }

  showSystems() {
    this.extraService.getSystems().subscribe(data => this.systems = JSON.stringify(data, null, 2));
  }

}
