import { AddBitcoinComponent } from './components/add-bitcoin/add-bitcoin.component';
import { BitcoinsListComponent } from './components/bitcoins-list/bitcoins-list.component';
import { BitcoinDetailsComponent } from './components/bitcoin-details/bitcoin-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'bitcoins', pathMatch: 'full' },
  { path: 'bitcoins', component: BitcoinsListComponent },
  { path: 'bitcoins/:id', component: BitcoinDetailsComponent },
  { path: 'add', component: AddBitcoinComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
