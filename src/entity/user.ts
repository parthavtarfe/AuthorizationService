import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"; 

@Entity() 
export class users {  

   @ObjectIdColumn() 
   _id: ObjectID; 
   
   @Column() 
   userId: string; 
   
   @Column() 
   licenseId: string; 

   @Column()
   userInformations: Object;
   
   @Column()
   accounts: Array<Object>;

   @Column()
   guiModules: Array<Object>;
}