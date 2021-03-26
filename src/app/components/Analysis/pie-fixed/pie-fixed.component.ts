import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../../../services/bitcoin.service';
import { Bitcoin } from '../../../models/bitcoin.model';
import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';

@Component({
  selector: 'app-pie-fixed',
  templateUrl: './pie-fixed.component.html',
  styleUrls: ['./pie-fixed.component.css'],
})
export class PieFixedComponent implements OnInit {
  pie_fixed = [];

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

        this.pie_fixed = new Chart('pie_fixed', {
          type: 'pie',
          data: {
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
              {
                label: 'Block Count',

                data: this.bitcoins.map((labels) => labels.blockcount),
                borderColor: 'blue',
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
                  beginAtZero: true,
                  ticks: {
                    autoSkip: false,
                  },
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
