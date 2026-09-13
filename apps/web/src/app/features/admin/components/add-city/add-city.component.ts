import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { STATES } from '../../constant/stateList.constant';
import { getCityList, checkCityName, updateCity } from '../../../../shared/store/app.action';
import { selectCities } from '../../../../shared/store/app.selector';
import { CityDTO, CreateCityDTO } from '@mallcity/shared';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  states = STATES;
  cityForm!: FormGroup;
  isEditMode = false;
  selectedCityId: string | null = null;

  cities$: Observable<CityDTO[]> = this.store.select(selectCities);

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(getCityList());
  }

  initForm(): void {
    this.cityForm = this.fb.group({
      state: ['', Validators.required],
      name: ['', Validators.required],
      cityCode: ['', [Validators.required]],
    });
  }

  onEditCity(city: CityDTO): void {
    this.isEditMode = true;
    this.selectedCityId = city.id || city._id || null;
    this.cityForm.patchValue({
      state: city.state,
      name: city.name,
      cityCode: city.cityCode,
    });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedCityId = null;
    this.cityForm.reset();
  }

  onSubmit(): void {
    if (this.cityForm.invalid) return;

    const val = this.cityForm.value;
    const cityData: CreateCityDTO = {
      state: val.state,
      name: val.name,
      cityCode: Number(val.cityCode),
    };

    if (this.isEditMode && this.selectedCityId) {
      this.store.dispatch(
        updateCity({
          id: this.selectedCityId,
          cityObj: cityData,
        })
      );
      this.resetForm();
    } else {
      this.store.dispatch(
        checkCityName({
          cityCode: cityData.cityCode,
          newCityName: cityData,
        })
      );
      this.resetForm();
    }
  }
}
