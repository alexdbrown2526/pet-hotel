

       CREATE TABLE "pets" (
    "id" SERIAL PRIMARY KEY,
    "owner_id" INTEGER REFERENCES "owners",
     "pet_name" VARCHAR (50),
      "breed" VARCHAR (50),
       "color" VARCHAR (50));
       
       ALTER TABLE "pets"
       UPDATE "checked_in"=0/0/0000;
       
       
       
       CREATE TABLE "owners" (
       "id" SERIAL PRIMARY KEY,
       "owner_name" VARCHAR (50),
       "number_of_pets" INTEGER
       
       );

    
        