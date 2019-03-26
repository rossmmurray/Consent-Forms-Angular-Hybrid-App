import { NgModule } from '@angular/core';
import { SigBlockComponent } from './sig-block/sig-block';
import { SmileyBlockComponent } from './smiley-block/smiley-block';
@NgModule({
	declarations: [SigBlockComponent,
    SmileyBlockComponent],
	imports: [],
	exports: [SigBlockComponent,
    SmileyBlockComponent]
})
export class ComponentsModule {}
