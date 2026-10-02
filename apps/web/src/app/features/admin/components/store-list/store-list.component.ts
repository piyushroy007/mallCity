import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ShopDTO } from '@mallcity/shared';

@Component({
  selector: 'app-store-admin-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreAdminListComponent implements AfterViewInit {
  displayedColumns: string[] = ['image', 'name', 'mallName', 'city', 'floorNo', 'shopType', 'contactNumber'];
  dataSource = new MatTableDataSource<ShopDTO>([]);
  searchQuery: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _storeList: ShopDTO[] = [];
  @Input() set storeListInput(value: ShopDTO[]) {
    this._storeList = value || [];
    this.dataSource.data = this._storeList;
  }
  get storeListInput(): ShopDTO[] {
    return this._storeList;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: ShopDTO, filter: string) => {
      const term = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(term) ||
        data.mallName.toLowerCase().includes(term) ||
        data.city.toLowerCase().includes(term) ||
        data.shopType.toLowerCase().includes(term) ||
        (data.contactNumber ? data.contactNumber.toLowerCase().includes(term) : false)
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
