import { Component, OnInit } from '@angular/core';
import {  FormBuilder,  FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { datamodel } from './model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
//validation for Number

onlyNumericvalue(event: KeyboardEvent): boolean {
  const charCode = event.key?.charCodeAt(0) || event.which || event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
    alert("Alphhbets are mot allowes ")
  }
  return true;
}
onPaste(event:ClipboardEvent){
  const pastedData= event.clipboardData?.getData('text')||'';
  if(!/^\d+$/.test(pastedData)){
    event.preventDefault();
      alert("Alphabet are not allowed")
  }
}


onPasteLetter(event:ClipboardEvent){
  const pastedData= event.clipboardData?.getData('text')||'';
  if(!/^[a-zA-Z]+$/.test(pastedData)){
    event.preventDefault();
    alert("Numbers are not alloed in Name")
  }
 

}

  dataform!:FormGroup;
  data!: datamodel[]; 
  Countrie:any;
  indianStates = ["",
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  Countries = [
    "India", "China", "United States", "Japan", "Brazil",
    "France", "Italy", "Canada", "Australia", "Russia",
    "Germany", "United Kingdom", "Mexico", "South Africa", "Spain"
  ];
  constructor(private formbuilder:FormBuilder, private api:ApiService,private route:Router){}
  ngOnInit(): void {
    
    this.dataform=this.formbuilder.group({
      firstname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      lastname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      email:['',[Validators.required, Validators.email]],
      dob:['',[Validators.required]],
      age:['',[Validators.required]],
      number:['',[Validators.required,Validators.minLength(10)]],
      gender:['',[Validators.required]],
      currentaddress:['',[Validators.required,Validators.maxLength(60)]],
      currentaddress2: ['',[ Validators.required,Validators.maxLength(60)]],
      city: ['', [Validators.required,Validators.maxLength(25)]],     
      selectState: ['',[Validators.required]],
      postalCode: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
      country:['',[Validators.required]],
      Course:['',[Validators.required]],
      comments:['',[Validators.required]],
      imageupload:[null,],   
      accept:['',[Validators.requiredTrue]],      
    })  
    this.get();   
  }  
  adddata(data:datamodel){
    this.api.add(data).subscribe((Response=>{
      this.dataform.reset(); 
    //  localStorage.setItem()
      // console.log(Response.id);
      
    }))
    this.get();
    }
  get() {
    this.api.get().subscribe(res => {
      this.data = res;
      this.dataform.reset();
      console.log(this.data); // Inspect the data structure
    });
  }
  delete(id:number){
    this.api.delete(id).subscribe((res)=>{
      this.get();
      console.log(this.get())
      console.log(res);      
    })
  }
  getCon(){
    this.api.getCoumtary().subscribe(response =>{
      // // this.Countries=response;
      // console.log(response);
      
      // console.log(this.Countries);
      
    })
  }

  getImageUrl(imageFile: File): string {
    return '/path/to/your/images/' + imageFile.name;
  }
  logout(){
    localStorage.removeItem("user");
    localStorage.removeItem('access')

    this.route.navigate(["/login"]);
  }
}
