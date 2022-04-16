import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { VideosComponent } from './videos/videos.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    VideosComponent,
    BlogListComponent,
    BlogDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
