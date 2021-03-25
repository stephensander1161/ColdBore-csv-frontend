import { BitcoinService } from './../../services/bitcoin.service';
import { Bitcoin } from './../../models/bitcoin.model';
import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import 'chartjs-plugin-zoom';

import { io } from 'socket.io-client';

const socket = io('https://cold-bore-csv-backend.herokuapp.com');
//const socket = io('http://localhost:8080');

@Component({
  selector: 'app-bitcoins-list',
  templateUrl: './bitcoins-list.component.html',
  styleUrls: ['./bitcoins-list.component.css'],
})
export class BitcoinsListComponent implements OnInit {
  title = 'dashboard';
  chart;
  chart2 = [];
  pie: any;
  doughnut: any;

  data1 = [];
  line = [];

  bitcoins?: Bitcoin[];
  currentBitcoin?: Bitcoin;
  currentIndex = -1;
  date = '';
  price = '';
  activeaddresses = null;
  fees = 0;
  generatedcoins = '';

  constructor(private bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    //this.retrieveBitcoins();

    socket.on('data1', (res) => {
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
                  label: 'Block Size',

                  data: this.bitcoins.map((labels) => labels.blocksize),
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
              animation: {
                duration: 0,
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
    });

    socket.on('data2', (res) => {
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
              label: 'Block Size',

              data: this.bitcoins.map((labels) => labels.blocksize),
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
          animation: {
            duration: 0,
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

      this.updateChartData(this.line, res, 1);
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

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  updateChartData(chart, data, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
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
