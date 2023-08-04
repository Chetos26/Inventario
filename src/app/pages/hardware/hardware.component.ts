import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model.entity';
import { CreateHardwareDto, HardwareModel, UpdateHardwareDto } from 'src/app/models/hardware-model.entity';
import { UsersModel } from 'src/app/models/users-model.entity,';
import { CategoriesSearchPipe } from 'src/app/pipes/category-search.pipe';
import { CategoryService } from 'src/app/services/category.service';
import { HardwareService } from 'src/app/services/hardware.service';
import * as QRCode from 'qrcode';
import { ImpresionService } from 'src/app/services/impresion.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  searchTerm: string = '';

  constructor(
    private hardwareService: HardwareService,
    private categoryService: CategoryService,
    private categorySearchPipe: CategoriesSearchPipe,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private srvImpresion: ImpresionService
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

  gotcategories():void{
    for (let i = 0; i < this.categories.length; i++) {
      if (this.hardwares.categories == this.categories[i].id_c) {
        this.name= this.categories[i].nombre_c;
      }
    }
  }

  name: string = '';

  generateQRCodes(): void {
    this.hardware.forEach((hardware) => {
      const qrCodeData =
      `Identificador de equipo:
        ${hardware.id_h}
        ${hardware.categories.nombre_c}
        Encargado:
        ${hardware.users.nombre_u} - ${hardware.users.apellido_u}
        Detalles:
        ${hardware.marca} - ${hardware.sala}`
        ; // Convertir el objeto hardware a una cadena JSON

      // Crear un objeto de opciones para el tamaño del código QR
      const qrOptions: QRCode.QRCodeRenderersOptions = {
        errorCorrectionLevel: 'H',
        width: 150, // Ajustar el ancho del código QR (tamaño en píxeles)
        margin: 1, // Margen del código QR (tamaño en módulos)
      };

      // Crear un elemento canvas para generar el código QR
      const canvas = document.createElement('canvas');
      QRCode.toCanvas(canvas, qrCodeData, qrOptions, (err) => {
        if (err) {
          console.error('Error generando código QR:', err);
        } else {
          // Convertir el canvas a una imagen en formato de datos URL
          hardware.qrCodeDataUrl = canvas.toDataURL();
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
    getOne(id_h:string){
      this.hardwareService.getOneHardware(id_h).subscribe
      (response=>{console.log(response)})
    }

    deleteHardware(id:HardwareModel['id_h']){
      this.hardwareService.destroyHardware(id).subscribe(
        response => {
          this.hardware= this.hardware.filter(hardware => hardware.id_h != id);
          console.log(response)})
     }

     hardwares: CreateHardwareDto = {
      categories: '',
      sn: '',
      procesador: '',
      ram: '',
      users: '',
      image: '',
      monitor_sn: '',
      teclado: '',
      mouse: '',
      marca: '',
      sala: '',
      almacenamiento: ''
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
       teclado: '',
       mouse: '',
       sala: '',
       almacenamiento: ''
     }

     categoriesSearch: string='';
     selectedCategory(categories:string):void{
      this.categoriesSearch = categories
     }


     onImprimir() {
      this.hardwareService.getAllHardware().subscribe((data: any) => {
        data.forEach((hardware: any) => {
          const doc = new jsPDF();
          const encabezado = ["id", "Usuario", "sn", "Marca", "Sala"];
          const cuerpo = [[
            hardware.id_h,
            hardware.users.nombre_u,
            hardware.sn,
            hardware.marca,
            hardware.sala
          ]];

          doc.text("Equipos Ciespal", 10, 10);
          (doc as any).autoTable({
            head: [encabezado],
            body: cuerpo,
            startY: 20,
          });

          doc.save(`Equipo_${hardware.users.nombre_u}.pdf`);
        });
      });
    }

}

