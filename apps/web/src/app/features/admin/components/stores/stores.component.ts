import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectCities, selectMalls, selectShops } from '../../../../shared/store/app.selector';
import { addShop, getCityList, getMallList, getShopList } from '../../../../shared/store/app.action';
import { CityDTO, MallDTO, ShopDTO } from '@mallcity/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private toastr = inject(ToastrService);

  cities: CityDTO[] = [];
  allMalls: MallDTO[] = [];
  filteredMalls: MallDTO[] = [];

  shops$: Observable<ShopDTO[]> = this.store.select(selectShops);

  categories = ['Clothes', 'Restaurant', 'Kids Zone', 'Saloon', 'Electronics'];

  shopForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  private subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(getCityList());
    this.store.dispatch(getMallList({}));
    this.store.dispatch(getShopList({}));

    this.subs.add(
      this.store.select(selectCities).subscribe((cities) => {
        this.cities = cities || [];
      })
    );

    this.subs.add(
      this.store.select(selectMalls).subscribe((malls) => {
        this.allMalls = malls || [];
      })
    );
  }

  initForm(): void {
    this.shopForm = this.fb.group({
      city: ['', Validators.required],
      mallName: ['', Validators.required],
      name: ['', Validators.required],
      floorNo: ['', Validators.required],
      shopType: ['', Validators.required],
      contactNumber: [''],
      description: ['', Validators.required],
    });

    this.shopForm.get('city')?.valueChanges.subscribe((cityName) => {
      this.filteredMalls = this.allMalls.filter(
        (m) => m.city.toLowerCase() === cityName?.toLowerCase()
      );
      this.shopForm.get('mallName')?.setValue('');
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.toastr.error('Please choose a valid image file', 'Unsupported File');
        return;
      }

      const maxBytes = 15 * 1024 * 1024; // 15MB
      if (file.size > maxBytes) {
        this.toastr.error('Image size exceeds 15MB. Please select a smaller photo.', 'File Too Large');
        event.target.value = '';
        this.selectedFile = null;
        this.previewUrl = null;
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.shopForm.invalid) {
      this.shopForm.markAllAsTouched();
      return;
    }

    const val = this.shopForm.value;
    const mallObj = this.allMalls.find((m) => m.name === val.mallName);

    const formData = new FormData();
    formData.append('name', val.name);
    formData.append('city', val.city);
    formData.append('mallName', val.mallName);
    formData.append('mallId', mallObj?.id || mallObj?._id || '');
    formData.append('floorNo', val.floorNo);
    formData.append('shopType', val.shopType);
    formData.append('contactNumber', val.contactNumber || '');
    formData.append('description', val.description);

    if (this.selectedFile) {
      formData.append('shopImg', this.selectedFile);
    }

    this.store.dispatch(addShop({ formData }));
    this.shopForm.reset();
    this.previewUrl = null;
    this.selectedFile = null;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
