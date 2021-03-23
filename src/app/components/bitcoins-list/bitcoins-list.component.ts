import { BitcoinService } from './../../services/bitcoin.service';
import { Bitcoin } from './../../models/bitcoin.model';
import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import 'chartjs-plugin-zoom';

@Component({
  selector: 'app-bitcoins-list',
  templateUrl: './bitcoins-list.component.html',
  styleUrls: ['./bitcoins-list.component.css'],
})
export class BitcoinsListComponent implements OnInit {
  line = [];
  update = [];

  bitcoins?: Bitcoin[];
  currentBitcoin?: Bitcoin;
  currentIndex = -1;
  date = '';
  price = '';

  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    this.retrieveBitcoins();
  }

  reloadChart(): void {
    this.line = [];
    this.bitcoinService.getAll().subscribe(
      (data) => {
        this.bitcoins = data;

        console.log(data);

        this.update = new Chart('update', {
          type: 'line',
          data: {
            labels: this.bitcoins.map((labels) => labels.date),
            datasets: [
              {
                label: 'TEST',
                data: this.bitcoins.map((labels) => labels.generatedcoins),
                borderColor: '#3cba9f',
                fill: false,
              },
            ],
          },

          options: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              enabled: true,
              mode: 'xy',
            },
            responsive: true,
            legend: {
              display: true,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                },
              ],
              yAxes: [
                {
                  display: true,
                },
              ],
            },
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  retrieveBitcoins(): void {
    this.bitcoinService.getAll().subscribe(
      (data) => {
        this.bitcoins = data;

        console.log(data);

        this.line = new Chart('line', {
          type: 'line',
          data: {
            labels: this.bitcoins.map((labels) => labels.date),
            datasets: [
              {
                label: 'Generated Coins',
                data: this.bitcoins.map((labels) => labels.generatedcoins),
                borderColor: '#3cba9f',
                fill: false,
              },
              {
                label: 'TX Count',

                data: this.bitcoins.map((labels) => labels.txcount),
                borderColor: 'red',
                fill: false,
              },
            ],
          },

          options: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              enabled: true,
              mode: 'xy',
            },
            responsive: true,
            legend: {
              display: true,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                },
              ],
              yAxes: [
                {
                  display: true,
                },
              ],
            },
          },
        });
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

  searchPrice(): void {
    this.bitcoinService.findByPrice(this.price).subscribe(
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
