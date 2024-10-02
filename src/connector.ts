function greeting(name: string, reply: number, text: string, suff: string): string {
  const returnString = 'Hello World!' + name + reply + text + suff;
  console.log(returnString);
  console.log('hage');
  return returnString;
};

const hello = {
  greeting: greeting
}

export = hello;