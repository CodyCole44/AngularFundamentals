import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./product-list.component";
import { ConvertToSpacePipe } from "../shared/covert-to-space.pipe";
import { ProductDetailComponent } from "./product-detail.component";

import { RouterModule, Router } from "@angular/router";
import { ProductDetailGuard } from "./product-detail.guard";
import { StarComponent } from "../shared/star.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ProductListComponent,
    ConvertToSpacePipe,
    ProductDetailComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: "products", component: ProductListComponent },
      {
        path: "products/:id",
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      }
    ]),
    SharedModule
  ]
})
export class ProductModule {}
