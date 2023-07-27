import { Component } from '@angular/core';
import { CategoryModel } from 'src/app/models/category-model.entity';
import { HardwareModel, UpdateHardwareDto } from 'src/app/models/hardware-model.entity';
import { CategoryService } from 'src/app/services/category.service';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.css']
})
export class HardwareComponent {

  hardware: HardwareModel[] = [];
  categories: CategoryModel[] = [];


  constructor(private hardwareService: HardwareService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.hardwareService.getAllHardware().subscribe(data=>{
      this.hardware = data;
      this.categoryService.getAll().subscribe(data => {
        this.categories = data;
      })
    })
  }


    name_product: string = ''
    category: CategoryModel[] = []
    unit_price!: number
    quantity_available!: number;   //cantidad disponible
    minimum_amount!: number//cantidad minima
    stock!: number


    getHardware(){
      this.hardwareService.getAllHardware().subscribe(
        response=>{
          this.hardware= response}
          )
    }



    deleteProduct(id:HardwareModel['id_h']){
      this.hardwareService.destroyHardware(id).subscribe(
        response => {
          this.hardware= this.hardware.filter(hardware => hardware.id_h != id);
          console.log(response)})
     }

     hardwareModel: UpdateHardwareDto={
       id_h: '',
       sn: '',
       marca: '',
       procesador: '',
       ram: '',
       category: '',
       users: '',
       image: '',
       monitor_sn: '',
       teclado: false,
       mouse: false,
       sala: ''
     }

     updateHardware(hardware: UpdateHardwareDto) {
      const response = this.hardwareService
        .updateHardware(hardware.id_h, hardware)
        .subscribe((response) => {
          console.log(response);
        });
    }
}

