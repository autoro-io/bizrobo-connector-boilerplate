function hello(name: string, reply: number, text: string, suff: string): string {
  const returnString = 'Hello World!' + name + reply + text + suff;
  console.log(returnString);
  console.log('hage');
  return returnString;
};

export { hello };