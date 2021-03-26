import { BarFixedComponent } from './components/Analysis/bar-fixed/bar-fixed.component';
import { PieFixedComponent } from './components/Analysis/pie-fixed/pie-fixed.component';
import { RadarFixedComponent } from './components/Analysis/radar-fixed/radar-fixed.component';
import { PolarFixedComponent } from './components/Analysis/polar-fixed/polar-fixed.component';
import { LineFixedComponent } from './components/Analysis/line-fixed/line-fixed.component';

import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { PolarChartComponent } from './components/polar-chart/polar-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

import { AddBitcoinComponent } from './components/add-bitcoin/add-bitcoin.component';
import { AddCsvComponent } from './components/add-csv/add-csv.component';
import { BitcoinsListComponent } from './components/bitcoins-list/bitcoins-list.component';
import { BitcoinDetailsComponent } from './components/bitcoin-details/bitcoin-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'linechart', pathMatch: 'full' },
  { path: 'bitcoins', component: BitcoinsListComponent },
  { path: 'bitcoins/:id', component: BitcoinDetailsComponent },
  { path: 'add', component: AddBitcoinComponent },
  { path: 'addcsv', component: AddCsvComponent },
  { path: 'linechart_Analysis', component: LineFixedComponent },
  { path: 'barchart_Analysis', component: BarFixedComponent },
  { path: 'piechart_Analysis', component: PieFixedComponent },
  { path: 'radarchart_Analysis', component: RadarFixedComponent },
  { path: 'polarchart_Analysis', component: PolarFixedComponent },
  { path: 'barchart', component: BarChartComponent },
  { path: 'radarchart', component: RadarChartComponent },
  { path: 'polarchart', component: PolarChartComponent },
  { path: 'piechart', component: PieChartComponent },
  { path: 'linechart', component: LineChartComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
