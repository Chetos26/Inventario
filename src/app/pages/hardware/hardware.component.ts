import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model.entity';
import { HardwareModel, UpdateHardwareDto } from 'src/app/models/hardware-model.entity';
import { UsersModel } from 'src/app/models/users-model.entity,';
import { CategoriesSearchPipe } from 'src/app/pipes/category-search.pipe';
import { CategoryService } from 'src/app/services/category.service';
import { HardwareService } from 'src/app/services/hardware.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.css'],
  providers: [CategoriesSearchPipe]
})
export class HardwareComponent {

  hardware: HardwareModel[] = [];
  categories: CategoryModel[] = [];
  users: UsersModel[]=[];
  selectedCategory: string = ''; // Variable para almacenar la categoría seleccionada
  searchTerm: string = '';

  constructor(
    private hardwareService: HardwareService,
    private categoryService: CategoryService,
    private categorySearchPipe: CategoriesSearchPipe,
    private router:Router,
    private activatedRoute:ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.hardwareService.getAllHardware().subscribe(data=>{
      this.hardware = data;

    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
      })
    })

    this.hardwareService.getAllHardware().subscribe(data => {
      this.hardware = data;
      this.generateQRCodes(); // Llamar a la función para generar códigos QR
    });
  }

  

  generateQRCodes(): void {
    this.hardware.forEach((hardware) => {
      const qrCodeData =
      `Identificador de equipo:
      ${hardware.id_h}
      ${hardware.categories.nombre_c} -${hardware.users.nombre_u} - ${hardware.users.apellido_u}
       ${hardware.marca} - ${hardware.sala}`
      ; // Convertir el objeto hardware a una cadena JSON
      QRCode.toDataURL(qrCodeData, (err, url) => {
        if (err) {
          console.error('Error generando código QR:', err);
        } else {
          hardware.qrCodeDataUrl = url; // Asignar la URL generada al hardware
        }
      });
    });
  }

    getHardware(){
      this.hardwareService.getAllHardware().subscribe(
        response=>{
          this.hardware= response}
        )
    }

    deleteHardware(id:HardwareModel['id_h']){
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
       categories: '',
       users: '',
       image: '',
       monitor_sn: '',
       teclado: false,
       mouse: false,
       sala: '',
       almacenamiento: ''
     }

}

