import { Component, OnInit } from '@angular/core';
import { BitcoinService } from './../../services/bitcoin.service';
import { Bitcoin } from './../../models/bitcoin.model';
import { Chart } from 'chart.js';

import { io } from 'socket.io-client';

const socket = io('https://cold-bore-csv-backend.herokuapp.com');
//const socket = io('http://localhost:8080');
@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css'],
})
export class RadarChartComponent implements OnInit {
  radar = [];
  bitcoins?: Bitcoin[];
  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    socket.on('data1', (res) => {
      this.bitcoinService.getAll().subscribe(
        (data) => {
          this.bitcoins = data;

          console.log(data);

          this.radar = new Chart('radar', {
            type: 'radar',
            data: {
              labels: this.bitcoins.map((labels) => labels.price_usd),
              datasets: [
                {
                  label: 'Fees',
                  data: this.bitcoins.map((labels) => labels.fees),
                  borderColor: '#3cba9f',
                  backgroundColor: 'green',
                  fill: false,
                },
                {
                  label: 'Price (USD)',
                  data: this.bitcoins.map((labels) => labels.price_usd),
                  borderColor: 'blue',
                  backgroundColor: 'black',
                  fill: false,
                },
              ],
            },
            options: {
              legend: {
                display: true,
              },
              animation: {
                duration: 0,
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
    });

    let options = {
      // aspectRatio: 1,
      // legend: false,
      tooltips: false,

      elements: {
        point: {
          borderWidth: function (context) {
            return Math.min(Math.max(1, context.datasetIndex + 1), 8);
          },
          hoverBackgroundColor: 'transparent',
          hoverBorderColor: function (context) {
            return 'red';
          },
          hoverBorderWidth: function (context) {
            var value = context.dataset.data[context.dataIndex];
            return Math.round((8 * value.v) / 1000);
          },
          radius: function (context) {
            var value = context.dataset.data[context.dataIndex];
            var size = context.chart.width;
            var base = Math.abs(value.v) / 1000;
            return (size / 24) * base;
          },
        },
      },
    };
  }
}
