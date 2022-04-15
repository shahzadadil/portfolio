import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
	{ path: '', component: PortfolioComponent},
	{ path: 'blogs', component: BlogsComponent},
	{ path: 'videos', component: VideosComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
