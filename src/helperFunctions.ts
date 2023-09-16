const generateShortUrl = (length:number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const doesValueExistInArray = (array:Array<any>, value, property): boolean => {
    const targetValue = value;
    const propertyName = property;
    
    return array.some((obj) => obj[propertyName] === targetValue);    
}

const findObjectInArray = <T>(
    arr: T[],
    key: keyof T,
    value: T[keyof T]
  ): T | null => arr.find(obj => obj[key] === value) || null;
  
const isURL = (url: string): boolean => {
    const urlRegex = /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/;
    return urlRegex.test(url);
};

export {generateShortUrl, doesValueExistInArray, findObjectInArray, isURL};