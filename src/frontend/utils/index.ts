// cant figure out how to make a declarations file right now, so
// @ts-ignore
import Base58 from "base-58";
import { Observable } from "rxjs";
import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";

// takes a promise, and returns a react hook for it.
// use like this:
//
// export const isAvailable = (_): Promise<boolean> => Promise.resolve(true);
//
// const maybeAddNote = usePromise(isAvailable()) && "it's available!";
//
export const usePromise = <T>(p: Promise<T>) => {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    p.then(setResult);
  }, []);

  return result;
};

// takes an observable, and returns a react hook for it.
// usage:
//
// export const isAvailable = (): Observable<boolean> =>
//   of(true, false, true, false, true).pipe(concatMap(x => of(x).pipe(delay(1000))));
//
// const maybeAddNote = useObservable(isAvailable()) && "it's available!";
export const useObservable = <T>(o: Observable<T>) => {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    o.subscribe((v) => {
      setResult(v);
    });
  }, []);

  return result;
};

export const uniqueId = () => Base58.encode(new Buffer(uuidv4())).substring(0, 8);

// extracts a youtube id from a url, or returns undefined
// TODO actually do what we just described
//   this will only work with specific url strings, we need a function
//   that works more generically
export const extractYoutubeId = (s: string) => s.split("=").slice(-1);

export const moveElementPosition = (arr: string[], fromIndex: number, toIndex: number): string[] => {
  if (toIndex >= arr.length) {
    return arr;
  }
  arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
  return arr;
};

export const syntaxHighlight = (json: string): string => {
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    },
  );
};
