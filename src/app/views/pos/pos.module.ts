import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { GrnComponent } from './grn/grn.component';
import { SaleComponent } from './sale/sale.component';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { FormsModule } from '@angular/forms';
import { ItemSearchComponent } from './common/components/item-search/item-search.component';
import { CustomerSearchComponent } from './common/components/customer-search/customer-search.component';
import { SupplierSearchComponent } from './common/components/supplier-search/supplier-search.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ".",
  precision: 2,
  prefix: "LKR ",
  suffix: "",
  thousands: ","
};


@NgModule({
  declarations: [GrnComponent, SaleComponent, ItemSearchComponent, CustomerSearchComponent, SupplierSearchComponent],
  imports: [
    FormsModule,
    CommonModule,
    PosRoutingModule,
    NgxTypeaheadModule,
    CurrencyMaskModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    MatProgressBarModule,
    NgbModule,
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
})
export class PosModule { }


