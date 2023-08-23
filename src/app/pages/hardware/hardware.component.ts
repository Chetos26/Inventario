import { Component, ElementRef, ViewChild } from '@angular/core';
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
      /* image: '', */
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
       /* image: '', */
       monitor_sn: '',
       teclado: '',
       mouse: '',
       sala: '',
       almacenamiento: ''
     }

    targetCategory: string='';
     applyCategoryFilter(category: string): void {
      this.targetCategory = category;
    }

    onImprimir(hardware: any) {
      this.http.get('assets/images/logo.png', { responseType: 'blob' }).subscribe((logoBlob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const logoBase64 = reader.result?.toString();
          this.generatePdf(logoBase64, hardware);
        };
        reader.readAsDataURL(logoBlob);
      });
    }


  generatePdf(logoBase64: string | undefined, hardware: any): void {
      const doc = new jsPDF();

      if (logoBase64) {
        doc.addImage(logoBase64, 'PNG', 15, 1, 35, 30);
      }
      doc.setFontSize(16);
      doc.text('EQUIPO DE CIESPAL', 80, 20);

      doc.text(`ID: ${hardware.id_h}`, 20, 40);
      doc.text(`Categoria: ${hardware.categories.nombre_c}`, 20, 50);
      doc.text(`Nombre: ${hardware.users.nombre_u}`, 20, 60);
      doc.text(`Apellido: ${hardware.users.apellido_u}`, 20, 70);
      doc.text(`Serial Number Monitor: ${hardware.monitor_sn}`, 20, 80);
      doc.text(`Serial Number: ${hardware.sn}`, 20, 90);
      doc.text(`Marca: ${hardware.marca}`, 20, 100);
      doc.text(`Procesador: ${hardware.procesador}`, 20, 110);
      doc.text(`Almacenamiento: ${hardware.almacenamiento}`, 20, 120);
      doc.text(`Sala: ${hardware.sala}`, 20, 130);

      //doc.text(`QR: generateQRCodes()`,20, 90)

         // Generar el código QR y agregarlo al PDF
    this.generateQRCode((qrCodeBase64: string) => {
      if (qrCodeBase64) {
        doc.addImage(qrCodeBase64, 'PNG', 160, 40, 30, 30);
      }

      const espacioParaFirmaY = 260; // Espacio para la firma
      doc.text('Firmado por', 145, espacioParaFirmaY);

      const espacioLinea = 280; // Espacio
      doc.text('_________________', 135, espacioLinea);

      doc.save(`Equipo_Ciespal_${hardware.users.nombre_u}.pdf`);
      this.currentIndex++;
    });



    const qrOptions: QRCode.QRCodeRenderersOptions = {
      errorCorrectionLevel: 'H',
      width: 100, // Ajustar el tamaño del código QR
      margin: 1,
    };
  }
  // QR EN PDF
  generateQRCode(callback: (base64: string) => void): void {
    const hardware = this.hardware[this.currentIndex];
    const qrCodeData =
    `ID: ${hardware.id_h}
    \nUsuario: ${hardware.users.nombre_u}
    \nUsuario: ${hardware.users.apellido_u}
    \nSerial Number Monitor: ${hardware.monitor_sn}
    \nSerial Number: ${hardware.sn}
    \nMarca: ${hardware.marca}
    \nSala: ${hardware.sala}`;

    const qrOptions: QRCode.QRCodeRenderersOptions = {
      errorCorrectionLevel: 'H',
      width: 200, // Ajustar el tamaño del código QR
      margin: 1,
    };

    QRCode.toDataURL(qrCodeData, qrOptions, (err, url) => {
      if (err) {
        console.error('Error generando código QR:', err);
        callback('');
      } else {
        callback(url);
      }
    });
  }


  @ViewChild('confirmDeleteModal') confirmDeleteModal!: ElementRef; // Acceso al modal

  hardwareToDeleteId: string | null = null;

  showDeleteConfirmationModal(id: string): void {
    this.hardwareToDeleteId = id;
    this.confirmDeleteModal.nativeElement.classList.add('show'); // Mostrar el modal
  }

  confirmDelete(): void {
    if (this.hardwareToDeleteId) {
      this.deleteHardware(this.hardwareToDeleteId);
    }
    this.hardwareToDeleteId = null;
    this.confirmDeleteModal.nativeElement.classList.remove('show'); // Ocultar el modal
  }

  getImageUrl(categoryName: string): string {
    if (categoryName === 'Laptops') {
      return 'assets/images/laptop.png';
    } else if (categoryName === 'PC') {
      return 'assets/images/pc.jpg';
    } else {
      return 'URL_DE_LA_IMAGEN_POR_DEFECTO';
    }
  }
}
