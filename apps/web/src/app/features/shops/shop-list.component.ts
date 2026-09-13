import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { getShopList } from '../../shared/store/app.action';
import { selectShops, selectLoading } from '../../shared/store/app.selector';
import { ShopDTO } from '@mallcity/shared';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  mallId: string = '';
  mallName: string = 'Selected Mall';

  rawShops: ShopDTO[] = [];
  filteredShops: ShopDTO[] = [];

  floors: string[] = ['ALL', 'ground', '1st floor', '2nd floor', '3rd floor'];
  selectedFloor: string = 'ALL';

  categories: string[] = [
    'ALL',
    'Clothes',
    'Restaurant',
    'Kids Zone',
    'Saloon',
    'Electronics',
  ];
  selectedCategory: string = 'ALL';

  loading$: Observable<boolean> = this.store.select(selectLoading);
  private shopSub?: Subscription;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.mallId = params['mallId'] || '';
      this.mallName = params['mallName'] || 'Mall Stores';

      this.store.dispatch(getShopList({ filters: { mallId: this.mallId } }));
    });

    this.shopSub = this.store.select(selectShops).subscribe((shops) => {
      this.rawShops = shops;
      this.applyFilter();
    });
  }

  setFloor(floor: string): void {
    this.selectedFloor = floor;
    this.applyFilter();
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilter();
  }

  resetFilters(): void {
    this.selectedFloor = 'ALL';
    this.selectedCategory = 'ALL';
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredShops = this.rawShops.filter((shop) => {
      const matchesFloor =
        this.selectedFloor === 'ALL' ||
        shop.floorNo.toLowerCase().includes(this.selectedFloor.toLowerCase().split(' ')[0]);

      const matchesCategory =
        this.selectedCategory === 'ALL' ||
        shop.shopType.toLowerCase() === this.selectedCategory.toLowerCase();

      return matchesFloor && matchesCategory;
    });
  }

  onShopImageError(event: any): void {
    event.target.src = 'assets/images/m1.jpg';
  }

  goBack(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    this.shopSub?.unsubscribe();
  }
}
