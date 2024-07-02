// import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
// import { PdfViewerComponent } from 'ng2-pdf-viewer';

// @Injectable({
//   providedIn: 'root',
// })
// export class DynamicComponentService {
//   constructor(
//     private injector: Injector,
//     private resolver: ComponentFactoryResolver,
//     private appRef: ApplicationRef
//   ) {}

//   appendPdfViewerComponent(): void {
//     const factory = this.resolver.resolveComponentFactory(PdfViewerComponent);
//     const componentRef = factory.create(this.injector);
//     this.appRef.attachView(componentRef.hostView);
//     document.body.appendChild((componentRef.location.nativeElement as HTMLElement));
//   }
// }
