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
    txvolume: null,
    adjustedtxvolume: null,
    txcount: null,
    marketcap: null,
    price: null,
    exchangevolume: null,
    generatedcoins: null,
    fees: null,
    activeaddresses: null,
    averagedifficulty: null,
    paymentcount: null,
    mediantxvalue: null,
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
      txVolume: this.bitcoin.txvolume,
      adjustedTxVolume: this.bitcoin.adjustedtxvolume,
      txCount: this.bitcoin.txcount,
      marketCap: this.bitcoin.marketcap,
      price: this.bitcoin.price,
      exchangeVolume: this.bitcoin.exchangevolume,
      generatedCoins: this.bitcoin.generatedcoins,
      fees: this.bitcoin.fees,
      activeAddresses: this.bitcoin.activeaddresses,
      averageDifficulty: this.bitcoin.averagedifficulty,
      paymentCount: this.bitcoin.paymentcount,
      medianTxValue: this.bitcoin.mediantxvalue,
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
      txvolume: null,
      adjustedtxvolume: null,
      txcount: null,
      marketcap: null,
      price: null,
      exchangevolume: null,
      generatedcoins: null,
      fees: null,
      activeaddresses: null,
      averagedifficulty: null,
      paymentcount: null,
      mediantxvalue: null,
      medianfee: null,
      blocksize: null,
      blockcount: null,
    };
  }
}
