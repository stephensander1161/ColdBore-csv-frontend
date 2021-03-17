import { BitcoinService } from './../../services/bitcoin.service';
import { Bitcoin } from './../../models/bitcoin.model';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-bitcoins-list',
  templateUrl: './bitcoins-list.component.html',
  styleUrls: ['./bitcoins-list.component.css'],
})
export class BitcoinsListComponent implements OnInit {
  bitcoins?: Bitcoin[];
  currentBitcoin?: Bitcoin;
  currentIndex = -1;
  date = '';

  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    this.retrieveBitcoins();
  }

  retrieveBitcoins(): void {
    this.bitcoinService.getAll().subscribe(
      (data) => {
        this.bitcoins = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveBitcoins();
    this.currentBitcoin = undefined;
    this.currentIndex = -1;
  }

  setActiveBitcoin(bitcoin: Bitcoin, index: number): void {
    this.currentBitcoin = bitcoin;
    this.currentIndex = index;
  }

  removeAllBitcoins(): void {
    this.bitcoinService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchDate(): void {
    this.bitcoinService.findByDate(this.date).subscribe(
      (data) => {
        this.bitcoins = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
