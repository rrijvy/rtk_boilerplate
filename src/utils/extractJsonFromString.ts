const jsonify = (almostJson: string) => {
  try {
    return JSON.parse(almostJson);
  } catch {
    almostJson = almostJson.replace(/([a-zA-Z0-9_$]+\s*):/g, '"$1":').replace(/'([^']+?)'([\s,\]\\}])/g, '"$1"$2');
    return JSON.parse(almostJson);
  }
};

const chars: Record<string, string> = {
  "[": "]",
  "{": "}",
};

type cb = (letter: string, i: number, iteree?: string) => boolean | undefined;

const any = (iteree: string, iterator: cb) => {
  let result;
  for (let i = 0; i < iteree.length; i++) {
    result = iterator(iteree[i], i, iteree);
    if (result) {
      break;
    }
  }
  return result;
};

const extract = (str: string) => {
  const startIndex = str.search(/[\\{\\[]/);
  if (startIndex === -1) {
    return null;
  }

  const openingChar = str[startIndex];
  const closingChar = chars[openingChar];
  let endIndex = -1;
  let count = 0;

  str = str.substring(startIndex);
  any(str, (letter, i) => {
    if (letter === openingChar) {
      count++;
    } else if (letter === closingChar) {
      count--;
    }

    if (!count) {
      endIndex = i;
      return true;
    }
  });

  if (endIndex === -1) {
    return null;
  }

  const obj = str.substring(0, endIndex + 1);
  return obj;
};

export const extractJson = (str: string) => {
  let result;
  const objects = [];
  while ((result = extract(str)) !== null) {
    try {
      const obj = jsonify(result);
      objects.push(obj);
    } catch {
      // Do nothing
    }
    str = str.replace(result, "");
  }

  return objects;
};
