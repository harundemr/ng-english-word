import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WordService } from 'src/services/word.service';

declare function hdInit(): void;
declare function hdAlertSuccess(title:string, description:string, onOk:any): void;
declare function hdAlertWarning(title:string, description:string, onOk:any): void;

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
  count: number = 0;
  currentPage: number = 1;

  ngOnInit() {
    this.service.Get(0,10).subscribe((data) => {
      this.words = data;
    });

    this.getQuestion();
   
    this.service.GetCount().subscribe((data) => {
      this.count = data;
    });

    hdInit();
  }

  onSubmitSoru() {
    
    this.service.Control(this.soruForm.value).subscribe((data) => {
      if(data)
      {
        hdAlertSuccess("başlık","açıklama",()=>{
          this.getQuestion();
        });
      }else{
         hdAlertWarning("Tekrar Dene !","Daha çok pratik yapmalısın.",()=>{
          this.getQuestion();
        });
      }
      
    });
  }

  getQuestion(){
    this.soruForm.reset();
    this.service.GetRandomWord().subscribe((data) => {
      this.soruForm.controls["english"].setValue(data.english);
       document.getElementById('frmSoruEnglish')!.click();
        document.getElementById('frmSoruTurkish')!.click();
    });
  }

  getPage(skip:number, take:number|any, event?:number){
    this.currentPage = event ? event: 1;
    this.service.Get(skip, take).subscribe((data) => {
      this.words = data;
    });
  }

  onSubmitEkle() {
    this.service
      .Push({
        english: this.ekleForm.controls['english'].value,
        turkish: this.ekleForm.controls['turkish'].value,
      })
      .subscribe(() => {
        this.onClear();
        document.getElementById('frmEkleEnglish')!.click();
        this.service.Get(0,10).subscribe((data) => {
          this.words = data;
        });
      });
  }

  onClear() {
    this.ekleForm.reset();
  }
}
