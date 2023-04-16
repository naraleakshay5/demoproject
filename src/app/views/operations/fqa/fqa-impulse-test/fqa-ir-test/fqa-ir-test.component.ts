import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PO_DATA } from '../../../Shared/shared-model';

@Component({
  selector: 'app-fqa-ir-test',
  templateUrl: './fqa-ir-test.component.html',
  styleUrls: ['./fqa-ir-test.component.scss'],
})
export class FqaIrTestComponent implements OnInit {
  poData!: PO_DATA;
  irTestForm!: FormGroup;
  is_selected: boolean = false;
  selectedAll: any[] = [];

  referanceValue: number = 5;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    const poData = localStorage.getItem('PO_DATA')!;
    this.poData = JSON.parse(poData);
    this.getScrapFormData();
    this.addGroup();
  }

  getScrapFormData() {
    this.irTestForm = this.fb.group({
      results: this.fb.array([this.initTimes()]),
    });

    this.fa.valueChanges.subscribe((value) => {
      this.selectedAll = value.filter(
        (v: any) => v.value !== '' && v.value !== null
      );
    });
  }

  trackByFn(index: number, item: any) {
    return item.trackingId;
  }

  initTimes() {
    return this.fb.group({
      value: this.fb.control('', Validators.required),
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
    let results = [];
    results = this.irTestForm.value.results.map((ele: any, i: number) => {
      ele.sample = 'sample ' + (i + 1);
      return ele;
    });
    const object = results.reduce(
      (obj: any, item: any) =>
        Object.assign(obj, { [item.sample]: item.value }),
      {}
    );
    this.router.navigate(['op/fqa/hv-test']);
  }
}
