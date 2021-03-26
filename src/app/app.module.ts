import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BitcoinService } from './services/bitcoin.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBitcoinComponent } from './components/add-bitcoin/add-bitcoin.component';
import { BitcoinDetailsComponent } from './components/bitcoin-details/bitcoin-details.component';
import { BitcoinsListComponent } from './components/bitcoins-list/bitcoins-list.component';
import { AddCsvComponent } from './components/add-csv/add-csv.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { BarFixedComponent } from './components/Analysis/bar-fixed/bar-fixed.component';
import { PieFixedComponent } from './components/Analysis/pie-fixed/pie-fixed.component';
import { RadarFixedComponent } from './components/Analysis/radar-fixed/radar-fixed.component';
import { PolarFixedComponent } from './components/Analysis/polar-fixed/polar-fixed.component';
import { PolarChartComponent } from './components/polar-chart/polar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { LineFixedComponent } from './components/Analysis/line-fixed/line-fixed.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBitcoinComponent,
    BitcoinDetailsComponent,
    BitcoinsListComponent,
    AddCsvComponent,
    BarChartComponent,
    RadarChartComponent,
    BarFixedComponent,
    PieFixedComponent,
    RadarFixedComponent,
    PolarFixedComponent,
    PolarChartComponent,
    LineChartComponent,
    LineFixedComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [BitcoinService],
  bootstrap: [AppComponent],
})
export class AppModule {}
