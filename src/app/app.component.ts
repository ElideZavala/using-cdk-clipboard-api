import { Clipboard } from '@angular/cdk/clipboard';
import { Component, HostListener, OnInit } from '@angular/core';
import { ContentType } from './constants/content-type';
import { IMAGE_URL } from './constants/image-url';
import { LOREM_IPSUM_TEXT } from './constants/lorem-ipsum-text';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "Using CDK Clipboard to work with system clipboard";
  contentCopied: ContentType;
  contentTypes = ContentType;
  loremIpsumText = LOREM_IPSUM_TEXT;
  imageUrl = IMAGE_URL;
 
  @HostListener('window:click', ['$event'])
  onClickPropagation() {
    if (this.contentCopied !== null) {
      this.resetCopiedHash();
    }
  }

  constructor(private clickboard: Clipboard) {
    this.resetCopiedHash();
  }

  async copyImageUrl(srcImageUrl: string) {
    console.log(srcImageUrl);
    const data = await fetch(srcImageUrl); // este fetch es de JS para obtener el blob
    const blob = await data.blob(); // blob es un tipo de dato que representa datos binarios`
    this.clickboard.copy(URL.createObjectURL(blob)); // crea un objeto URL que representa el blob y lo copia al portapapeles

  }

  copyContent($event, type: ContentType) {
    if ($event) {
      $event.stopImmediatePropagation(); // previene que el evento se propague a otros elementos
    }
    this.contentCopied = type;
  }

  ngOnInit() {
  }

  resetCopiedHash() {
    this.contentCopied = null;
  }

  
}
