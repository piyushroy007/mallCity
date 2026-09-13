import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { STATES } from '../../constant/stateList.constant';
import { selectCities } from '../../../../shared/store/app.selector';
import { addMall, getCityList } from '../../../../shared/store/app.action';
import { CityDTO } from '@mallcity/shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-malls',
  templateUrl: './malls.component.html',
  styleUrls: ['./malls.component.scss'],
})
export class MallsComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private toastr = inject(ToastrService);

  states = STATES;
  allCities: CityDTO[] = [];
  filteredCities: CityDTO[] = [];

  mallForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  private citySub?: Subscription;

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(getCityList());

    this.citySub = this.store.select(selectCities).subscribe((cities) => {
      this.allCities = cities || [];
    });
  }

  initForm(): void {
    this.mallForm = this.fb.group({
      selectedState: ['', Validators.required],
      selectedCity: ['', Validators.required],
      mallName: ['', Validators.required],
      floorNumber: ['', [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.mallForm.get('selectedState')?.valueChanges.subscribe((state) => {
      this.filteredCities = this.allCities.filter(
        (c) => c.state.toLowerCase() === state?.toLowerCase()
      );
      this.mallForm.get('selectedCity')?.setValue('');
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
    if (this.mallForm.invalid) {
      this.mallForm.markAllAsTouched();
      return;
    }

    const val = this.mallForm.value;
    const cityObj = this.allCities.find((c) => c.name === val.selectedCity);

    const formData = new FormData();
    formData.append('name', val.mallName);
    formData.append('city', val.selectedCity);
    formData.append('cityCode', String(cityObj?.cityCode || 0));
    formData.append('noOffloor', String(val.floorNumber));
    formData.append('address', val.address);
    formData.append('description', val.description);

    if (this.selectedFile) {
      formData.append('mallImg', this.selectedFile);
    }

    this.store.dispatch(addMall({ formData }));
    this.mallForm.reset();
    this.previewUrl = null;
    this.selectedFile = null;
  }

  ngOnDestroy(): void {
    this.citySub?.unsubscribe();
  }
}
