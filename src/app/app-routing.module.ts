import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'item', component: ItemComponent },
  { path: '**', redirectTo: 'item' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
