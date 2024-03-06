import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    FlexLayoutModule,
    CardModule,
  ],
  exports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    FlexLayoutModule,
    CardModule,
  ],
})
export class SharedModule {}
