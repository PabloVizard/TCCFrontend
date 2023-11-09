import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }
  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }
  
    if (loading === true) {
      this.loadingMap.set(url, loading);
      // Aguarde 1 segundo antes de notificar que o carregamento está ativo
      setTimeout(() => {
        if (this.loadingMap.has(url)) {
          this.loadingSub.next(true);
        }
      }, 500);
    } else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
  
    // Verifique se o mapa ainda tem solicitações pendentes após 1 segundo

      if (this.loadingMap.size === 0) {
        this.loadingSub.next(false);
      }
  }
}