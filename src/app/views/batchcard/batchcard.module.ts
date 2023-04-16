import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchcardComponent } from './batchcard.component';

import { BatchcardRoutingModule } from './batchcard-routing.module';
import { WindingComponent } from './winding/winding.component';
import { HotPressingComponent } from './hot-pressing/hot-pressing.component';
import { MaskingComponent } from './masking/masking.component';
import { MetalSprayingComponent } from './metal-spraying/metal-spraying.component';
import { DeburringTemperinComponent } from './deburring-temperin/deburring-temperin.component';
import { PreHeatingProcessComponent } from './pre-heating-process/pre-heating-process.component';
import { VacuumProcessComponent } from './vacuum-process/vacuum-process.component';
import { AssemblyComponent } from './assembly/assembly.component';
import { CuringVisualInspComponent } from './curing-visual-insp/curing-visual-insp.component';
import { ElectricalTestingComponent } from './electrical-testing/electrical-testing.component';
import { SideMarkingComponent } from './side-marking/side-marking.component';
import { LeadCuttingComponent } from './lead-cutting/lead-cutting.component';
import { PackingComponent } from './packing/packing.component';
import { QualityAssuranceComponent } from './quality-assurance/quality-assurance.component';

@NgModule({
  declarations: [
    BatchcardComponent,
    WindingComponent,
    HotPressingComponent,
    MaskingComponent,
    MetalSprayingComponent,
    DeburringTemperinComponent,
    PreHeatingProcessComponent,
    VacuumProcessComponent,
    AssemblyComponent,
    CuringVisualInspComponent,
    ElectricalTestingComponent,
    SideMarkingComponent,
    LeadCuttingComponent,
    PackingComponent,
    QualityAssuranceComponent,
  ],
  imports: [CommonModule, BatchcardRoutingModule],
})
export class BatchcardModule {}
