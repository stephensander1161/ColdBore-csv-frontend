import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../../../services/bitcoin.service';
import { Bitcoin } from '../../../models/bitcoin.model';
import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';
@Component({
  selector: 'app-line-fixed',
  templateUrl: './line-fixed.component.html',
  styleUrls: ['./line-fixed.component.css'],
})
export class LineFixedComponent implements OnInit {
  line_fixed = [];

  bitcoins?: Bitcoin[];

  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    this.retrieveBitcoins();
  }

  retrieveBitcoins(): void {
    this.bitcoinService.getAll().subscribe(
      (data) => {
        this.bitcoins = data;

        console.log(data);

        this.line_fixed = new Chart('line_fixed', {
          type: 'line',
          data: {
            labels: this.bitcoins.map((labels) => labels.date),
            datasets: [
              {
                label: 'TX Volume (USD)',
                data: this.bitcoins.map((labels) => labels.txvolume_usd),
                borderColor: 'lilac',
                backgroundColor: 'lilac',

                fill: false,
              },
              {
                label: 'Adjusted TX Volume (USD)',
                data: this.bitcoins.map(
                  (labels) => labels.adjustedtxvolume_usd
                ),
                borderColor: 'magenta',
                backgroundColor: 'magenta',

                fill: false,
              },
              {
                label: 'TX Count',
                data: this.bitcoins.map((labels) => labels.txcount),
                borderColor: 'teal',
                backgroundColor: 'teal',

                fill: false,
              },
              {
                label: 'Market Cap (USD)',
                data: this.bitcoins.map((labels) => labels.marketcap_usd),
                borderColor: 'pink',
                backgroundColor: 'pink',

                fill: false,
              },
              {
                label: 'Price (USD)',
                data: this.bitcoins.map((labels) => labels.price_usd),
                borderColor: 'black',
                backgroundColor: 'black',

                fill: false,
              },
              {
                label: 'Exchange Volume (USD)',
                data: this.bitcoins.map((labels) => labels.exchangevolume_usd),
                borderColor: 'brown',
                backgroundColor: 'brown',

                fill: false,
              },
              {
                label: 'Generated Coins',
                data: this.bitcoins.map((labels) => labels.generatedcoins),
                borderColor: 'purple',
                backgroundColor: 'purple',
                fill: false,
              },
              {
                label: 'Fees',
                data: this.bitcoins.map((labels) => labels.fees),
                borderColor: 'beige',
                backgroundColor: 'beige',
                fill: false,
              },
              {
                label: 'Active Addresses',
                data: this.bitcoins.map((labels) => labels.activeaddresses),
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                fill: false,
              },
              {
                label: 'Average Difficulty',
                data: this.bitcoins.map((labels) => labels.averagedifficulty),
                borderColor: 'orange',
                backgroundColor: 'orange',
                fill: false,
              },
              {
                label: 'Payment Count',

                data: this.bitcoins.map((labels) => labels.paymentcount),
                borderColor: 'red',
                backgroundColor: 'red',
                fill: false,
              },
              {
                label: 'Median TX Value (USD)',

                data: this.bitcoins.map((labels) => labels.mediantxvalue_usd),
                borderColor: 'green',
                backgroundColor: 'green',
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
}
