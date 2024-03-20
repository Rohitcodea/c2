import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../api/api.service';
import { datamodel } from './model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  dataform!:FormGroup;
  data:undefined| datamodel[];

  
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
  constructor(private formbuilder:FormBuilder, private api:ApiService){}
  ngOnInit(): void {
    
    this.dataform=this.formbuilder.group({
      firstname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      lastname:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      email:['',[Validators.required, Validators.email]],
      dob:['',[Validators.required]],
      age:['',[Validators.required]],
      number:['',[Validators.required, Validators.pattern("[0-9]{10}")]],

      gender:['',[Validators.required]],
      currentaddress:['',Validators.required],
      currentaddress2: ['', Validators.required],
      city: ['', Validators.required],
     
      selectState: ['',[Validators.required]],
      postalCode: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
      country:['',[Validators.required]],
      Course:['',[Validators.required]],
      comments:['',[Validators.required]],
      imageupload:[null,[Validators.required]],

      
    
    
      accept:['false',[Validators.requiredTrue]],
      
    })  
    this.get();   
  }  

  

  adddata(data:datamodel){
    this.api.add(data).subscribe((res=>{
      this.dataform.reset();
      

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
    this.api.delete(id).subscribe(()=>{
      this.get();
      console.log(this.get())
    })
  }
  getImageUrl(imageFile: File): string {
    return '/path/to/your/images/' + imageFile.name;
  }


}