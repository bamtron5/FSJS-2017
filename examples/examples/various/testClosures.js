//DOCS RUN BY UNCOMMENTING
// myThirdClosure(); //THIS WILL BREAK
// myClosureProblem(); //THIS IS WHAT A STACK TRACE LOOKS LIKE


function testClosures() {
  console.log(arguments.callee.name);
  function myNewClosure() {
    console.log(arguments.callee.name);
    function myThirdClosure() {
      console.log(arguments.callee.name);
      function myFourthClosure() {
        console.log(arguments.callee.name);
        function myFifthClosure() {
          console.log('DONE');
        }
        return myFifthClosure();
      }
    }
  }
}
