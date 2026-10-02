import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material & UI Libraries
import { MaterialModule } from './Material.Module';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppReducer } from './shared/store/app.reducers';
import { AppEffects } from './shared/store/app.effects';
import { loggerMetaReducer } from './shared/store/meta-reducers/logger.metareducer';

// Routing & Shell
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CardComponent } from './shared/components/card/card.component';
import { HighlightsColorDirective } from './shared/directives/highlights-color.directive';
import { RepeatitemsDirective } from './shared/directives/repeatitems.directive';

// Core Interceptors
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Features
import { HomeComponent } from './features/home/home.component';
import { MallListComponent } from './features/malls/mall-list.component';
import { ShopListComponent } from './features/shops/shop-list.component';
import { LoginComponent } from './features/auth/login.component';
import { AdminHomeComponent } from './features/admin/components/admin-home/admin-home.component';
import { AddCityComponent } from './features/admin/components/add-city/add-city.component';
import { CityListComponent } from './features/admin/components/city-list/city-list.component';
import { MallsComponent } from './features/admin/components/malls/malls.component';
import { MallAdminListComponent } from './features/admin/components/mall-list/mall-list.component';
import { StoresComponent } from './features/admin/components/stores/stores.component';
import { StoreAdminListComponent } from './features/admin/components/store-list/store-list.component';

export function tokenGetter() {
  return localStorage.getItem('authToken');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    HighlightsColorDirective,
    RepeatitemsDirective,
    HomeComponent,
    MallListComponent,
    ShopListComponent,
    LoginComponent,
    AdminHomeComponent,
    AddCityComponent,
    CityListComponent,
    MallsComponent,
    MallAdminListComponent,
    StoresComponent,
    StoreAdminListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 3500,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:5000'],
      },
    }),
    StoreModule.forRoot(
      { globalState: AppReducer },
      { metaReducers: [loggerMetaReducer] }
    ),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
