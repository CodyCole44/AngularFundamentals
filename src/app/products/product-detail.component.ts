import { Component, OnInit } from "@angular/core";

import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  product: IProduct;
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get("id");
    this.pageTitle += `: ${id}`;
    this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }

  onBack(): void {
    this.router.navigate(["./products"]);
  }
}
