import { Injectable } from '@angular/core';

declare var toastr: any;
declare var Swal: any;
declare var swal: any;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // THEME SOURCE: default/components/base/toastr.html + assets/demo/default/custom/components/base/toastr.js
  // + default/components/base/bootstrap-notify.html + sweetalert2.html
  // vendors.bundle đã chứa toastr + sweetalert2 (Swal), style.bundle chứa .toast/.swal2-toast
  private ensureToastrDefaults(): void {
    if (typeof toastr !== 'undefined' && !toastr.__metronicDefaults) {
      toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        showDuration: '300',
        hideDuration: '1000',
        timeOut: '3000',
        extendedTimeOut: '1000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      };
      toastr.__metronicDefaults = true;
    }
  }

  success(message: string): void {
    this.ensureToastrDefaults();
    if (typeof toastr !== 'undefined' && toastr.success) {
      toastr.success(message);
      return;
    }
    // fallback SweetAlert2 toast - theme sweetalert2.html
    if (typeof Swal !== 'undefined') {
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: message, showConfirmButton: false, timer: 3000 });
      return;
    }
    if (typeof swal !== 'undefined') {
      swal(message, '', 'success');
      return;
    }
    alert(message);
  }

  error(message: string): void {
    this.ensureToastrDefaults();
    if (typeof toastr !== 'undefined' && toastr.error) {
      toastr.error(message);
      return;
    }
    if (typeof Swal !== 'undefined') {
      Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: message, showConfirmButton: false, timer: 4000 });
      return;
    }
    if (typeof swal !== 'undefined') {
      swal(message, '', 'error');
      return;
    }
    alert(message);
  }
}
