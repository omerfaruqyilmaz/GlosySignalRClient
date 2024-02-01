import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { ProductModel } from '../Models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList!: ProductModel[];
  private hubConnection!: signalR.HubConnection;

  constructor() { }

  private startInvoke(){
    this.hubConnection.invoke("SendProductList").catch((err)=> console.log(err));
  }

  startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:7137/product-hub').build();

    this.hubConnection.
    start().
    then(()=>{
      this.startInvoke();
    }).
    catch((err)=>{
      console.log(err);
    });
  }

  startListener(){
    this.hubConnection.on('receiveProductList',(products:ProductModel[])=>{

      this.productList = [];

      products.forEach((item)=>{
       
        this.productList.push(item)
      })
    })
  }
}
