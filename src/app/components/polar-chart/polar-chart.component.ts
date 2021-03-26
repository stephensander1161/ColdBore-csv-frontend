import { Component, OnInit } from '@angular/core';
import { BitcoinService } from './../../services/bitcoin.service';
import { Bitcoin } from './../../models/bitcoin.model';
import { Chart } from 'chart.js';

import { io } from 'socket.io-client';

const socket = io('https://cold-bore-csv-backend.herokuapp.com');
//const socket = io('http://localhost:8080');
@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.css'],
})
export class PolarChartComponent implements OnInit {
  polar = [];
  bitcoins?: Bitcoin[];
  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    socket.on('data1', (res) => {
      this.bitcoinService.getAll().subscribe(
        (data) => {
          this.bitcoins = data;

          console.log(data);

          this.polar = new Chart('polar', {
            type: 'polarArea',

            data: {
              datasets: [
                {
                  labels: 'TX Count',
                  data: this.bitcoins.map((labels) => labels.txcount),
                  borderColor: 'black',
                  backgroundColor: 'red',
                  fill: false,
                },
                {
                  labels: 'Active Addresses',
                  data: this.bitcoins.map((labels) => labels.activeaddresses),
                  borderColor: 'black',
                  backgroundColor: 'blue',
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
  }
}
