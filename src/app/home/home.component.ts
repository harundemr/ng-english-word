import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WordService } from 'src/services/word.service';

declare function hdInit(): void;
declare function hdAlertSuccess(): void;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: WordService) {}

  soruForm: FormGroup = new FormGroup({
    english: new FormControl(),
    turkish: new FormControl(),
  });

  ekleForm: FormGroup = new FormGroup({
    english: new FormControl(),
    turkish: new FormControl(),
  });

  words: any[] = [];

  ngOnInit() {
    this.service.Get().subscribe((data) => {
      this.words = data;
    });

    hdInit();
  }

  onSubmitSoru() {
    alert('test1');
  }

  onSubmitEkle() {
    this.service
      .Push({
        english: this.ekleForm.controls['english'].value,
        turkish: this.ekleForm.controls['turkish'].value,
      })
      .subscribe((data) => {
       // hdAlertSuccess();
        this.onClear();
      });
  }

  onClear() {
    this.ekleForm.reset();
  }
}
