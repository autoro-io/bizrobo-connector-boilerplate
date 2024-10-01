// Write manifest here
// 
// Example manifest
// ===================
// {
//   // define actions and parameters
//   // define all exported actions in index.ts
//   "actions": [
//     {
//       // public function 
//       "name": "syncfetch", // this should be the same as the funtion name in index.ts
//       "type": "node",
//       // parameters must be the same as the parameters of the function in index.ts
//       "parameters": [
//         {
//           "name": "version",
//           // type is the same as the type of the parameter in index.ts
//           // type can be string, number, boolean, object, array
//           "type": "string"
//         }
//       ],
//      // response must be the same as the return value of the function in index.ts
//       "response": [
//         {
//           "name": "status",
//           "type": "string"
//         },
//         {
//           "name": "response",
//           "type": "string"
//         }
//       ],
//       "commandline": [
//         // this line should be written in nodejs script
//         // in this example we use randomuser library
//         "const randomuser = require('randomuser');",
//         // %1 means the first parameter, %2 means the second parameter and so on
//         // call function by using action name and parameters
//         // this line should be written in nodejs script
//         "return randomuser.syncfetch(%1);"
//         // multiple nodejs lines are allowed in the commandline array
//         // you must be write retrun in the last line
//       ]
//     },
//   ],
//   // package name, use the name of package.json name
//   "name": "randomuser"
// }
// ====

// our actual : index.ts
// const hello = (name: string): void => {
//   console.log('Hello World!', name);
// };
// export { hello };


