import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MallDTO } from '@mallcity/shared';

@Component({
  selector: 'app-mall-admin-list',
  templateUrl: './mall-list.component.html',
  styleUrls: ['./mall-list.component.scss'],
})
export class MallAdminListComponent implements AfterViewInit {
  displayedColumns: string[] = ['image', 'name', 'city', 'noOffloor', 'address'];
  dataSource = new MatTableDataSource<MallDTO>([]);
  searchQuery: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _mallList: MallDTO[] = [];
  @Input() set mallListInput(value: MallDTO[]) {
    this._mallList = value || [];
    this.dataSource.data = this._mallList;
  }
  get mallListInput(): MallDTO[] {
    return this._mallList;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: MallDTO, filter: string) => {
      const term = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(term) ||
        data.city.toLowerCase().includes(term) ||
        data.address.toLowerCase().includes(term)
      );
    };
  }

  applyFilter() {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.searchQuery = '';
    this.applyFilter();
  }

  getImageUrl(path?: string): string {
    if (!path) return 'assets/images/m1.jpg';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/uploads')) return `http://localhost:5000${path}`;
    return path;
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/m1.jpg';
  }
}
