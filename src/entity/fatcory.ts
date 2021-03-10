import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"; 

@Entity() 
export class Factory {  

   @ObjectIdColumn() 
   id: ObjectID; 
   
   @Column() 
   externalId: string; 
   
   @Column() 
   channelName: string; 

   @Column()
   customerId: string;
   
   @Column()
   type: boolean;

   @Column()
   valid: boolean;
}