// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { ConversationComponent } from './admin/conversation/conversation.component';
// import { DashboardComponent } from './admin/dashboard/dashboard.component';
// import { MenuComponent } from './admin/menu/menu.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
//   { path: 'dashboard', component: DashboardComponent},
//   { path: 'menu', component: MenuComponent},
//   { path: 'conversations', component: ConversationComponent}
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversationComponent } from './admin/conversation/conversation.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MenuComponent } from './admin/menu/menu.component';
import { AuthGuard } from './helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
    { path: 'conversations', component: ConversationComponent, canActivate: [AuthGuard]},
    { path: '', loadChildren: accountModule },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }