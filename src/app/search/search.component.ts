import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataService.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  filterTerm: string;
  records: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getPropertiesSearch().then((data) => {
      this.records = data;
    });
  }





}
