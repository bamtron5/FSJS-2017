/*jshint esversion: 6 */
 class ArrowFunctions{
   constructor() {
     //from a promise
     this.returnPromise().then((val) => {
       console.log(val);
     }).catch((e) => {
       throw new Error(e);
     });
   }

   returnPromise() {
     //full expressed arrow
     return new Promise((resolve, reject) => {
       //implied return
       setTimeout(() => resolve(new Date()), 3000);
     });
   }
 }
