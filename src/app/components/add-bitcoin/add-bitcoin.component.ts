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
      txvolume_usd: this.bitcoin.txvolume_usd,
      adjustedtxvolume_usd: this.bitcoin.adjustedtxvolume_usd,
      txcount: this.bitcoin.txcount,
      marketcap_usd: this.bitcoin.marketcap_usd,
      price_usd: this.bitcoin.price_usd,
      exchangevolume_usd: this.bitcoin.exchangevolume_usd,
      generatedcoins: this.bitcoin.generatedcoins,
      fees: this.bitcoin.fees,
      activeaddresses: this.bitcoin.activeaddresses,
      averagedifficulty: this.bitcoin.averagedifficulty,
      paymentcount: this.bitcoin.paymentcount,
      mediantxvalue_usd: this.bitcoin.mediantxvalue_usd,
      medianfee: this.bitcoin.medianfee,
      blocksize: this.bitcoin.blocksize,
      blockcount: this.bitcoin.blockcount,
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
