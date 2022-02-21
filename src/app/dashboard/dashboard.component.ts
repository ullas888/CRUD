import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService, ProductType } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listOfProducts!: ProductType[];
  isLoading!:boolean

  constructor(private dashboardService:DashboardService, private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts()
  }
  getAllProducts(){
    this.isLoading=true
    this.dashboardService.getAllProducts().subscribe(res =>{
      console.log(res);
      if (!res.error){
        if (Array.isArray(res?.products) && res.products.length >0){
          this.isLoading=false
          this.listOfProducts = res.products
        }else{
          this.isLoading=false
          this.listOfProducts=[]
        }
      }
    },err=>{
        console.log(err);
        
      
      
    })
  }
  navigateToCreate() {
    this.router.navigateByUrl('/create')
  }

  deleteProduct(productid:any,i:number){
    this.listOfProducts.splice(i,1)
    this.dashboardService.deleteProduct(productid).subscribe(res=>{
      // this.getAllProducts()
      alert(res.message)
    },err=>{

    })
  }
  updateProduct(product:ProductType){
    this.router.navigate(['/create'],{queryParams:{updateableproduct:JSON.stringify(product)}})
  }

}
