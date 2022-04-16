import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
	{ path: '', component: PortfolioComponent},
	{ path: 'blogs', component: BlogListComponent},
	{ path: 'videos', component: VideosComponent},
	{ path: 'blog/:id', component: BlogDetailComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
