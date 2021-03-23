import { Bitcoin } from './../../models/bitcoin.model';
import { BitcoinService } from './../../services/bitcoin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bitcoin-details',
  templateUrl: './bitcoin-details.component.html',
  styleUrls: ['./bitcoin-details.component.css'],
})
export class BitcoinDetailsComponent implements OnInit {
  currentBitcoin: Bitcoin = {
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
  message = '';

  constructor(
    private bitcoinService: BitcoinService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getBitcoin(this.route.snapshot.params.id);
  }
  getBitcoin(id: string): void {
    this.bitcoinService.get(id).subscribe(
      (data) => {
        this.currentBitcoin = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateBitcoin(): void {
    this.bitcoinService
      .update(this.currentBitcoin.id, this.currentBitcoin)
      .subscribe(
        (response) => {
          console.log(response);
          this.message = response.message;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteBitcoin(): void {
    this.bitcoinService.delete(this.currentBitcoin.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/bitcoins']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
