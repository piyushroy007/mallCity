import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getMallList } from '../../shared/store/app.action';
import { selectMalls, selectLoading } from '../../shared/store/app.selector';
import { MallDTO } from '@mallcity/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mall-list',
  templateUrl: './mall-list.component.html',
  styleUrls: ['./mall-list.component.scss'],
})
export class MallListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private toastr = inject(ToastrService);

  selectedCity: string = '';
  malls$: Observable<MallDTO[]> = this.store.select(selectMalls);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedCity = params['city'] || '';
      this.store.dispatch(getMallList({ cityName: this.selectedCity }));
    });
  }

  navigateToShops(mall: MallDTO): void {
    this.router.navigate(['/shops'], {
      queryParams: {
        mallId: mall.id || mall._id,
        mallName: mall.name,
      },
    });
  }

  toggleLike(mall: MallDTO): void {
    this.toastr.info(`Added ${mall.name} to favorites!`);
  }

  shareMall(mall: MallDTO): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      this.toastr.success('Link copied to clipboard!');
    }
  }
}
