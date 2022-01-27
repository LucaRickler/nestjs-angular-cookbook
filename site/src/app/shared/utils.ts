export default class Utils {
  static addUndefined(...num: (number | undefined)[]): number | undefined {
    let output: number | undefined = undefined;
    num.forEach(n => {
      if (n) 
        output = output ? output + n : n;
    });
    
    return output;
  }
}