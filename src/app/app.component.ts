import { Component,ChangeDetectorRef,NgZone } from '@angular/core';
import {HttpClient } from "@angular/common/http"
import { NgForm } from '@angular/forms';
import* as XLSX from 'xlsx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  file;
  displayTable:boolean;
  title = 'tpddlReportGenerator';
  downloadButton:boolean=false;
  userArray:any=[];
  userImpliedData:any=[];
  phoneKeys: any=[];
  userKeys: any=[];
  jobKeys: any=[];
  deliveryBoyKeys: any=[];
  skip:Number=0;
  constructor(private httpCall:HttpClient,private cdr:ChangeDetectorRef,private zone:NgZone){}
  onSubmit(f:NgForm)
  {
    var a=this.file;
    console.log(this.file.item(0));
    var reader = new FileReader();
    reader.onload=function(event:any){
      var filename = a.name;
      var data = event.target.result;
      var oFile = XLSX.read(event.target.result, {type: 'binary', cellDates:true, cellStyles:true});
      console.log("Data: ",oFile);
    }
    reader.readAsBinaryString(this.file);
    // var formData = new FormData();
    // var a= this.file.item(0)
    // formData.append('file',a,a.name);
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }

    // this.httpCall.post('http://localhost:1234/profile',formData, {
    //   reportProgress: true,
    //   observe: 'events',
    // }).subscribe((data)=>{
    //   console.log("you have succeeded");
    // },
    // (err)=>{
    //   console.log("some error is occured");
    //   console.log(err);
    // },
    // ()=>{
    //   console.log("completed");
    //   this.downloadButton=true;
    // });
  }
  downloadFile(data: Response) {
  //  //  var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' });
  //  // var url = window.URL.createObjectURL(blob);
  //  // window.open(url);
  }
  switchMode()
  {
    //this.displayTable=true;
    this.httpCall.get('http://localhost:1234/readTheExcel').subscribe((data)=>{
      console.log(data);
      this.downloadButton=true;
  }
      ,(err)=>{
        console.log("some error in the callPhoneRecords");
        console.log(err);
      },()=>{
        console.log("completed");
      })
  }
  back()
  {
    this.displayTable=false;
  }
  getData()
  {
    this.displayTable=true;
    this.httpCall.post('http://localhost:1234/getTheRecords',{main:this.skip}).subscribe((data)=>{
      console.log(data,"shreyansh");

       console.log(data);
      this.userArray=data;
      this.userImpliedData=this.userArray.slice();
      this.userImpliedData=data;
      this.jobKeys.push("count");
      this.phoneKeys.push("count");
      this.deliveryBoyKeys.push("count");
      this.userImpliedData={...this.userArray};
      for(let key in this.userArray[0].data)
      {
        this.userKeys.push(key);
      }
      console.log(this.userKeys);
      for(let key in this.userArray[0].data)
      {
        if(key.slice(0,7)=="PhoneNo")
        {
          this.phoneKeys.push(key)
        }
      }
      for(let key in this.userArray[0].data)
      {
        if(key.slice(0,12)=="relationship")
        {
          this.jobKeys.push(key)
        }
      }
      for(let key in this.userArray[0].data)
      {
        if(key.slice(0,11)=="deliveredBy")
        {
          this.deliveryBoyKeys.push(key)
        }
      }
      // for(let key in data["userObject"][0])
      //     this.userKeys.push(key)
      // for(let key in data["jobObj"][0
      //     this.jobKeys.push(key)
      // for(let key in data["deliveryBoyObj"][0])
      // {
      //   this.deliveryBoyKeys.push(key)
      //   console.log(key);
      // }
      // console.log(this.userImpliedData);
      //     console.log(this.deliveryBoyKeys);
      //   }
    }
      ,(err)=>{
        console.log("some error in the callPhoneRecords");
        console.log(err);
      },()=>{
        console.log("completed");
      })

  }
  downloadUserReport(){
    this.httpCall.get("http://localhost:1234/user").subscribe(
      (data)=>{
      ////    this.downloadFile(data);
    
      },
      (error)=>{
        console.log(error);
        console.log("some error in download");
      },
      ()=>{
        console.log("completed the download");
      }
    )
  }
  downloadRelationReport(){
    this.httpCall.get("http://localhost:1234/relation").subscribe(
      (data)=>{
      ////  this.downloadFile(data);
      },
      (error)=>{
        console.log(error);
        console.log("some error in download");
      },
      ()=>{
        console.log("completed the download");
      }
    )
  }
  downloadDeliveryBoyReport(){
    this.httpCall.get("http://localhost:1234/deliveryBoy").subscribe(
      (data)=>{
      ////  this.downloadFile(data);
      },
      (error)=>{
        console.log(error);
        console.log("some error in download");
      },
      ()=>{
        console.log("completed the download");
      }
    )
  }
    downloadPhoneReport(){
    this.httpCall.get("http://localhost:1234/phone").subscribe(
      (data)=>{
      ////  this.downloadFile(data);
      },
      (error)=>{
        console.log(error);
        console.log("some error in download");
      },
      ()=>{
        console.log("completed the download");
      }
    )
  }
  reactOnChange(event:any,types:string){
    this.zone.run(()=>{
      console.log(types);
      if(types=='user')
      {
        this.userArray=[]
        console.log(this.userImpliedData);
        for(let i in this.userImpliedData)
        {
          if(this.userImpliedData[i].data["count"]==event.target.value)
          {
            this.userArray.push(this.userImpliedData[i]);
          }
        }
      }
      else if(types=='phone')
      {
        this.userArray=[]
        for(let i in this.userImpliedData)
        {
          if(this.userImpliedData[i].data["count"]==event.target.value)
          {
            this.userArray.push(i);
          }
        }
      }
      else if(types=="job")
      {
        this.userArray=[]
        for(let i of this.userImpliedData)
        {
          if(this.userImpliedData[i].data["count"]==event.target.value)
          {
            this.userArray.push(i);
          }
        }
      }
      else if(types=="delivery")
      {
        this.userArray=[]
        for(let i in this.userImpliedData)
        {
          if(this.userImpliedData[i].data["count"]==event.target.value)
          {
            this.userArray.push(i);
          }
        }
      }
      this.cdr.detectChanges();
      console.log("hello")
    })
  
    }
}

