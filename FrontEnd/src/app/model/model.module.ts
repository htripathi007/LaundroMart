import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RestDataSource } from "./rest.datasource";

@NgModule({
    providers:[RestDataSource],
    imports:[HttpClientModule]
})
export class ModelModule{
    
}