import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../../../services/bitcoin.service';
import { Bitcoin } from '../../../models/bitcoin.model';
import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';

@Component({
  selector: 'app-radar-fixed',
  templateUrl: './radar-fixed.component.html',
  styleUrls: ['./radar-fixed.component.css'],
})
export class RadarFixedComponent implements OnInit {
  radar_fixed = [];

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

        this.radar_fixed = new Chart('radar_fixed', {
          type: 'radar',
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
