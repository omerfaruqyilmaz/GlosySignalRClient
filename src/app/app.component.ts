import { Component } from '@angular/core';
import { ProductModel } from './Models/product.model';
import { ProductService } from './Services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SignalRClient';

  constructor(public productService : ProductService){}
  ngOnInit():void{
    this.productService.startConnection();
    this.productService.startListener();
  } 
}
