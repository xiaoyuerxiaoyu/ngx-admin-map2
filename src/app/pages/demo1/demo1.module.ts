import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Demo1Component } from './demo1.component';
import {NgxPrintModule} from 'ngx-print';
import { GoogleMapsModule  } from '@angular/google-maps';
// import { GoogleMapsModule,MapInfoWindow, MapMarker  } from '@angular/google-maps';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCheckboxModule, NbInputModule, NbRadioModule, NbCardModule, NbListModule } from '@nebular/theme';

@NgModule({
  declarations: [
    Demo1Component
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NgxPrintModule,
    GoogleMapsModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbRadioModule,
    NbListModule]
})
export class Demo1Module { }
