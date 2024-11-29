import { Component, OnInit } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  products$!: Observable<Product[]>;
  /**
   * total number of products available in the fetch
   */
  totalProducts: number | null = null;
  /**
   * used to manage pagination
   */
  settings = new BehaviorSubject<Settings>({ limit: 12, skip: 0 });

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.settings.pipe(
      // handle each settings change sequentially, ensures that only one API call is active at a time and prevents overlapping requests
      concatMap((setting) =>
        this.productService.getProducts(setting).pipe(
          map((response) => {
            // set the total number of products available on the first response
            if (this.totalProducts === null) {
              this.totalProducts = response.total;
            }
            return response.products;
          }),
        ),
      ),
      // accumulate the fetched products into a single list, emits the intermediate results
      scan<Product[], Product[]>((allProducts, newProducts) => [...allProducts, ...newProducts], []),
      takeWhile((allProducts) =>
        this.totalProducts === null || allProducts.length < this.totalProducts, true),
    );
  }

  loadMore(): void {
    const currentValue = this.settings.value;
    this.settings.next({
      ...currentValue,
      skip: currentValue.skip + currentValue.limit
    });
  }
}
