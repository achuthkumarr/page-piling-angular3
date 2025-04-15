import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { PagePilingComponent } from "./page-piling/page-piling.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
    declarations: [
        AppComponent,
        PagePilingComponent
    ],
    imports: [BrowserModule, RouterOutlet, CommonModule],
    providers: [
    provideAnimationsAsync()
  ],
    bootstrap: [AppComponent]
})

export class AppModule {}