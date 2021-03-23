import { Component, OnInit } from '@angular/core';
import { BitcoinService } from './../../services/bitcoin.service';
import { Bitcoin } from './../../models/bitcoin.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  chart = [];
  bitcoins?: Bitcoin[];

  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    this.changeToBar();
  }

  changeToBar(): void {
    this.bitcoinService.getAll().subscribe(
      (data) => {
        this.bitcoins = data;

        console.log(data);

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: this.bitcoins.map((labels) => labels.date),
            datasets: [
              {
                data: this.bitcoins.map((labels) => labels.price),
                borderColor: '#3cba9f',
                fill: false,
              },
            ],
          },
          options: {
            legend: {
              display: false,
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
