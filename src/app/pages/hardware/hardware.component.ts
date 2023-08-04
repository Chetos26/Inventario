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
import { HttpClient } from '@angular/common/http';

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
  currentIndex: number = 0;

  constructor(
    private hardwareService: HardwareService,
    private categoryService: CategoryService,
    private categorySearchPipe: CategoriesSearchPipe,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private srvImpresion: ImpresionService,
    private http: HttpClient,
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
        width: 200, // Ajustar el ancho del código QR (tamaño en píxeles)
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
      if (this.currentIndex < this.hardware.length) {
        this.http.get('assets/images/logo.png', { responseType: 'blob' }).subscribe((logoBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const logoBase64 = reader.result?.toString();
            const hardware = this.hardware[this.currentIndex];
            const nombreCompleto = `${hardware.users.nombre_u} ${hardware.users.apellido_u}`;
            this.generatePdf(logoBase64, nombreCompleto);
          };
          reader.readAsDataURL(logoBlob);
        });
      }
    }

  generatePdf(logoBase64: string | undefined, nombreUsuario: string): void {
    const doc = new jsPDF();

    // Agregar encabezado con el logotipo
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30); // Coloca el logotipo en las coordenadas (10, 10) con un tamaño de 30x30
    }
    doc.setFontSize(16);
    doc.text('Equipo de Ciespal', 50, 20); // Texto del encabezado

    // Agregar los datos como lista hacia abajo
    let y = 40; // Posición vertical para comenzar la lista
    this.hardware.forEach((hardware) => {
      doc.text(`ID: ${hardware.id_h}`, 20, y);
      doc.text(`Usuario: ${hardware.users.nombre_u}`, 20, y + 10);
      doc.text(`Serial Number: ${hardware.sn}`, 20, y + 20);
      doc.text(`Marca: ${hardware.marca}`, 20, y + 30);
      doc.text(`Sala: ${hardware.sala}`, 20, y + 40);
      y += 60; // Incrementa la posición vertical para el siguiente conjunto de datos
    });

    // Espacio para firmar
    const espacioParaFirmaY = y + 30; // Agrega un espacio para la firma 30 unidades debajo de los datos
    doc.text('Espacio para Firmar', 20, espacioParaFirmaY);

    doc.save(`Equipos_Ciespal ${nombreUsuario}.pdf`);
    this.currentIndex++;
  }
}


