import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrnComponent } from './grn/grn.component';
import { SaleComponent } from './sale/sale.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'POS'
    },
    children: [
      {
        path: '',
        redirectTo: 'grn'
      },{
        path: 'grn',
        component: GrnComponent,
        data: {
          title: 'GRN'
        }
      },{
        path: 'sale',
        component: SaleComponent,
        data: {
          title: 'SALE'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
