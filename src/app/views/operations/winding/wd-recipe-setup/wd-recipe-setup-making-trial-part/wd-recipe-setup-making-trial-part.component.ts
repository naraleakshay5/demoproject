import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wd-recipe-setup-making-trial-part',
  templateUrl: './wd-recipe-setup-making-trial-part.component.html',
  styleUrls: ['./wd-recipe-setup-making-trial-part.component.scss'],
})
export class WdRecipeSetupMakingTrialPartComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  trialPartsComplete() {
    this.router.navigate(['op/wd/recipe-setup/visual-inspection']);
  }
}
