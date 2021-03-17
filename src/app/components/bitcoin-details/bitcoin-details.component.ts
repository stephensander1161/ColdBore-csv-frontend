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
