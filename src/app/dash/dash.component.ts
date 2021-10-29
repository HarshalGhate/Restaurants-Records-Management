import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shered/api.service';
import { RestaurentData } from './restaurent';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  formValue!: FormGroup;

  restaurentobj:RestaurentData=new RestaurentData;

  allRestaurentData:any=[];
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData();
  }

  clickAddResto()
  {
    this.formValue.reset();
    this.showAdd=true;            //show Add Btn in Add Restorent modal
    this.showUpdate=false;        
  }
  
    //now suscribing data which is maped by service
    addRestaurent()
    {
      this.restaurentobj.name=this.formValue.value.name;
      this.restaurentobj.email=this.formValue.value.email;
      this.restaurentobj.mobile=this.formValue.value.mobile;
      this.restaurentobj.address=this.formValue.value.address;
      this.restaurentobj.services=this.formValue.value.services;

      this.api.postRestaurent(this.restaurentobj).subscribe(res=>{
        console.log(res);
        alert("Restaurent Record Added Successfully!!");
        
        //clear fill form data 0
        let ref=document.getElementById('clear');
        ref?.click();
        
        this.formValue.reset();
        this.getAllData(); //without refresh
      },
      err=>{
        alert("Something went Wrong!!!");
      })
    }

    //get all data
    getAllData()
    {
      this.api.getRestaurent().subscribe(res=>{
        this.allRestaurentData=res;
      })
    }

    //delete the record
    deleteRestaurent(data:any)
    {
      this.api.deleteRestaurent(data.id).subscribe(res=>{
        alert("Restaurent Records deleted!!!");
        this.getAllData();  //without refresh
      })
    }

    onEditRestaurent(data:any)
    {
      this.showAdd=false;
      this.showUpdate=true;  //show update btn on edit

      this.restaurentobj.id=data.id;
      this.formValue.controls['name'].setValue(data.name);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['mobile'].setValue(data.mobile);
      this.formValue.controls['address'].setValue(data.address);
      this.formValue.controls['services'].setValue(data.services);
    }

    updateRestaurent()
    {
      this.restaurentobj.name=this.formValue.value.name;
      this.restaurentobj.email=this.formValue.value.email;
      this.restaurentobj.mobile=this.formValue.value.mobile;
      this.restaurentobj.address=this.formValue.value.address;
      this.restaurentobj.services=this.formValue.value.services;

      this.api.updateRestaurent(this.restaurentobj,this.restaurentobj.id).subscribe(res=>{
        alert("Resaurent Record Updated !!!");

        let ref=document.getElementById('clear');
        ref?.click();
        
        this.formValue.reset();
        this.getAllData(); //without refresh
      })
    }


}
