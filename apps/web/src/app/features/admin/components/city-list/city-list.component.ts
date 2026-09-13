import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CityDTO } from '@mallcity/shared';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'state', 'cityCode', 'edit'];
  dataSource = new MatTableDataSource<CityDTO>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _cityList: CityDTO[] = [];
  @Input() set cityListInput(value: CityDTO[]) {
    this._cityList = value || [];
    this.dataSource.data = this._cityList;
  }
  get cityListInput(): CityDTO[] {
    return this._cityList;
  }

  @Output() editCity = new EventEmitter<CityDTO>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handleEditCity(city: CityDTO) {
    this.editCity.emit(city);
  }
}
