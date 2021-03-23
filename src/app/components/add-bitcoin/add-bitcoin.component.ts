import { BitcoinService } from './../../services/bitcoin.service';
import { Bitcoin } from './../../models/bitcoin.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-bitcoin',
  templateUrl: './add-bitcoin.component.html',
  styleUrls: ['./add-bitcoin.component.css'],
})
export class AddBitcoinComponent implements OnInit {
  bitcoin: Bitcoin = {
    date: '',
    txvolume_usd: null,
    adjustedtxvolume_usd: null,
    txcount: null,
    marketcap_usd: null,
    price_usd: null,
    exchangevolume_usd: null,
    generatedcoins: null,
    fees: null,
    activeaddresses: null,
    averagedifficulty: null,
    paymentcount: null,
    mediantxvalue_usd: null,
    medianfee: null,
    blocksize: null,
    blockcount: null,
  };
  submitted = false;

  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {}
  saveBitcoin(): void {
    const data = {
      date: this.bitcoin.date,
      txVolume: this.bitcoin.txvolume_usd,
      adjustedTxVolume: this.bitcoin.adjustedtxvolume_usd,
      txCount: this.bitcoin.txcount,
      marketCap: this.bitcoin.marketcap_usd,
      price: this.bitcoin.price_usd,
      exchangeVolume: this.bitcoin.exchangevolume_usd,
      generatedCoins: this.bitcoin.generatedcoins,
      fees: this.bitcoin.fees,
      activeAddresses: this.bitcoin.activeaddresses,
      averageDifficulty: this.bitcoin.averagedifficulty,
      paymentCount: this.bitcoin.paymentcount,
      medianTxValue: this.bitcoin.mediantxvalue_usd,
      medianFee: this.bitcoin.medianfee,
      blockSize: this.bitcoin.blocksize,
      blockCount: this.bitcoin.blockcount,
    };

    this.bitcoinService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newBitcoin(): void {
    this.submitted = false;
    this.bitcoin = {
      date: '',
      txvolume_usd: null,
      adjustedtxvolume_usd: null,
      txcount: null,
      marketcap_usd: null,
      price_usd: null,
      exchangevolume_usd: null,
      generatedcoins: null,
      fees: null,
      activeaddresses: null,
      averagedifficulty: null,
      paymentcount: null,
      mediantxvalue_usd: null,
      medianfee: null,
      blocksize: null,
      blockcount: null,
    };
  }
}
