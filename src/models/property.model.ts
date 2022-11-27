export class Property{
    name: string;
    imageUrl: string;
    description: string;
    price: string;
    amenities: string[];
    creatorId: string;
    likes: number;
    constructor(
        name: string,
        creator: string,
        image: string,
        description: string,
        price: string,
    ){this.creatorId = creator,
    this.name = name,
    this.imageUrl = image,
    this.price = price,
    this.description = description,
    this.likes = 0;
    this.amenities = []
    }
}