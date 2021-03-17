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
    txVolume: null,
    adjustedTxVolume: null,
    txCount: null,
    marketCap: null,
    price: null,
    exchangeVolume: null,
    generatedCoins: null,
    fees: null,
    activeAddresses: null,
    averageDifficulty: null,
    paymentCount: null,
    medianTxValue: null,
    medianFee: null,
    blockSize: null,
    blockCount: null,
  };
  submitted = false;

  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {}
  saveBitcoin(): void {
    const data = {
      date: this.bitcoin.date,
      txVolume: this.bitcoin.txVolume,
      adjustedTxVolume: this.bitcoin.adjustedTxVolume,
      txCount: this.bitcoin.txCount,
      marketCap: this.bitcoin.marketCap,
      price: this.bitcoin.price,
      exchangeVolume: this.bitcoin.exchangeVolume,
      generatedCoins: this.bitcoin.generatedCoins,
      fees: this.bitcoin.fees,
      activeAddresses: this.bitcoin.activeAddresses,
      averageDifficulty: this.bitcoin.averageDifficulty,
      paymentCount: this.bitcoin.paymentCount,
      medianTxValue: this.bitcoin.medianTxValue,
      medianFee: this.bitcoin.medianFee,
      blockSize: this.bitcoin.blockSize,
      blockCount: this.bitcoin.blockCount,
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
      txVolume: null,
      adjustedTxVolume: null,
      txCount: null,
      marketCap: null,
      price: null,
      exchangeVolume: null,
      generatedCoins: null,
      fees: null,
      activeAddresses: null,
      averageDifficulty: null,
      paymentCount: null,
      medianTxValue: null,
      medianFee: null,
      blockSize: null,
      blockCount: null,
    };
  }
}
