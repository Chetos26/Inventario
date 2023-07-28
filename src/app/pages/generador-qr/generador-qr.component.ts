import { Component } from '@angular/core';
import * as QRCode from 'qrcode';
@Component({
  selector: 'app-generador-qr',
  templateUrl: './generador-qr.component.html',
  styleUrls: ['./generador-qr.component.css']
})
export class GeneradorQrComponent {
  qrData: any[] = [];
  

  generarQR() {
    const dataString = this.qrData.join(',');
    QRCode.toDataURL(dataString, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      const img = document.getElementById('qrCodeImage') as HTMLImageElement;
      img.src = url;
    });
  }
}
