// Array of names
const names = ["Jane", "John", "Jimbo", "Jedediah"];

// Slices first two names
const left = names.slice(0, 2);
console.log(left);
//name[0:2]

// Slices last two names and return
const right = names.slice(2, 4);
console.log(right);
//name[2:4]

// Sorts descending
console.log("descending")
// compareFunction 
// compares returns a positive number for a given pair of numbers [a,b] it will put them in reverse order in finaly array [b,a]
// returns a negative value for a given pair [a,b] i will put the order [a,b] 
// the key of wheter a sort ascending or descending  lies in the difference being returned. Given [a,b] returing b-a result in a descending and return a-b will ascending 
// if a > b, a-b result in a positive and then changes order to [b,a] 
 
console.log([-10, 3, 2, 5, -120].sort(function compareFunction(firstNum, secondNum) {
   // resulting order is (3, 2, -120)
  return secondNum - firstNum;
}))



// Sorts ascending
console.log("ascending")
console.log([3, 2, -120].sort(function compareFunction(firstNum, secondNum) {
  // resulting order is (-120, 2, 3)
  return firstNum - secondNum;
}));
/*
// Arrow Function
[3, 2, -120].sort((first, second) => first - second);
*/