import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService, ProductType } from '../dashboard.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createProductForm!:FormGroup
  updateableProduct!: ProductType;
  constructor(private fb:FormBuilder,private dashboardService:DashboardService ,private activatedRoute:ActivatedRoute,private router: Router) {
    activatedRoute.queryParams.subscribe(res=>{
      this.updateableProduct = JSON.parse(res.updateableproduct)
   })
   this.createProductForm = this.fb.group({
     name: new FormControl('',[Validators.required]),
     desc: new FormControl('',[Validators.required]),
     price: new FormControl('',[Validators.required]),
     imageurl: new FormControl('',[Validators.required])
   })


   this.createProductForm.get('name')?.errors?.required
  }
   

  ngOnInit(): void {
    console.log(this.updateableProduct)
    if(this.updateableProduct){
      this.createProductForm.get('name')?.patchValue(this.updateableProduct.productName)
      this.createProductForm.get('desc')?.patchValue(this.updateableProduct.productDescription)
      this.createProductForm.get('price')?.patchValue(this.updateableProduct.productPrice)
      this.createProductForm.get('imageurl')?.patchValue(this.updateableProduct.productImageURL)

     }
     else{

     }
  }
  createOrUpdateProduct(){
    let reqBody:any = {
      productName: this.createProductForm.get('name')?.value,
      productPrice: this.createProductForm.get('price')?.value,
      productImageURL: this.createProductForm.get('imageurl')?.value,
      productDescription: this.createProductForm.get('desc')?.value,
    }
    if(this.updateableProduct?._id){
      //update
      reqBody = {...reqBody,_id:this.updateableProduct?._id}
       this.dashboardService .updateProduct(this.updateableProduct._id,reqBody).subscribe(res=>{
        alert(res?.message)
        this.router.navigateByUrl('/')

      },err=>{
        console.log(err);
      })
    }
    else{
      //create
      this.dashboardService.createProduct(reqBody).subscribe(res=>{
        alert(res?.message)
        this.router.navigateByUrl('/')
      },err=>{
        console.log(err);
      })
    }
    
    
  }

}
