import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://localhost:3001";
  private reservations: Reservation[] = [];

  /**
   * required when testing without mockoon. uncomment local storage if wanted to make use of local storage
  constructor(){
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }
  */
 constructor(private http: HttpClient){
  
 }

 /**
  getReservations(): Reservation[] {
    return this.reservations;
  }*/

  getReservations(): Observable<Reservation[]> {
    //return this.reservations;
    return this.http.get<Reservation[]>(this.apiUrl+"/reservations");
  }

  getReservation(id: string): Reservation | undefined{
    return this.reservations.find(res => res.id == id)
  }

  addReservation(reservation: Reservation): void{
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
     //localStorage.setItem("reservations", JSON.stringify(this.reservations))
  }

  deleteReservation(id: string): void{
    let index = this.reservations.findIndex(res => res.id == id);
    this.reservations.splice(index, 1);
    //localStorage.setItem("reservations", JSON.stringify(this.reservations))
  }

  updateReservation(id: string, updatedReservation: Reservation): void{
    //let index = this.reservations.findIndex(res => res.id == updatedReservation.id);
    let index = this.reservations.findIndex(res => res.id == id);
    this.reservations[index] = updatedReservation;
    //localStorage.setItem("reservations", JSON.stringify(this.reservations))
  }
}
