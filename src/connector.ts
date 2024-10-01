type Hennge = 'hello' | 'end' | 'goodbye';

function hello(name: string, reply: number, text: Hennge = 'hello'): string {
  const returnString = 'Hello World!' + name + reply;
  console.log(returnString);
  console.log('hage');
  return returnString;
};

export { hello };