import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, CollectionReference  } from "@angular/fire/compat/firestore";
import { Property } from "../components/models/property.model";
import { AuthService } from "./authService.service";
import { Router } from "@angular/router";
import { v4 as uuidv4 } from 'uuid';
import { Reservation } from "../components/models/reservation.model";
import { ToastrService } from "ngx-toastr";
import { Like } from "../components/models/Like.model";
import { QuerySnapshot } from "firebase/firestore";




  @Injectable({ providedIn: 'root'})
  export class DataService {

    PropertyCollection: CollectionReference;
    ReservationCollection: CollectionReference;
    LikesCollection: CollectionReference;
    likesArray: any[] = [];
    reservationsArray: any[] = [];
    listedProperties: any[] = [];
    propertiesForSearch: any[] = [];
    propertiesForSearchWithId: any[] = [];

 

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

    addProperty(name: string, imageUrl: string, description: string, price: string, amenities: string[], address: string){
        let property: Property = {
          creatorId: this.authService.getId,
          name: name,
          imageUrl: imageUrl,
          description: description,
          price: price,
          amenities: amenities ,
          likes: 0,
          address: address
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

    bookPlace(propertyId: string, dogName: string, phoneNumber: string, fromDate: string, toDate: string){
        let reservation: Reservation = {
            UserId: this.authService.getId,
            email: this.authService.getEmail,
            PropertyId: propertyId,
            dogName: dogName,
            phoneNumber: phoneNumber,
            fromDate: fromDate,
            toDate: toDate
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

    userAlreadyLikes(propertyId) {
        return this.LikesCollection.where("PropertyId", '==', propertyId).get();
    }

    likeProperty(propertyId: string, property: Property){
        let like: Like = {
         UserId: this.authService.getId,
         PropertyId: propertyId
        };

        this.userAlreadyLikes(propertyId).then((data) => {
            let array = data.docs.filter(p => p.data()['UserId'] == this.authService.getId);
            if(array.length > 0) {
                this.toastr.error('You\'ve already liked this property!');
                return;
            };
            property.likes += 1;

            this.addLike(like).then(() => {this.toastr.success('You liked this property!')}).catch((err) => {
                console.log(err)
            })
            this.editProperty(property, propertyId);
            this.likesArray = [];
        });

    
        }



    addLike(like: Like){
        let id = uuidv4();
        return this.LikesCollection.doc(id).set(like);
    };


    async reservationsOfUser(){
        this.reservationsArray = [];
        (await this.ReservationCollection.get()).forEach((r) => {
            if(r.data()['UserId'] === this.authService.getId){
                this.reservationsArray.push(r.data());
            }
        })
        return this.reservationsArray;
    };

    async listedPropertiesOfUser(){
        this.listedProperties = [];
        (await this.PropertyCollection.get()).forEach((p) => {
            if(p.data()['creatorId'] === this.authService.getId){
                this.listedProperties.push(p.data());
            }
        })
        return this.listedProperties;
    };

    async getPropertiesSearch(){
        this.propertiesForSearch = [];
        (await this.PropertyCollection.get()).forEach((p) => {
            this.propertiesForSearch.push(p.data());
        
        });
        return this.propertiesForSearch;
    };


    async getPropertiesSec(){
        this.propertiesForSearchWithId = [];
        (await this.PropertyCollection.get()).forEach((p) => {
            const data = p.data();
            data["id"] = p.id;
            this.propertiesForSearchWithId.push(data);
        });

        return this.propertiesForSearchWithId;
    }

  };
  