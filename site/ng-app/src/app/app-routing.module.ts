import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
	{ path: '', component: PortfolioComponent},
	{ path: 'blogs/:id', component: BlogDetailComponent},
	{ path: 'blogs', component: BlogListComponent},
	{ path: 'videos', component: VideosComponent}	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
