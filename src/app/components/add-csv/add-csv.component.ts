import { Bitcoin } from './../../models/bitcoin.model';
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-root',
  templateUrl: './add-csv.component.html',
  styleUrls: ['./add-csv.component.scss'],
})
export class AddCsvComponent {
  csvRecords: Bitcoin[] = [];
  header: boolean = true;

  constructor(private ngxCsvParser: NgxCsvParser) {}

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.header =
      ((this.header as unknown) as string) === 'true' || this.header === true;

    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: Array<any>) => {
          console.log('Result', result);
          this.csvRecords = result;
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }
}
