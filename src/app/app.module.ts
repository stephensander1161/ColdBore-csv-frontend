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

@NgModule({
  declarations: [
    AppComponent,
    AddBitcoinComponent,
    BitcoinDetailsComponent,
    BitcoinsListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [BitcoinService],
  bootstrap: [AppComponent],
})
export class AppModule {}
