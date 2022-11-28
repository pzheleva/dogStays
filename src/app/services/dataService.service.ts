import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, CollectionReference  } from "@angular/fire/compat/firestore";
import { Property } from "src/models/property.model";
import { AuthService } from "./authService.service";
import { Router } from "@angular/router";
import { v4 as uuidv4 } from 'uuid';
import { Reservation } from "src/models/reservation.model";
import { ToastrService } from "ngx-toastr";
import { Like } from "src/models/Like.model";




  @Injectable({ providedIn: 'root'})
  export class DataService {

    PropertyCollection: CollectionReference;
    ReservationCollection: CollectionReference;
    LikesCollection: CollectionReference;
    likesArray: any[] = [];

    constructor(
        public firestore: AngularFirestore,
        public authService: AuthService,
        private router: Router,
        private  toastr: ToastrService
    ){
    this.PropertyCollection = this.firestore.collection<Property>('properties').ref;
    this.ReservationCollection = this.firestore.collection<Reservation>('reservation').ref;
    this.LikesCollection = this.firestore.collection<Like>('likes').ref;
    }

    addProperty(name: string, imageUrl: string, description: string, price: string, amenities: string[]){
        let property: Property = {
          creatorId: this.authService.getId,
          name: name,
          imageUrl: imageUrl,
          description: description,
          price: price,
          amenities: amenities ,
          likes: 0
        }
        let id = uuidv4();
     return this.PropertyCollection.doc(id).set(property);
   
    }

    getProperties() {
        return this.PropertyCollection.get();

    }

    getPropertyById(id: string) {
        return this.PropertyCollection.doc(id).get();
    };

    bookPlace(propertyId: string, dogName: string, phoneNumber: string, requirements: string){
        let reservation: Reservation = {
            UserId: this.authService.getId,
            email: this.authService.getEmail,
            PropertyId: propertyId,
            dogName: dogName,
            phoneNumber: phoneNumber,
            requirements: requirements
        }

        let reservationId = uuidv4();
        this.toastr.info("Adding reservation information...");
        this.ReservationCollection.doc(reservationId)
        .set(reservation)
        .then((data) => {
            
            this.toastr.success("Thank you! We will contact you soon!")
        })
        

    };

    removeProperty(id: string){
        this.PropertyCollection.doc(id).delete().then((data) => {this.router.navigate(['properties'])});
    };

    editProperty(property: any, propertyId:string){
        return this.PropertyCollection.doc(propertyId).set(property);
    };

    async likeProperty(propertyId: string, property: Property){
        let like: Like = {
         UserId: this.authService.getId,
         PropertyId: propertyId
        };

        (await this.LikesCollection.get()).forEach((element) => {
            if(element.data()['UserId'] === this.authService.getId){
                this.likesArray.push(element.data());
            }
        });
            if(this.likesArray.length > 0){
                this.toastr.error('You\'ve already liked this property!');
                return;
            }
            property.likes += 1;

            this.addLike(like).then(() => {this.toastr.success('You liked this property!')}).catch((err) => {
                console.log(err)
            })
            this.editProperty(property, propertyId);
            this.likesArray = [];
        }



    addLike(like: Like){
        let id = uuidv4();
        return this.LikesCollection.doc(id).set(like);
    }



  }