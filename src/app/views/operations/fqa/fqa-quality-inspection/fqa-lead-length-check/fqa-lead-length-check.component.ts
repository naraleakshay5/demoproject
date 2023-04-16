import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PO_DATA } from '../../../Shared/shared-model';
import { SharedService } from '../../../Shared/shared.service';
import { FqaService } from '../../fqa.service';

@Component({
  selector: 'app-fqa-lead-length-check',
  templateUrl: './fqa-lead-length-check.component.html',
  styleUrls: ['./fqa-lead-length-check.component.scss'],
})
export class FqaLeadLengthCheckComponent implements OnInit {
  poData!: PO_DATA;
  irTestForm!: FormGroup;
  is_selected: boolean = false;
  selectedAll: any[] = [];

  referanceValue: number = 5;
  testingType: string | null = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fqaService: FqaService
  ) {}

  ngOnInit() {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    this.testingType = localStorage.getItem('TYPE');

    this.getScrapFormData();
    this.addGroup();
  }

  getScrapFormData() {
    this.irTestForm = this.fb.group({
      results: this.fb.array([this.initTimes()]),
    });

    this.fa.valueChanges.subscribe((value: any) => {
      this.selectedAll = value.filter(
        (v: any) =>
          v.value !== '' &&
          v.value !== null &&
          v.value1 !== '' &&
          v.value1 !== null
      );
    });
  }

  moveToNext(event: any) {
    let next = event.target.nextElementSibling;
    if (next) {
      next.focus();
    } else {
      event.target.blur();
    }
  }

  trackByFn(index: number, item: any) {
    return item.trackingId;
  }

  initTimes() {
    return this.fb.group({
      value: this.fb.control('', Validators.required),
      value1: this.fb.control('', Validators.required),
      sample: this.fb.control('', Validators.required),
      isTrue: this.fb.control(null, Validators.required),
      trackingId: this.generateUniqueId(),
    });
  }

  generateUniqueId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  get fa() {
    return this.irTestForm.get('results') as FormArray;
  }

  addGroup() {
    for (let i = 0; i < 4; i++) {
      this.fa.push(this.initTimes());
    }
  }

  removeGroup(i: number) {
    this.fa.removeAt(i);
    this.is_selected = false;
  }

  onSubmit() {
    // Todo

    // let results = [];
    // results = this.irTestForm.value.results.map((ele: any, i: number) => {
    //   ele.sample = 'sample ' + (i + 1);
    //   return ele;
    // });
    // const object = results.reduce(
    //   (obj: any, item: any) =>
    //     Object.assign(obj, { [item.sample]: item.value }),
    //   {}
    // );

    this.fqaService?.testComplete('Lead length Check');
    this.router.navigate(['op/fqa/quality-inspection']);
  }
}
